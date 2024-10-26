import { ShowGraph } from "./types";
import { Card, CardContent, CardHeader } from "./ui/card";

interface PathVisualCardProps {
  showGraph: ShowGraph;
}

export const PathVisualCard = ({ showGraph }: PathVisualCardProps) => {
  return (
    <Card className="bg-[#1a1a1a] border-gray-700">
      <CardHeader className="font-semibold text-white">
        Path Visualization
      </CardHeader>
      <CardContent className="space-y-4">
        {showGraph === "true" ? (
          <div>This is the graph</div>
        ) : (
          <p className="text-gray-300 text-center py-8">
            Select points to generate the graph and shortest path using
            Dijkstra's algorithm
          </p>
        )}
      </CardContent>
    </Card>
  );
};

export default PathVisualCard;
