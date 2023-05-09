import {atomWithStorage} from "jotai/utils";
import {atom} from "jotai";

export const drawerSizeAtom = atomWithStorage('drawerSize', 300);
export const selectedBarAtom = atomWithStorage('selectedBar', null);
export const inputSizeAtom = atomWithStorage('inputSize', 300);

export const serverUrlAtom = atomWithStorage('serverUrl', '');

export const authStringAtom = atomWithStorage('authString', '');

export const viewingValueAtom = atom(null);

export const parametersAtom = atomWithStorage('parameters', '{}');

export const historyAtom = atomWithStorage('history', []);