import { CompletionScreen } from "./screens/CompletionScreen";
import { IntroScreen } from "./screens/IntroScreen";
import { MainMenu } from "./screens/MainMenu";
import { OnboardingScreen } from "./screens/OnboardingScreen";
import { WorkstationScreen } from "./screens/WorkstationScreen";

import { useGameStore } from "./store/use-game-store";

export default function App() {
  const phase = useGameStore((state) => state.phase);

  switch (phase) {
    case "menu":
      return <MainMenu />;

    case "onboarding":
      return <OnboardingScreen />;

    case "intro":
      return <IntroScreen />;

    case "mission":
      return <WorkstationScreen />;

    case "complete":
      return <CompletionScreen />;

    default:
      return <MainMenu />;
  }
}