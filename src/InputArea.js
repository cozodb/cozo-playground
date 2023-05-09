import {useAtom} from "jotai";
import {Resizable} from "react-resizable";
import {Button, Classes, Intent, Spinner, TextArea} from "@blueprintjs/core";
import {
    authStringAtom,
    drawerSizeAtom,
    historyAtom,
    inputSizeAtom,
    parametersAtom,
    selectedBarAtom,
    serverUrlAtom
} from "./state";
import {ResultArea} from "./ResultArea";
import {useMutation} from "react-query";
import {CozoClient} from "./client";
import {atomWithStorage} from "jotai/utils";
import {parse} from "ansicolor";

export const queryAtom = atomWithStorage('query', '');

export function InputArea() {
    const [selectedBar] = useAtom(selectedBarAtom);
    const [drawerWidth] = useAtom(drawerSizeAtom);
    const [inputHeight, setInputHeight] = useAtom(inputSizeAtom);
    const handleInputResize = (event, {size}) => {
        setInputHeight(size.height);
    };
    const [serverUrl] = useAtom(serverUrlAtom);
    const [authString] = useAtom(authStringAtom);
    const [query, setQuery] = useAtom(queryAtom);
    const [params] = useAtom(parametersAtom);
    const [history, setHistory] = useAtom(historyAtom);

    const sendRequest = useMutation(CozoClient, {
        onSuccess: () => {
            let newHistory = [];
            const timestamp = Date.now();
            newHistory.push({query, params, timestamp});
            for (let item of history) {
                if (item.query !== query) {
                    newHistory.push(item);
                }
            }
            if (history.length > 1000) {
                newHistory = newHistory.slice(0, 1000);
            }
            setHistory(newHistory);
        }
    });

    function typeInTextarea(newText, el = document.activeElement) {
        const [start, end] = [el.selectionStart, el.selectionEnd];
        el.setRangeText(newText, start, end, 'end');
    }

    function handleRequest() {
        const q = query.trim();
        if (q) {
            sendRequest.mutate({serverUrl, authString, query, params});
        }
    }

    function handleKeyDown(e) {
        if (e.key === 'Enter' && e.shiftKey) {
            e.preventDefault();
            e.stopPropagation();
            handleRequest();
        }
        if (e.key === 'Tab' && !e.shiftKey) {
            e.preventDefault();
            e.stopPropagation();
            typeInTextarea('    ');
        }
    }

    let result;

    if (sendRequest.isLoading) {
        result = <Spinner style={{marginTop: 30}}/>
    } else if (sendRequest.isSuccess) {
        result = <ResultArea queryResults={sendRequest.data}/>;
    } else if (sendRequest.isError) {
        if (sendRequest.error.display) {
            const messages = parse(sendRequest.error.display);

            result = <pre id="error-message">
                {messages.spans.map((item, id) => {
                    if (typeof item === 'string') {
                        return <span key={id}>{item}</span>
                    } else {
                        let styles = {};
                        if (item.css) {
                            for (let pair of item.css.split(';')) {
                                pair = pair.trim();
                                if (pair) {
                                    const [k, v] = pair.split(':');
                                    if (k.trim() === 'font-weight') {
                                        styles['fontWeight'] = v.trim()
                                    } else {
                                        styles[k.trim()] = v.trim();
                                    }
                                }
                            }
                        }
                        return <span key={id} style={styles}>{item.text}</span>
                    }
                })}
            </pre>;
        } else {
            result = <div style={{color: 'red'}}>{sendRequest.error.message}</div>;
        }

    }

    return <div style={{
        display: 'flex',
        flexDirection: 'column',
        width: selectedBar ? window.innerWidth - drawerWidth : '100%',
        height: 'calc(100vh - 50px)',
        paddingLeft: 8,
        paddingRight: 8,
    }}>
        <Resizable
            height={inputHeight}
            onResize={handleInputResize}
            axis="y"
            handleSize={[20, 20]}
            resizeHandles={['s']}
        >
            <div style={{
                height: inputHeight, display: 'flex', flexDirection: 'column', paddingTop: 8,
            }}>
                <TextArea
                    autoFocus
                    placeholder="Type query, SHIFT + Enter to run"
                    id="query-box"
                    className={Classes.FILL}
                    large={true}
                    intent={Intent.PRIMARY}
                    onChange={e => setQuery(e.target.value)}
                    onKeyDown={handleKeyDown}
                    spellCheck="false"
                    value={query}
                    style={{marginBottom: 8, flex: 1}}
                />
                <div>
                    <Button text="Submit" intent={Intent.PRIMARY} onClick={handleRequest} disabled={sendRequest.isLoading}/>
                </div>
            </div>

        </Resizable>

        <div style={{flex: 1}}>
            <div style={{height: window.innerHeight - inputHeight, paddingTop: 8, paddingBottom: 8}}>
                {result}
            </div>
        </div>
    </div>
}