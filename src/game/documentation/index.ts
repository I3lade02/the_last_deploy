import { htmlDocumentation } from "./html-documentation";

export const documentation = [
    ...htmlDocumentation,
];

export function getDocumentationForMission(
    missionOrder: number,
) {
    return documentation.filter(
        (entry) => 
            entry.unlockAtMissionOrder <= missionOrder,
    );
}