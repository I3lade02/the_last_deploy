import { getMissionById } from "../missions";
import { useGameStore } from "../../store/use-game-store";

export function useCurrentMission() {
    const currentMissionId = useGameStore(
        (state) => state.currentMissionId,
    );

    return getMissionById(currentMissionId);
}