import { type FormEvent, useState } from "react";

import { ChevronRight } from "lucide-react";

import { useGameStore } from "../store/use-game-store";

export function OnboardingScreen() {
  const createPlayer = useGameStore((state) => state.createPlayer);

  const [name, setName] = useState("");

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    createPlayer(name);
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-[#090b10] p-6">
      <section className="w-full max-w-xl overflow-hidden rounded-xl border border-zinc-800 bg-[#0d1016] shadow-2xl">
        <header className="border-b border-zinc-800 px-6 py-4">
          <p className="font-mono text-xs tracking-[0.25em] text-emerald-400">
            NULLBYTE WORKSTATION
          </p>
        </header>

        <div className="p-8">
          <div className="mb-8 font-mono text-xs leading-6 text-zinc-500">
            <p>Initializing employee profile...</p>
            <p>Network status: ONLINE</p>
            <p>Access level: PENDING</p>
          </div>

          <h1 className="mb-1 text-2xl font-semibold text-white">
            New Employee Setup
          </h1>

          <p className="mb-8 text-sm text-zinc-500">
            Create your Nullbyte employee profile.
          </p>

          <form onSubmit={handleSubmit}>
            <label
              htmlFor="employee-name"
              className="mb-2 block font-mono text-xs uppercase tracking-widest text-zinc-500"
            >
              Name
            </label>

            <input
              id="employee-name"
              autoFocus
              value={name}
              onChange={(event) => setName(event.target.value)}
              placeholder="Enter your name"
              maxLength={32}
              className="w-full rounded-lg border border-zinc-700 bg-[#090b10] px-4 py-3 font-mono text-sm text-white outline-none transition placeholder:text-zinc-700 focus:border-emerald-400/60"
            />

            <dl className="mt-6 grid grid-cols-[120px_1fr] gap-y-3 border-y border-zinc-800 py-5 font-mono text-xs">
              <dt className="text-zinc-600">POSITION</dt>
              <dd className="text-zinc-300">Junior Web Developer</dd>

              <dt className="text-zinc-600">EMPLOYEE ID</dt>
              <dd className="text-zinc-300">#047</dd>

              <dt className="text-zinc-600">ACCESS</dt>
              <dd className="text-amber-400">LIMITED</dd>
            </dl>

            <button
              type="submit"
              disabled={!name.trim()}
              className="mt-6 flex w-full items-center justify-center gap-2 rounded-lg bg-emerald-400 px-4 py-3 font-mono text-sm font-semibold text-[#06110b] transition hover:bg-emerald-300 disabled:cursor-not-allowed disabled:opacity-30"
            >
              CREATE PROFILE
              <ChevronRight className="size-4" />
            </button>
          </form>
        </div>
      </section>
    </main>
  );
}