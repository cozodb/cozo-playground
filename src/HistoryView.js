import {Classes, H5, Intent, Menu, MenuDivider, MenuItem} from "@blueprintjs/core";
import {useAtom} from "jotai";
import {historyAtom, parametersAtom} from "./state";
import {queryAtom} from "./InputArea";

export function HistoryView() {
    const [history, setHistory] = useAtom(historyAtom);
    const setParameters = useAtom(parametersAtom)[1];
    const setQuery = useAtom(queryAtom)[1];

    let seen = new Set();

    const historyItems = history.map((h, i) => {
        const date = new Date(h.timestamp);
        const formattedDate = date.toLocaleDateString();
        if (seen.has(formattedDate)) {
            return <div key={i}>
                <MenuItem
                    icon="document"
                    key={i}
                    text={h.query.trim()}
                    onClick={() => {
                        setQuery(h.query);
                        setParameters(h.params);
                    }}
                />
            </div>
        } else {
            seen.add(formattedDate);
            return <div key={i}>
                <MenuDivider key={'d' + i} title={formattedDate}/>
                <MenuItem
                    icon="document"
                    key={i}
                    text={h.query.trim()}
                    onClick={() => {
                        setQuery(h.query);
                        setParameters(h.params);
                    }}
                />
            </div>
        }
    });

    return <>
        <H5>History</H5>
        <Menu
            className={Classes.ELEVATION_1}
            style={{
                height: window.innerHeight - 102,
                overflowY: 'scroll',
                overflowX: 'hidden'
            }}
        >
            {historyItems}
            {history.length ? <>
                <MenuDivider/>
                <MenuItem icon="trash" text="Clear history" intent={Intent.DANGER} onClick={() => {
                    setHistory([]);
                }}/>
            </> : null}
        </Menu>
    </>;
}