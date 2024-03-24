import { createMemo, onCleanup } from "solid-js";
import {
  joulesPerClick,
  resources,
  stats,
  upgrades,
  type Upgrade,
} from "./game";

export function tryPurchaseUpgrade(upgrade: Upgrade) {
  const { joules } = resources;
  if (upgrade.level() < upgrade.maxLevel && joules() >= upgrade.price) {
    upgrade.level.set((prev) => prev + 1);
    joules.set(joules() - upgrade.price);
  }
}

const onTileClick = () => {
  const perClick = joulesPerClick();
  resources.joules.set(resources.joules() + perClick);
  stats.totalClicks.set(stats.totalClicks() + 1);
};

export function IEG() {
  const interval = setInterval(() => {
    // onTileClick();
  }, 500);
  onCleanup(() => {
    clearInterval(interval);
  });
  return (
    <div class="min-h-screen p-2">
      <h1 class="">IEG</h1>
      <ResourceDisplay />
      <GeneratorGrid onTileClick={onTileClick} />
      <Upgrades upgradeKeys={["armTraining"]} />
    </div>
  );
}

export function ResourceDisplay() {
  return (
    <ul>
      <li>Energy: {resources.joules()} J</li>
    </ul>
  );
}

export function GeneratorGrid(props: { onTileClick: () => void }) {
  return (
    <div>
      <button
        onClick={props.onTileClick}
        class="w-16 aspect-square bg-zinc-500"
      ></button>
    </div>
  );
}

export function Upgrades(props: { upgradeKeys: (keyof typeof upgrades)[] }) {
  return (
    <ul>
      {props.upgradeKeys.map((key) => {
        const upgrade = upgrades[key];
        return (
          <li
            class="border border-stone-600 p-2 my-1"
            classList={{ "bg-stone": upgrade.level() === upgrade.maxLevel }}
          >
            <button onClick={() => tryPurchaseUpgrade(upgrade)}>
              {upgrade.name} {upgrade.price} J
            </button>
          </li>
        );
      })}
    </ul>
  );
}
