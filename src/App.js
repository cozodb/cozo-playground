import './App.css';
import {
    Alignment, Button, Classes, Navbar, NavbarGroup, NavbarHeading, Tooltip
} from "@blueprintjs/core";
import {useAtom} from 'jotai'
import {InputArea} from "./InputArea";
import {DrawerArea} from "./DrawerArea";
import {selectedBarAtom} from "./state";
import {useBlueprintThemeClassName, usePreferredColorScheme} from "./hooks/use-color-scheme";


function App() {
    const [selectedBar, setSelectedBar] = useAtom(selectedBarAtom);

    const handleBarClick = (barName) => {
        if (barName === selectedBar) {
            setSelectedBar(null);
        } else {
            setSelectedBar(barName);
        }
    }

    const colorScheme = usePreferredColorScheme();
    useBlueprintThemeClassName(colorScheme);

    return (<div className="App" style={{display: 'flex', height: '100vh', flexDirection: 'column'}}>
        <Navbar>
            <NavbarGroup>
                <NavbarHeading>CozoDB Playground</NavbarHeading>
            </NavbarGroup>
            <NavbarGroup align={Alignment.RIGHT}>
                <Tooltip content="Value Viewer" placement='bottom'>
                    <Button
                        className={Classes.MINIMAL} icon="search-template"
                        active={selectedBar === 'value-viewer'}
                        onClick={() => handleBarClick('value-viewer')}
                    />
                </Tooltip>
                <Tooltip content="Parameters" placement='bottom'>
                    <Button
                        className={Classes.MINIMAL} icon="properties"
                        active={selectedBar === 'parameters'}
                        onClick={() => handleBarClick('parameters')}
                    />
                </Tooltip>
                <Tooltip content="History" placement='bottom'>
                    <Button
                        className={Classes.MINIMAL} icon="history"
                        active={selectedBar === 'history'}
                        onClick={() => handleBarClick('history')}
                    />
                </Tooltip>
                <Tooltip content="Export" placement='bottom'>
                    <Button
                        className={Classes.MINIMAL}
                        icon="export"
                        active={selectedBar === 'export'}
                        onClick={() => handleBarClick('export')}
                    />
                </Tooltip>
                <Tooltip content="Import" placement='bottom'>
                    <Button
                        className={Classes.MINIMAL} icon="import"
                        active={selectedBar === 'import'}
                        onClick={() => handleBarClick('import')}
                    />
                </Tooltip>
                <Tooltip content="Settings" placement='bottom-end'>
                    <Button
                        className={Classes.MINIMAL} icon="cog"
                        active={selectedBar === 'settings'}
                        onClick={() => handleBarClick('settings')}
                    />
                </Tooltip>
            </NavbarGroup>
        </Navbar>
        <div style={{display: 'flex', height: 'calc(100vh - 50px)', flexDirection: 'row'}}>
            <InputArea/>
            <DrawerArea/>
        </div>
    </div>);
}

export default App;
