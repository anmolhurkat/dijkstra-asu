import { useState } from "react";
import {
  AllPathsResult,
  DijkstraResult,
  Graph,
  LoadingState,
  MainState,
  Path,
  PathDistanceResult,
  ShowGraph,
} from "./types";
import { campusGraph, points } from "@/lib/graph";

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

interface PathSelectCardProps {
  setShowGraph: (state: ShowGraph) => void;
  setLoading: (state: LoadingState) => void;
}

export const PathSelectCard = ({
  setShowGraph,
  setLoading,
}: PathSelectCardProps) => {
  const { toast } = useToast();
  const [startPoint, setStartPoint] = useState<MainState["startPoint"]>("");
  const [endPoint, setEndPoint] = useState<MainState["endPoint"]>("");
  const [path, setPath] = useState<MainState["path"]>([]);
  const [distance, setDistance] = useState<MainState["distance"]>(0);
  const [algorithmSteps, setAlgorithmSteps] = useState<
    MainState["algorithmSteps"]
  >([]);
  const [allPaths, setAllPaths] = useState<MainState["allPaths"]>([]);

  function dijkstra(graph: Graph, start: string, end: string): DijkstraResult {
    const distances: { [key: string]: number } = {};
    const previous: { [key: string]: string | null } = {};
    const nodes = new Set<string>();
    const visited: string[] = [];
    const allPaths: { source: string; target: string; distance: number }[] = [];

    for (let vertex in graph) {
      distances[vertex] = vertex === start ? 0 : Infinity;
      previous[vertex] = null;
      nodes.add(vertex);
    }

    while (nodes.size > 0) {
      let closest: string | null = null;

      for (let node of nodes) {
        if (closest === null || distances[node] < distances[closest]) {
          closest = node;
        }
      }

      if (closest === end) break;
      if (closest === null) break;

      nodes.delete(closest);
      visited.push(closest);

      for (let neighbor in graph[closest]) {
        const alt = distances[closest] + graph[closest][neighbor];
        if (alt < distances[neighbor]) {
          distances[neighbor] = alt;
          previous[neighbor] = closest;
          allPaths.push({ source: closest, target: neighbor, distance: alt });
        }
      }
    }

    const path: string[] = [];
    let current: string | null = end;

    while (current) {
      path.unshift(current);
      current = previous[current];
    }

    return { path, distance: distances[end], visited, allPaths };
  }

  function findAllPaths(
    graph: Graph,
    start: string,
    end: string,
    path: Path = [],
    paths: AllPathsResult = []
  ): AllPathsResult {
    path = [...path, start];

    if (start === end) {
      paths.push(path);
    } else {
      for (let neighbor in graph[start]) {
        if (!path.includes(neighbor)) {
          findAllPaths(graph, neighbor, end, path, paths);
        }
      }
    }

    return paths;
  }

  function calculatePathDistance(path: Path): PathDistanceResult {
    let distance = 0;
    for (let i = 0; i < path.length - 1; i++) {
      distance += campusGraph[path[i]][path[i + 1]];
    }
    return distance;
  }

  const handleGo = () => {
    if (!startPoint || !endPoint) {
      toast({
        title: "Error",
        description: "Please select both start and end points.",
        variant: "destructive",
      });
      return;
    }

    if (startPoint === endPoint) {
      toast({
        title: "Error",
        description: "Start and end points cannot be the same.",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "",
      description: "",
    });
    setLoading("loading");

    setTimeout(() => {
      const result = dijkstra(campusGraph, startPoint, endPoint);
      setPath(result.path);
      setDistance(result.distance);
      setAlgorithmSteps(result.allPaths);
      setShowGraph("true");
      const paths = findAllPaths(campusGraph, startPoint, endPoint);
      setAllPaths(paths);
      console.log("All Paths:", paths);
      console.log("Shortest Path:", result.path);
      setLoading("notLoading");
    }, 1500);
  };

  return (
    <Card className="bg-[#1a1a1a] border-gray-700">
      <CardContent className="p-4">
        <h2 className="text-lg font-semibold mb-2 text-white">
          Select points to find shortest path
        </h2>
        <div className="space-y-4">
          <div>
            <p className="block text-sm font-medium text-gray-300 mb-1">
              Start Point
            </p>
            <Select value={startPoint} onValueChange={setStartPoint}>
              <SelectTrigger
                id="startPoint"
                className="w-full bg-[#2a2a2a] border-gray-600 text-white"
              >
                <SelectValue placeholder="Select start point" />
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
          <div>
            <p className="block text-sm font-medium text-gray-300 mb-1">
              End Point
            </p>
            <Select value={endPoint} onValueChange={setEndPoint}>
              <SelectTrigger
                id="endPoint"
                className="w-full bg-[#2a2a2a] border-gray-600 text-white"
              >
                <SelectValue placeholder="Select end point" />
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
          <Button
            onClick={handleGo}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white relative overflow-hidden font-bold"
          >
            Find
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default PathSelectCard;
