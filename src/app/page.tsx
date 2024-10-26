"use client";

import {
  LoadingState,
  MainState,
  Path,
  PathDistanceResult,
  ShowGraph,
} from "@/components/types";
import PathSelectCard from "@/components/PathSelectCard";
import PathVisualCard from "@/components/PathVisualCard";
import { GitHubLogoIcon, FileTextIcon } from "@radix-ui/react-icons";
import { useState } from "react";
import { campusGraph } from "@/lib/graph";

export default function Home() {
  const [showGraph, setShowGraph] = useState<ShowGraph>("false");
  const [loading, setLoading] = useState<LoadingState>("notLoading");
  const [startPoint, setStartPoint] = useState<MainState["startPoint"]>("");
  const [endPoint, setEndPoint] = useState<MainState["endPoint"]>("");
  const [path, setPath] = useState<MainState["path"]>([]);
  const [distance, setDistance] = useState<MainState["distance"]>(0);
  const [allPaths, setAllPaths] = useState<MainState["allPaths"]>([]);

  function calculatePathDistance(path: Path): PathDistanceResult {
    let distance = 0;
    for (let i = 0; i < path.length - 1; i++) {
      distance += campusGraph[path[i]][path[i + 1]];
    }
    return distance;
  }

  return (
    <div className="flex flex-col items-center justify-start min-h-screen p-4 text-white">
      <div className="w-full max-w-3xl space-y-4">
        <PathSelectCard
          setShowGraph={setShowGraph}
          setLoading={setLoading}
          startPoint={startPoint}
          endPoint={endPoint}
          setStartPoint={setStartPoint}
          setEndPoint={setEndPoint}
          setPath={setPath}
          setDistance={setDistance}
          setAllPaths={setAllPaths}
        />
        <PathVisualCard
          showGraph={showGraph}
          loading={loading}
          startPoint={startPoint}
          endPoint={endPoint}
          path={path}
          calculatePathDistance={calculatePathDistance}
          distance={distance}
          allPaths={allPaths}
        />
        <div className="flex justify-center space-x-4 mt-4">
          <a
            href="https://github.com/anmolhurkat/dijkstra-asu"
            className="text-blue-600 hover:text-blue-700"
          >
            <GitHubLogoIcon className="w-6 h-6" />
          </a>
          <a
            href="insert link later"
            className="text-blue-600 hover:text-blue-700"
          >
            <FileTextIcon className="w-6 h-6" />
          </a>
        </div>
      </div>
    </div>
  );
}
