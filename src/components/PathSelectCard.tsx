import { useState } from "react";
import { LoadingState, ShowGraph } from "./types";
import { points } from "@/lib/graph";

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
  const [startPoint, setStartPoint] = useState("");
  const [endPoint, setEndPoint] = useState("");

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

    setLoading("loading");
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
