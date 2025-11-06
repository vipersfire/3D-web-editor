import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Box, Circle, Triangle, Cylinder as CylinderIcon } from 'lucide-react';
import { SceneObject } from './Scene3D';

interface LeftSidebarProps {
  onAddObject: (type: 'box' | 'sphere' | 'cone' | 'cylinder') => void;
  objects: SceneObject[];
  selectedObjectId: string | null;
  onSelectObject: (id: string) => void;
  onDeleteObject: (id: string) => void;
}

export default function LeftSidebar({
  onAddObject,
  objects,
  selectedObjectId,
  onSelectObject,
  onDeleteObject,
}: LeftSidebarProps) {
  return (
    <div className="w-64 bg-card border-r border-border flex flex-col">
      <div className="p-4 border-b border-border">
        <h2 className="text-lg font-semibold mb-3">Add Objects</h2>
        <div className="grid grid-cols-2 gap-2">
          <Button
            variant="outline"
            className="flex flex-col h-20 gap-2"
            onClick={() => onAddObject('box')}
          >
            <Box className="w-6 h-6" />
            <span className="text-xs">Cube</span>
          </Button>

          <Button
            variant="outline"
            className="flex flex-col h-20 gap-2"
            onClick={() => onAddObject('sphere')}
          >
            <Circle className="w-6 h-6" />
            <span className="text-xs">Sphere</span>
          </Button>

          <Button
            variant="outline"
            className="flex flex-col h-20 gap-2"
            onClick={() => onAddObject('cone')}
          >
            <Triangle className="w-6 h-6" />
            <span className="text-xs">Cone</span>
          </Button>

          <Button
            variant="outline"
            className="flex flex-col h-20 gap-2"
            onClick={() => onAddObject('cylinder')}
          >
            <CylinderIcon className="w-6 h-6" />
            <span className="text-xs">Cylinder</span>
          </Button>
        </div>
      </div>

      <div className="p-4 flex-1 overflow-y-auto">
        <h2 className="text-lg font-semibold mb-3">Scene Objects</h2>
        <div className="space-y-2">
          {objects.length === 0 ? (
            <p className="text-sm text-muted-foreground">No objects in scene</p>
          ) : (
            objects.map((obj) => (
              <Card
                key={obj.id}
                className={`p-3 cursor-pointer transition-colors ${
                  selectedObjectId === obj.id
                    ? 'bg-accent border-primary'
                    : 'hover:bg-accent/50'
                }`}
                onClick={() => onSelectObject(obj.id)}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    {obj.type === 'box' && <Box className="w-4 h-4" />}
                    {obj.type === 'sphere' && <Circle className="w-4 h-4" />}
                    {obj.type === 'cone' && <Triangle className="w-4 h-4" />}
                    {obj.type === 'cylinder' && <CylinderIcon className="w-4 h-4" />}
                    <span className="text-sm capitalize">{obj.type}</span>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-6 w-6 p-0"
                    onClick={(e) => {
                      e.stopPropagation();
                      onDeleteObject(obj.id);
                    }}
                  >
                    ×
                  </Button>
                </div>
              </Card>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
