"use client";

import { LoadingState, ShowGraph } from "@/components/types";
import PathSelectCard from "@/components/PathSelectCard";
import PathVisualCard from "@/components/PathVisualCard";
import { GitHubLogoIcon, FileTextIcon } from "@radix-ui/react-icons";
import { useState } from "react";

export default function Home() {
  const [showGraph, setShowGraph] = useState<ShowGraph>("false");
  const [loading, setLoading] = useState<LoadingState>("notLoading");

  return (
    <div className="flex flex-col items-center justify-start min-h-screen p-4 text-white">
      <div className="w-full max-w-3xl space-y-4">
        <PathSelectCard setShowGraph={setShowGraph} setLoading={setLoading} />
        <PathVisualCard showGraph={showGraph} loading={loading} />
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
