import { cssDocumentation } from "./css-documentation";
import { htmlDocumentation } from "./html-documentation";

export const documentation = [
  ...htmlDocumentation,
  ...cssDocumentation,
];

export function getDocumentationForMission(
  missionOrder: number,
) {
  return documentation.filter(
    (entry) =>
      entry.unlockAtMissionOrder <=
      missionOrder,
  );
}