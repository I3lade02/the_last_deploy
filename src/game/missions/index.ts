import type { Mission } from "../../types/game";

import { mission001 } from "./mission-001";
import { mission002 } from "./mission-002";
import { mission003 } from "./mission-003";
import { mission004 } from "./mission-004";
import { mission005 } from "./mission-005";
import { mission006 } from "./mission-006";
import { mission007 } from "./mission-007";
import { mission008 } from "./mission-008";
import { mission009 } from "./mission-009";
import { mission010 } from "./mission-010";
import { mission011 } from "./mission-011";
import { mission012 } from "./mission-012";
import { mission013 } from "./mission-013";

/**
 * ------------------------------------------------
 * MISSION REGISTRY
 * ------------------------------------------------
 */

export const missions:
  Mission[] = [
    mission001,
    mission002,
    mission003,
    mission004,
    mission005,
    mission006,
    mission007,
    mission008,
    mission009,
    mission010,
    mission011,
    mission012,
    mission013,
  ].sort(
    (a, b) =>
      a.order - b.order,
  );

/**
 * Fast mission lookup by ID.
 */
const missionMap =
  new Map<
    string,
    Mission
  >(
    missions.map(
      (mission) => [
        mission.id,
        mission,
      ],
    ),
  );

/**
 * ------------------------------------------------
 * GET MISSION
 * ------------------------------------------------
 */

export function getMissionById(
  id:
    | string
    | null
    | undefined,
): Mission | undefined {
  if (!id) {
    return undefined;
  }

  return missionMap.get(id);
}

/**
 * ------------------------------------------------
 * FIRST MISSION
 * ------------------------------------------------
 */

export function getFirstMission():
  Mission {
  const mission =
    missions[0];

  if (!mission) {
    throw new Error(
      "No missions are registered.",
    );
  }

  return mission;
}

/**
 * ------------------------------------------------
 * NEXT MISSION
 * ------------------------------------------------
 */

export function getNextMission(
  currentMissionId: string,
): Mission | undefined {
  const currentIndex =
    missions.findIndex(
      (mission) =>
        mission.id ===
        currentMissionId,
    );

  if (
    currentIndex === -1
  ) {
    return undefined;
  }

  return missions[
    currentIndex + 1
  ];
}