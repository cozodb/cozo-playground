import {parametersAtom} from "./state";
import {useAtom} from "jotai";
import {Classes, H5, TextArea} from "@blueprintjs/core";

export function ParametersView() {
    const [parameters, setParameters] = useAtom(parametersAtom);
    return <>
        <H5>Parameters</H5>
        <TextArea
            className={Classes.FILL}
            style={{
                height: window.innerHeight - 102,
                overflowY: 'scroll',
                overflowX: 'hidden'
            }}
            value={parameters}
            onChange={(e) => setParameters(e.target.value)}
        ></TextArea>
    </>
}