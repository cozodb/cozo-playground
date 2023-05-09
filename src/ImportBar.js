import {Button, Classes, Divider, FileInput, H5, InputGroup, Intent, Label} from "@blueprintjs/core";
import {useState} from "react";
import {ImportData} from "./client";
import {AppToaster} from "./toaster";
import {useAtom} from "jotai";
import {authStringAtom, serverUrlAtom} from "./state";

export function ImportBar() {
    const [url, setUrl] = useState('');
    const [file, setFile] = useState(null);
    const [serverUrl] = useAtom(serverUrlAtom);
    const [authString] = useAtom(authStringAtom);

    async function importDataFromUrl() {
        let content;
        try {
            let resp = await fetch(url);
            content = await resp.text();

        } catch (e) {
            AppToaster.show({message: e.message, intent: Intent.DANGER})
            return;
        }
        await doImport(content);
    }

    async function importDataFromFile() {
        if (!file) {
            return;
        }
        let content = await file.text();
        await doImport(content);
    }

    async function doImport(content) {
        try {
            await ImportData({serverUrl, authString, content});
            AppToaster.show({message: "Imported", intent: Intent.SUCCESS})

        } catch (e) {
            AppToaster.show({message: e.message, intent: Intent.DANGER})
        }
    }

    return <>
        <H5>Import</H5>
        <Label>
            From URL
            <InputGroup
                placeholder="Enter the file URL"
                value={url}
                onChange={e => setUrl(e.target.value)}
            />
        </Label>
        <Button text="Import from URL" onClick={importDataFromUrl}/>
        <Divider style={{marginTop: 20, marginBottom: 20}}/>
        <Label>
            From File
            <FileInput
                className={Classes.FILL}
                style={{marginTop: 5}}
                text={(file && file.name) || 'Choose file ...'} onInputChange={(e) => {
                setFile(e.target.files[0]);
            }}
            />
        </Label>
        <Button text="Import from file" onClick={importDataFromFile}/>
    </>;
}