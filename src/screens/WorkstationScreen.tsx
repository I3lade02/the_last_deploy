import { CodeWorkspace } from "../components/workstation/CodeWorkspace";
import { PreviewPanel } from "../components/workstation/PreviewPanel";
import { TestPanel } from "../components/workstation/TestPanel";
import { TicketPanel } from "../components/workstation/TicketPanel";
import { TopBar } from "../components/workstation/TopBar";

export function WorkstationScreen() {
  return (
    <main className="flex h-screen min-h-0 flex-col overflow-hidden bg-[#090b10]">
      <TopBar />

      <div className="grid min-h-0 flex-1 grid-cols-[300px_minmax(450px,1fr)_minmax(380px,0.8fr)]">
        <TicketPanel />

        <div className="flex min-h-0 min-w-0 flex-col">
          <CodeWorkspace />

          <TestPanel />
        </div>

        <PreviewPanel />
      </div>
    </main>
  );
}