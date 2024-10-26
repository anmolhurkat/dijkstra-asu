"use client";

import { Card, CardContent, CardHeader } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";

import { useState } from "react";
import campusGraph from "@/lib/graph";
import { ShowGraph } from "./types";

interface PathCardProps {
  setState: (state: ShowGraph) => void;
}

export const PathCard = ({ setState }: PathCardProps) => {
  const locations = Object.keys(campusGraph);
  const [startPoint, setStartPoint] = useState("");
  const [endPoint, setEndPoint] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleGo = () => {};

  return (
    <Card className="bg-[#1a1a1a] border-gray-700">
      <CardHeader className="font-semibold text-white">
        Select points to find shortest path
      </CardHeader>
      <CardContent className="space-y-4">
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
            <SelectContent className="bg-[#2a2a2a]">
              {locations.map((location) => (
                <SelectItem key={location} value={location}>
                  {location}
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
            <SelectContent className="bg-[#2a2a2a]">
              {locations.map((location) => (
                <SelectItem key={location} value={location}>
                  {location}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <Button
          onClick={handleGo}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white relative overflow-hidden"
          disabled={isLoading}
        >
          {isLoading ? (
            <span className="flex items-center justify-center">
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
              Calculating...
            </span>
          ) : (
            "Find Path"
          )}
        </Button>
      </CardContent>
    </Card>
  );
};

export default PathCard;
