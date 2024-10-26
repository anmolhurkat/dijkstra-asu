import { LoadingState, ShowGraph } from "./types";
import { Card, CardContent } from "./ui/card";

interface PathVisualCardProps {
  showGraph: ShowGraph;
  loading: LoadingState;
}

export const PathVisualCard = ({ showGraph, loading }: PathVisualCardProps) => {
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
              <div>This is the graph</div>
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
