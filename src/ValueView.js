import {Callout, H5} from "@blueprintjs/core";
import {viewingValueAtom} from "./state";
import {useAtom} from "jotai";

export function ViewingValue() {
    let [viewingValue] = useAtom(viewingValueAtom);
    // let col;
    // if (viewingValue) {
    //     col = viewingValue.col + ': ' + (viewingValue.colTitle);
    // } else {
    //     col = '';
    // }
    // let row;
    // if (viewingValue) {
    //     row = viewingValue.row + '';
    // } else {
    //     row = '';
    // }

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
        <H5>Value Viewer</H5>


        <Callout
            style={{
                whiteSpace: 'pre-wrap',
                wordWrap: 'break-word',
                height: window.innerHeight - 102,
                overflowY: 'scroll',
                overflowX: 'hidden'
            }}
        >{value}</Callout>
    </>
}