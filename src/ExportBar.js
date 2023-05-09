import {Button, Checkbox, H5, Intent, Label, Spinner} from "@blueprintjs/core";
import {useQuery} from "react-query";
import {CozoClient, ExportRelations} from "./client";
import {useAtom} from "jotai";
import {authStringAtom, serverUrlAtom} from "./state";
import {useState} from "react";
import {saveAs} from 'file-saver';
import {AppToaster} from "./toaster";


export function ExportBar() {
    const [serverUrl] = useAtom(serverUrlAtom);
    const [authString] = useAtom(authStringAtom);
    const [selected, setSelected] = useState([]);

    const query = useQuery('relations', async () => {
        return await CozoClient({serverUrl, authString, query: '::relations', params: '{}'});
    }, {
        refetchOnMount: true,
        refetchOnWindowFocus: false,
        refetchOnReconnect: false,
        refetchInterval: false,
    });

    async function handleExport() {
        if (!selected.length) {
            return;
        }
        try {
            let res = await ExportRelations({serverUrl, authString, relations: selected});
            const blob = new Blob([JSON.stringify(res.data)], {type: "text/plain;charset=utf-8"});
            saveAs(blob, "export.json");
            AppToaster.show({message: "Exported", intent: Intent.SUCCESS})

        } catch (e) {
            AppToaster.show({message: e.message, intent: Intent.DANGER})
        }
    }

    let content;
    if (query.isSuccess) {
        content = <div>
            <Label>Choose the relations to export</Label>
            {query.data.rows.map((row, i) => <Checkbox
                key={i}
                label={row[0]}
                checked={selected.includes(row[0])}
                onChange={(event) => {
                    if (event.target.checked) {
                        setSelected([...selected, row[0]]);
                    } else {
                        setSelected(selected.filter((item) => item !== row[0]));
                    }
                }}
            />)}
            <Button text="Export" intent={Intent.PRIMARY} onClick={handleExport}/>
        </div>;
    } else {
        content = <Spinner/>;
    }

    return <>
        <H5>Export</H5>
        <div
            style={{
                height: window.innerHeight - 102,
                overflowY: 'scroll',
                overflowX: 'hidden'
            }}
        >
            {content}
        </div>
    </>;
}