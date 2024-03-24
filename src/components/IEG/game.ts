import { createMemo } from "solid-js";
import { atom, type Atom } from "./atom";

export const resources = {
    joules: atom(0)
} as const;

export const stats = {
    joulesPerClick: atom(1),
    totalClicks: atom(0)
}

export interface Upgrade {
    name: string;
    price: number;
    level: Atom<number>;
    maxLevel: number;
    effect: () => void;
}

export const upgrades = {
    hitStronger: {
        name: "Hit stronger",
        price: 5,
        level: atom(0),
        maxLevel: 1,
        effect: () => (1)
    },
    armTraining: {
        name: "Arm training",
        price: 10,
        level: atom(0),
        maxLevel: 1,
        effect: () => (stats.totalClicks() / 100)
    }
} as const satisfies Record<any, Upgrade>;

(window as any).upgrades = upgrades;

export const joulesPerClick = createMemo(() => {
    let perClick = 1;
    if (upgrades.armTraining.level() > 0) {
        perClick += upgrades.armTraining.effect();
    }
    return perClick;
});