export type ShowGraph = "true" | "false";
export type LoadingState = "loading" | "notLoading";

export type Path = string[];

export type Graph = {
  [key: string]: {
    [key: string]: number;
  };
};

export type DijkstraResult = {
  path: Path;
  distance: number;
  visited: string[];
  allPaths: {
    source: string;
    target: string;
    distance: number;
  }[];
};

export type AllPathsResult = Path[];

export type PathDistanceResult = number;

export type MainState = {
  startPoint: string;
  endPoint: string;
  path: Path;
  distance: number;
  allPaths: AllPathsResult;
};

export type D3Node = {
  id: string;
  x?: number;
  y?: number;
};

export type D3Link = {
  source: string | D3Node;
  target: string | D3Node;
  value: number;
};
