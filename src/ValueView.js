import {H5, InputGroup, Label} from "@blueprintjs/core";
import {viewingValueAtom} from "./state";
import {useAtom} from "jotai";

export function ViewingValue() {
    let [viewingValue] = useAtom(viewingValueAtom);
    let col;
    if (viewingValue) {
        col = viewingValue.col + ': ' + (viewingValue.colTitle);
    } else {
        col = '';
    }
    let row;
    if (viewingValue) {
        row = viewingValue.row + '';
    } else {
        row = '';
    }

    let value;
    if (viewingValue) {
        value = viewingValue.value;
        if (typeof value !== 'string') {
            value = JSON.stringify(value, null, 2);
        }
    } else {
        value = '';
    }

    return <>
        <H5>Value viewer</H5>

        <div style={{
            paddingTop: 10,
            whiteSpace: 'pre-wrap',
            wordWrap: 'break-word',
            height: window.innerHeight - 100,
            overflowY: 'scroll',
            overflowX: 'hidden'
        }}>{value}</div>
    </>
}