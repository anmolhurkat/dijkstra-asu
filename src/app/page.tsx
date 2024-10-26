"use client";

import { ShowGraph } from "@/components/types";
import { useState } from "react";
import PathCard from "@/components/path-card";

export default function Home() {
  const [state, setState] = useState<ShowGraph>("false");

  return (
    <div className="flex flex-col items-center justify-start min-h-screen p-4 text-white">
      <div className="w-full max-w-3xl space-y-4">
        <PathCard setState={setState} />
        {state === "true" ? <div>Graph will be displayed here</div> : ""}
      </div>
    </div>
  );
}
