import { useState, useCallback, useEffect } from 'react';
import Scene3D, { SceneObject } from './components/Scene3D';
import Toolbar from './components/Toolbar';
import LeftSidebar from './components/LeftSidebar';
import RightSidebar from './components/RightSidebar';
import { projectApi } from './lib/api';

interface HistoryState {
  objects: SceneObject[];
}

function App() {
  const [objects, setObjects] = useState<SceneObject[]>([]);
  const [selectedObjectId, setSelectedObjectId] = useState<string | null>(null);
  const [history, setHistory] = useState<HistoryState[]>([{ objects: [] }]);
  const [historyIndex, setHistoryIndex] = useState(0);
  const [currentProjectId, setCurrentProjectId] = useState<string | null>(null);

  const selectedObject = objects.find((obj) => obj.id === selectedObjectId) || null;

  // Save to history
  const saveToHistory = useCallback((newObjects: SceneObject[]) => {
    const newHistory = history.slice(0, historyIndex + 1);
    newHistory.push({ objects: newObjects });
    setHistory(newHistory);
    setHistoryIndex(newHistory.length - 1);
  }, [history, historyIndex]);

  // Add object
  const handleAddObject = useCallback((type: 'box' | 'sphere' | 'cone' | 'cylinder') => {
    const newObject: SceneObject = {
      id: `${type}-${Date.now()}`,
      type,
      position: [0, 1, 0],
      rotation: [0, 0, 0],
      scale: [1, 1, 1],
      color: '#3b82f6',
    };
    const newObjects = [...objects, newObject];
    setObjects(newObjects);
    saveToHistory(newObjects);
    setSelectedObjectId(newObject.id);
  }, [objects, saveToHistory]);

  // Update object
  const handleUpdateObject = useCallback((id: string, updates: Partial<SceneObject>) => {
    const newObjects = objects.map((obj) =>
      obj.id === id ? { ...obj, ...updates } : obj
    );
    setObjects(newObjects);
    saveToHistory(newObjects);
  }, [objects, saveToHistory]);

  // Delete object
  const handleDeleteObject = useCallback((id: string) => {
    const newObjects = objects.filter((obj) => obj.id !== id);
    setObjects(newObjects);
    saveToHistory(newObjects);
    if (selectedObjectId === id) {
      setSelectedObjectId(null);
    }
  }, [objects, selectedObjectId, saveToHistory]);

  // Undo
  const handleUndo = useCallback(() => {
    if (historyIndex > 0) {
      const newIndex = historyIndex - 1;
      setHistoryIndex(newIndex);
      setObjects(history[newIndex].objects);
    }
  }, [history, historyIndex]);

  // Redo
  const handleRedo = useCallback(() => {
    if (historyIndex < history.length - 1) {
      const newIndex = historyIndex + 1;
      setHistoryIndex(newIndex);
      setObjects(history[newIndex].objects);
    }
  }, [history, historyIndex]);

  // Save project
  const handleSave = useCallback(async () => {
    try {
      const sceneData = { objects };

      if (currentProjectId) {
        // Update existing project
        await projectApi.update(currentProjectId, {
          sceneData,
        });
        alert('Project saved successfully!');
      } else {
        // Create new project
        const projectName = prompt('Enter project name:');
        if (projectName) {
          const project = await projectApi.create({
            name: projectName,
            sceneData,
          });
          setCurrentProjectId(project.id);
          alert('Project created and saved successfully!');
        }
      }
    } catch (error) {
      console.error('Failed to save project:', error);
      alert('Failed to save project. Make sure the backend server is running.');
    }
  }, [objects, currentProjectId]);

  // Load project
  const handleLoad = useCallback(async () => {
    try {
      const projects = await projectApi.getAll();

      if (projects.length === 0) {
        alert('No projects found.');
        return;
      }

      // Show simple selection (in a real app, you'd use a proper dialog)
      const projectList = projects
        .map((p, i) => `${i + 1}. ${p.name} (${new Date(p.updatedAt).toLocaleString()})`)
        .join('\n');

      const selection = prompt(`Select a project:\n${projectList}\n\nEnter number:`);

      if (selection) {
        const index = parseInt(selection) - 1;
        if (index >= 0 && index < projects.length) {
          const project = projects[index];
          setObjects(project.sceneData.objects || []);
          setCurrentProjectId(project.id);
          saveToHistory(project.sceneData.objects || []);
          alert(`Loaded project: ${project.name}`);
        }
      }
    } catch (error) {
      console.error('Failed to load project:', error);
      alert('Failed to load projects. Make sure the backend server is running.');
    }
  }, [saveToHistory]);

  // Export scene
  const handleExport = useCallback(() => {
    const sceneData = { objects };
    const dataStr = JSON.stringify(sceneData, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `scene-${Date.now()}.json`;
    link.click();
    URL.revokeObjectURL(url);
  }, [objects]);

  // Import scene
  const handleImport = useCallback(() => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'application/json';
    input.onchange = (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (event) => {
          try {
            const sceneData = JSON.parse(event.target?.result as string);
            if (sceneData.objects && Array.isArray(sceneData.objects)) {
              setObjects(sceneData.objects);
              saveToHistory(sceneData.objects);
              alert('Scene imported successfully!');
            } else {
              alert('Invalid scene file format.');
            }
          } catch (error) {
            console.error('Failed to import scene:', error);
            alert('Failed to import scene.');
          }
        };
        reader.readAsText(file);
      }
    };
    input.click();
  }, [saveToHistory]);

  return (
    <div className="h-screen flex flex-col bg-background text-foreground">
      <Toolbar
        onSave={handleSave}
        onLoad={handleLoad}
        onExport={handleExport}
        onImport={handleImport}
        canUndo={historyIndex > 0}
        canRedo={historyIndex < history.length - 1}
        onUndo={handleUndo}
        onRedo={handleRedo}
      />

      <div className="flex-1 flex overflow-hidden">
        <LeftSidebar
          onAddObject={handleAddObject}
          objects={objects}
          selectedObjectId={selectedObjectId}
          onSelectObject={setSelectedObjectId}
          onDeleteObject={handleDeleteObject}
        />

        <div className="flex-1">
          <Scene3D
            objects={objects}
            selectedObjectId={selectedObjectId}
            onSelectObject={setSelectedObjectId}
          />
        </div>

        <RightSidebar
          selectedObject={selectedObject}
          onUpdateObject={handleUpdateObject}
        />
      </div>
    </div>
  );
}

export default App;
