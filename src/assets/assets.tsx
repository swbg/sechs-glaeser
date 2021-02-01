import beer0 from "./beer_0.svg";
import beer1 from "./beer_1.svg";
import beer2 from "./beer_2.svg";
import beer3 from "./beer_3.svg";
import shot0 from "./shot_0.svg";
import shot1 from "./shot_1.svg";
import shot2 from "./shot_2.svg";
import shot3 from "./shot_3.svg";
import faceHappy from "./face_happy.svg";
import faceMedium from "./face_medium.svg";
import faceMax from "./face_max.svg";

const glassMapper: { [key: string]: string[] } = {
  beer: [beer0, beer1, beer2, beer3],
  shot: [shot0, shot1, shot2, shot3],
};

const faceMapper = (drinks: number, name: string) => {
  if (drinks >= 10 || name === "Max") {
    return faceMax;
  }
  if (drinks >= 5) {
    return faceMedium;
  }
  return faceHappy;
};

export { glassMapper, faceMapper };
