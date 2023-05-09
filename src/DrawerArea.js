import {useAtom} from "jotai";
import {Resizable} from "react-resizable";
import {drawerSizeAtom, selectedBarAtom} from "./state";
import {SettingsBar} from "./SettingsBar";
import {ViewingValue} from "./ValueView";
import {ParametersView} from "./ParametersView";
import {HistoryView} from "./HistoryView";
import {ImportBar} from "./ImportBar";
import {ExportBar} from "./ExportBar";


export function DrawerArea() {
    const [selectedBar] = useAtom(selectedBarAtom);
    const [drawerWidth, setDrawerWidth] = useAtom(drawerSizeAtom);
    const handleDrawerResize = (event, {size}) => {
        setDrawerWidth(size.width);
    };

    let Bar;
    if (selectedBar === 'settings') {
        Bar = SettingsBar;
    } else if (selectedBar === 'value-viewer') {
        Bar = ViewingValue;
    } else if (selectedBar === 'parameters') {
        Bar = ParametersView;
    } else if (selectedBar === 'history') {
        Bar = HistoryView;
    } else if (selectedBar === 'import') {
        Bar = ImportBar;
    } else if (selectedBar === 'export') {
        Bar = ExportBar;
    }

    if (!Bar) {
        return null;
    }

    return <Resizable
        width={drawerWidth}
        height={Infinity}
        axis="x"
        onResize={handleDrawerResize}
        resizeHandles={['w']}
    >
        <div style={{
            width: drawerWidth,
            padding: 15,
            boxSizing: 'border-box',
            height: 'cal(100vh - 50px)',
            overflowY: 'hidden',
            overflowX: 'hidden'
        }}>
            <Bar/>
        </div>
    </Resizable>
}
