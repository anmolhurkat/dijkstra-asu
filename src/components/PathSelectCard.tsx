import { Card, CardContent } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { campusGraph, points } from "@/lib/graph";
import {
  AllPathsResult,
  DijkstraResult,
  Graph,
  LoadingState,
  MainState,
  Path,
  ShowGraph,
} from "./types";

interface PathSelectCardProps {
  setShowGraph: (state: ShowGraph) => void;
  setLoading: (state: LoadingState) => void;
  startPoint: MainState["startPoint"];
  endPoint: MainState["endPoint"];
  setStartPoint: (state: MainState["startPoint"]) => void;
  setEndPoint: (state: MainState["endPoint"]) => void;
  setPath: (state: MainState["path"]) => void;
  setDistance: (state: MainState["distance"]) => void;
  setAllPaths: (state: MainState["allPaths"]) => void;
}

const functions = {
  dijkstra(graph: Graph, start: string, end: string): DijkstraResult {
    const distances: Record<string, number> = {};
    const previous: Record<string, string | null> = {};
    const nodes = new Set<string>();
    const visited: string[] = [];
    const allPaths: Array<{
      source: string;
      target: string;
      distance: number;
    }> = [];

    Object.keys(graph).forEach((vertex) => {
      distances[vertex] = vertex === start ? 0 : Infinity;
      previous[vertex] = null;
      nodes.add(vertex);
    });

    while (nodes.size > 0) {
      const closest = Array.from(nodes).reduce(
        (minNode, node) =>
          !minNode || distances[node] < distances[minNode] ? node : minNode,
        null as string | null
      );

      if (closest === end || !closest) break;

      nodes.delete(closest);
      visited.push(closest);

      Object.entries(graph[closest]).forEach(([neighbor, weight]) => {
        const alt = distances[closest] + weight;
        if (alt < distances[neighbor]) {
          distances[neighbor] = alt;
          previous[neighbor] = closest;
          allPaths.push({ source: closest, target: neighbor, distance: alt });
        }
      });
    }

    const path: string[] = [];
    let current: string | null = end;
    while (current) {
      path.unshift(current);
      current = previous[current];
    }

    return { path, distance: distances[end], visited, allPaths };
  },

  findAllPaths(
    graph: Graph,
    start: string,
    end: string,
    path: Path = [],
    paths: AllPathsResult = []
  ): AllPathsResult {
    const newPath = [...path, start];

    if (start === end) {
      paths.push(newPath);
      return paths;
    }

    Object.keys(graph[start]).forEach((neighbor) => {
      if (!newPath.includes(neighbor)) {
        this.findAllPaths(graph, neighbor, end, newPath, paths);
      }
    });

    return paths;
  },
};

const PointSelector = ({
  label,
  value,
  onChange,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
}) => (
  <div>
    <p className="block text-sm font-medium text-gray-300 mb-1">{label}</p>
    <Select value={value} onValueChange={onChange}>
      <SelectTrigger className="w-full bg-[#2a2a2a] border-gray-600 text-white">
        <SelectValue placeholder={`Select ${label.toLowerCase()}`} />
      </SelectTrigger>
      <SelectContent className="bg-[#2a2a2a] border-gray-600 text-white">
        {points.map((point) => (
          <SelectItem
            key={point}
            value={point}
            className="hover:bg-gray-700 focus:bg-gray-700 focus:text-white"
          >
            {point}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  </div>
);

export const PathSelectCard = ({
  setShowGraph,
  setLoading,
  startPoint,
  endPoint,
  setStartPoint,
  setEndPoint,
  setPath,
  setDistance,
  setAllPaths,
}: PathSelectCardProps) => {
  const { toast } = useToast();

  const validatePoints = (): boolean => {
    if (!startPoint || !endPoint) {
      toast({
        title: "Error",
        description: "Please select both start and end points.",
        variant: "destructive",
      });
      return false;
    }

    if (startPoint === endPoint) {
      toast({
        title: "Error",
        description: "Start and end points cannot be the same.",
        variant: "destructive",
      });
      return false;
    }

    return true;
  };

  const handleGo = () => {
    if (!validatePoints()) return;

    setLoading("loading");
    setTimeout(() => {
      const result = functions.dijkstra(campusGraph, startPoint, endPoint);
      const allPossiblePaths = functions.findAllPaths(
        campusGraph,
        startPoint,
        endPoint
      );

      setPath(result.path);
      setDistance(result.distance);
      setShowGraph("true");
      setAllPaths(allPossiblePaths);
      setLoading("notLoading");
    }, 1500);
  };

  return (
    <Card className="bg-[#1a1a1a] border-gray-700">
      <CardContent className="p-4">
        <h2 className="text-lg font-semibold mb-2 text-white">
          Dijkstra's Algorithm Visualizer @ ASU
        </h2>
        <div className="space-y-4">
          <PointSelector
            label="Start Point"
            value={startPoint}
            onChange={setStartPoint}
          />
          <PointSelector
            label="End Point"
            value={endPoint}
            onChange={setEndPoint}
          />
          <Button
            onClick={handleGo}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white relative overflow-hidden font-bold"
          >
            Go
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default PathSelectCard;
