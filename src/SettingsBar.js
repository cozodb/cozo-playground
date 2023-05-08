import {H5, InputGroup, Label} from "@blueprintjs/core";
import {useAtom} from "jotai";
import {authStringAtom, serverUrlAtom} from "./state";

export function SettingsBar() {
    const [serverUrl, setServerUrl] = useAtom(serverUrlAtom);
    const [authString, setAuthString] = useAtom(authStringAtom);

    return <>
        <H5>Server settings</H5>
        <Label>
            URL (blank for WASM)
            <InputGroup
                placeholder="WASM"
                value={serverUrl}
                onChange={e => setServerUrl(e.target.value)}
            />
        </Label>
        <Label>
            Auth string
            <InputGroup
                type="password"
                placeholder="For non-localhost servers"
                value={authString}
                onChange={e => setAuthString(e.target.value)}
            />
        </Label>
    </>
}