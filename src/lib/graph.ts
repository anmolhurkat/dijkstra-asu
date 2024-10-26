const campusGraph = {
  "Engineering Center A": {
    "Hayden Library": 2,
    "Tooker House": 4,
    "Sun Devil Fitness Centre": 4,
  },
  "Coor Hall": {
    "Hayden Library": 3,
    "Tooker House": 6,
    "ASU Gammage": 4,
  },
  "Hayden Library": {
    "Engineering Center A": 2,
    "Coor Hall": 3,
    "ASU Gammage": 5,
  },
  "Tooker House": {
    "Engineering Center A": 4,
    "Coor Hall": 6,
  },
  "Barrett Honors College": {
    "Sun Devil Fitness Centre": 3,
  },
  "Sun Devil Fitness Centre": {
    "Engineering Center A": 4,
    "ASU Gammage": 8,
    "Barrett Honors College": 3,
  },
  "ASU Gammage": {
    "Sun Devil Fitness Centre": 8,
    "Hayden Library": 5,
    "Coor Hall": 4,
  },
};

export const points = Object.keys(campusGraph);
