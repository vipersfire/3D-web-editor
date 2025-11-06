import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Slider } from '@/components/ui/slider';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { SceneObject } from './Scene3D';

interface RightSidebarProps {
  selectedObject: SceneObject | null;
  onUpdateObject: (id: string, updates: Partial<SceneObject>) => void;
}

export default function RightSidebar({ selectedObject, onUpdateObject }: RightSidebarProps) {
  if (!selectedObject) {
    return (
      <div className="w-80 bg-card border-l border-border p-4">
        <p className="text-sm text-muted-foreground">Select an object to edit properties</p>
      </div>
    );
  }

  const handlePositionChange = (axis: 0 | 1 | 2, value: number[]) => {
    const newPosition = [...selectedObject.position] as [number, number, number];
    newPosition[axis] = value[0];
    onUpdateObject(selectedObject.id, { position: newPosition });
  };

  const handleRotationChange = (axis: 0 | 1 | 2, value: number[]) => {
    const newRotation = [...selectedObject.rotation] as [number, number, number];
    newRotation[axis] = value[0];
    onUpdateObject(selectedObject.id, { rotation: newRotation });
  };

  const handleScaleChange = (axis: 0 | 1 | 2, value: number[]) => {
    const newScale = [...selectedObject.scale] as [number, number, number];
    newScale[axis] = value[0];
    onUpdateObject(selectedObject.id, { scale: newScale });
  };

  const handleColorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onUpdateObject(selectedObject.id, { color: e.target.value });
  };

  return (
    <div className="w-80 bg-card border-l border-border overflow-y-auto">
      <div className="p-4">
        <h2 className="text-lg font-semibold mb-4">Properties</h2>

        <Tabs defaultValue="transform" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="transform">Transform</TabsTrigger>
            <TabsTrigger value="material">Material</TabsTrigger>
          </TabsList>

          <TabsContent value="transform" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-sm">Position</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div>
                  <label className="text-xs text-muted-foreground">X</label>
                  <Slider
                    value={[selectedObject.position[0]]}
                    onValueChange={(value) => handlePositionChange(0, value)}
                    min={-10}
                    max={10}
                    step={0.1}
                  />
                  <span className="text-xs">{selectedObject.position[0].toFixed(2)}</span>
                </div>
                <div>
                  <label className="text-xs text-muted-foreground">Y</label>
                  <Slider
                    value={[selectedObject.position[1]]}
                    onValueChange={(value) => handlePositionChange(1, value)}
                    min={-10}
                    max={10}
                    step={0.1}
                  />
                  <span className="text-xs">{selectedObject.position[1].toFixed(2)}</span>
                </div>
                <div>
                  <label className="text-xs text-muted-foreground">Z</label>
                  <Slider
                    value={[selectedObject.position[2]]}
                    onValueChange={(value) => handlePositionChange(2, value)}
                    min={-10}
                    max={10}
                    step={0.1}
                  />
                  <span className="text-xs">{selectedObject.position[2].toFixed(2)}</span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-sm">Rotation</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div>
                  <label className="text-xs text-muted-foreground">X</label>
                  <Slider
                    value={[selectedObject.rotation[0]]}
                    onValueChange={(value) => handleRotationChange(0, value)}
                    min={0}
                    max={Math.PI * 2}
                    step={0.1}
                  />
                  <span className="text-xs">{selectedObject.rotation[0].toFixed(2)}</span>
                </div>
                <div>
                  <label className="text-xs text-muted-foreground">Y</label>
                  <Slider
                    value={[selectedObject.rotation[1]]}
                    onValueChange={(value) => handleRotationChange(1, value)}
                    min={0}
                    max={Math.PI * 2}
                    step={0.1}
                  />
                  <span className="text-xs">{selectedObject.rotation[1].toFixed(2)}</span>
                </div>
                <div>
                  <label className="text-xs text-muted-foreground">Z</label>
                  <Slider
                    value={[selectedObject.rotation[2]]}
                    onValueChange={(value) => handleRotationChange(2, value)}
                    min={0}
                    max={Math.PI * 2}
                    step={0.1}
                  />
                  <span className="text-xs">{selectedObject.rotation[2].toFixed(2)}</span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-sm">Scale</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div>
                  <label className="text-xs text-muted-foreground">X</label>
                  <Slider
                    value={[selectedObject.scale[0]]}
                    onValueChange={(value) => handleScaleChange(0, value)}
                    min={0.1}
                    max={5}
                    step={0.1}
                  />
                  <span className="text-xs">{selectedObject.scale[0].toFixed(2)}</span>
                </div>
                <div>
                  <label className="text-xs text-muted-foreground">Y</label>
                  <Slider
                    value={[selectedObject.scale[1]]}
                    onValueChange={(value) => handleScaleChange(1, value)}
                    min={0.1}
                    max={5}
                    step={0.1}
                  />
                  <span className="text-xs">{selectedObject.scale[1].toFixed(2)}</span>
                </div>
                <div>
                  <label className="text-xs text-muted-foreground">Z</label>
                  <Slider
                    value={[selectedObject.scale[2]]}
                    onValueChange={(value) => handleScaleChange(2, value)}
                    min={0.1}
                    max={5}
                    step={0.1}
                  />
                  <span className="text-xs">{selectedObject.scale[2].toFixed(2)}</span>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="material">
            <Card>
              <CardHeader>
                <CardTitle className="text-sm">Color</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-3">
                  <input
                    type="color"
                    value={selectedObject.color}
                    onChange={handleColorChange}
                    className="w-16 h-10 rounded cursor-pointer"
                  />
                  <span className="text-sm font-mono">{selectedObject.color}</span>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
