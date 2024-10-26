import { useEffect, useRef } from "react";
import {
  D3Link,
  D3Node,
  LoadingState,
  MainState,
  Path,
  PathDistanceResult,
  ShowGraph,
} from "./types";
import { Card, CardContent } from "./ui/card";
import * as d3 from "d3";
import { campusGraph, points } from "@/lib/graph";

interface PathVisualCardProps {
  showGraph: ShowGraph;
  loading: LoadingState;
  startPoint: MainState["startPoint"];
  endPoint: MainState["endPoint"];
  path: MainState["path"];
  calculatePathDistance: (path: Path) => PathDistanceResult;
  distance: MainState["distance"];
  allPaths: MainState["allPaths"];
}

export const PathVisualCard = ({
  showGraph,
  loading,
  startPoint,
  endPoint,
  path,
  calculatePathDistance,
  distance,
  allPaths,
}: PathVisualCardProps) => {
  const svgRef = useRef(null);

  useEffect(() => {
    console.log(startPoint, endPoint);
    if (showGraph === "false") return;
    const width = 600;
    const height = 400;
    const nodeRadius = 30;

    const svg = d3
      .select(svgRef.current)
      .attr("width", width)
      .attr("height", height)
      .attr("viewBox", [0, 0, width, height])
      .attr("style", "max-width: 100%; height: auto;");

    svg.selectAll("*").remove();

    const nodes: D3Node[] = points.map((id) => ({ id }));
    const links: D3Link[] = [];
    for (const [source, targets] of Object.entries(campusGraph)) {
      for (const target of Object.keys(targets)) {
        links.push({ source, target, value: campusGraph[source][target] });
      }
    }

    const simulation = d3
      .forceSimulation(nodes)
      .force(
        "link",
        d3
          .forceLink(links)
          .id((d: d3.SimulationNodeDatum) => (d as D3Node).id)
          .distance(100)
      )
      .force("charge", d3.forceManyBody().strength(-1000))
      .force("center", d3.forceCenter(width / 2, height / 2))
      .force("collision", d3.forceCollide().radius(nodeRadius * 1.2));

    const link = svg
      .append("g")
      .selectAll("line")
      .data(links)
      .join("line")
      .attr("stroke", "#94a3b8")
      .attr("stroke-width", 2);

    const linkText = svg
      .append("g")
      .selectAll("text")
      .data(links)
      .join("text")
      .attr("fill", "#ffffff")
      .attr("font-size", "14px")
      .attr("text-anchor", "middle")
      .text((d) => d.value);

    const node = svg
      .append("g")
      .selectAll("circle")
      .data(nodes)
      .join("circle")
      .attr("r", nodeRadius)
      .attr("fill", (d) =>
        d.id === startPoint
          ? "#22c55e"
          : d.id === endPoint
          ? "#ef4444"
          : "#3b82f6"
      );

    const label = svg
      .append("g")
      .selectAll("text")
      .data(nodes)
      .join("text")
      .attr("text-anchor", "middle")
      .attr("dominant-baseline", "central")
      .attr("fill", "white")
      .style("font-size", "10px")
      .style("pointer-events", "none")
      .each(function (d) {
        const words = d.id.split(/\s+/);
        const el = d3.select(this);
        el.text(null);
        for (let i = 0; i < words.length; i++) {
          const tspan = el
            .append("tspan")
            .text(words[i])
            .attr("x", 0)
            .attr("dy", i ? "1.1em" : "-0.5em");
        }
      });

    simulation.on("tick", () => {
      link
        .attr("x1", (d) => (d.source as D3Node).x!)
        .attr("y1", (d) => (d.source as D3Node).y!)
        .attr("x2", (d) => (d.target as D3Node).x!)
        .attr("y2", (d) => (d.target as D3Node).y!);
      linkText
        .attr("x", (d) => {
          const source = d.source as D3Node;
          const target = d.target as D3Node;
          return (source.x! + target.x!) / 2;
        })
        .attr("y", (d) => {
          const source = d.source as D3Node;
          const target = d.target as D3Node;
          return (source.y! + target.y!) / 2;
        });

      node.attr("cx", (d) => d.x!).attr("cy", (d) => d.y!);

      label.attr("transform", (d) => `translate(${d.x},${d.y})`);
    });
  }, [showGraph, startPoint, endPoint, path]);

  return (
    <Card className="bg-[#1a1a1a] border-gray-700">
      <CardContent className="p-4">
        <h2 className="text-lg font-semibold mb-2 text-white">
          Path Visualization
        </h2>
        {loading === "loading" ? (
          <div className="items-center flex justify-center h-32">
            <svg
              className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              ></path>
            </svg>
          </div>
        ) : (
          <>
            {showGraph === "true" ? (
              <>
                <svg ref={svgRef} className="w-full bg-[#2a2a2a] rounded-lg" />
                <h3 className="text-md font-semibold mt-4 mb-2 text-white">
                  All Possible Paths:
                </h3>
                <ul className="list-disc pl-5 space-y-1 text-sm text-gray-300">
                  {allPaths.map((path, index) => (
                    <li key={index}>
                      {path.join(" → ")} (Distance:{" "}
                      {calculatePathDistance(path)})
                    </li>
                  ))}
                </ul>
                <h3 className="text-md font-semibold mt-4 mb-2 text-white">
                  Shortest Path:
                </h3>
                <p className="text-sm text-gray-300">
                  {path.join(" → ")} (Distance: {distance})
                </p>
              </>
            ) : (
              <p className="text-gray-300 text-center py-8">
                Click <b>Find</b> to generate the graph and shortest path using
                Dijkstra's algorithm
              </p>
            )}
          </>
        )}
      </CardContent>
    </Card>
  );
};

export default PathVisualCard;
