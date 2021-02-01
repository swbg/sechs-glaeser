import beer0 from "../creatives/beer_0.svg";
import beer1 from "../creatives/beer_1.svg";
import beer2 from "../creatives/beer_2.svg";
import beer3 from "../creatives/beer_3.svg";
import shot0 from "../creatives/shot_0.svg";
import shot1 from "../creatives/shot_1.svg";
import shot2 from "../creatives/shot_2.svg";
import shot3 from "../creatives/shot_3.svg";
import faceHappy from "../creatives/face_happy.svg";
import faceMedium from "../creatives/face_medium.svg";
import faceMax from "../creatives/face_max.svg";

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
