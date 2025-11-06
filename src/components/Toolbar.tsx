import { Button } from '@/components/ui/button';
import {
  Save,
  FolderOpen,
  Download,
  Upload,
  Undo,
  Redo,
  Play,
  Settings
} from 'lucide-react';

interface ToolbarProps {
  onSave: () => void;
  onLoad: () => void;
  onExport: () => void;
  onImport: () => void;
  canUndo: boolean;
  canRedo: boolean;
  onUndo: () => void;
  onRedo: () => void;
}

export default function Toolbar({
  onSave,
  onLoad,
  onExport,
  onImport,
  canUndo,
  canRedo,
  onUndo,
  onRedo,
}: ToolbarProps) {
  return (
    <div className="h-14 bg-card border-b border-border flex items-center px-4 gap-2">
      <div className="flex items-center gap-2">
        <span className="text-xl font-bold text-primary mr-4">3D Editor</span>

        <Button variant="ghost" size="sm" onClick={onSave} title="Save">
          <Save className="w-4 h-4 mr-2" />
          Save
        </Button>

        <Button variant="ghost" size="sm" onClick={onLoad} title="Load">
          <FolderOpen className="w-4 h-4 mr-2" />
          Load
        </Button>

        <div className="w-px h-6 bg-border mx-2" />

        <Button
          variant="ghost"
          size="icon"
          onClick={onUndo}
          disabled={!canUndo}
          title="Undo"
        >
          <Undo className="w-4 h-4" />
        </Button>

        <Button
          variant="ghost"
          size="icon"
          onClick={onRedo}
          disabled={!canRedo}
          title="Redo"
        >
          <Redo className="w-4 h-4" />
        </Button>

        <div className="w-px h-6 bg-border mx-2" />

        <Button variant="ghost" size="sm" onClick={onExport} title="Export">
          <Download className="w-4 h-4 mr-2" />
          Export
        </Button>

        <Button variant="ghost" size="sm" onClick={onImport} title="Import">
          <Upload className="w-4 h-4 mr-2" />
          Import
        </Button>
      </div>

      <div className="ml-auto flex items-center gap-2">
        <Button variant="ghost" size="icon" title="Settings">
          <Settings className="w-4 h-4" />
        </Button>
      </div>
    </div>
  );
}
