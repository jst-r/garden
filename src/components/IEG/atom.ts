import { type Accessor, type Setter, createSignal } from "solid-js";

export type Atom<T> = Accessor<T> & { set: Setter<T> };
export function atom<T>(initial: T) {
    const [state, setState] = createSignal<T>(initial);
    const atom = Object.assign(state, { set: setState });

    return atom;
}
