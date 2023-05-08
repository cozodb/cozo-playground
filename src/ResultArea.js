import {Cell, Column, Table2} from "@blueprintjs/table";
import {Colors} from "@blueprintjs/core";
import {usePreferredColorScheme} from "./hooks/use-color-scheme";
import {useAtom} from "jotai";
import {viewingValueAtom} from "./state";

function displayValue(v, colorScheme) {
    if (typeof v === 'string') {
        return v
    } else {
        // eslint-disable-next-line no-undef
        return <span style={{color: colorScheme === "light" ? Colors.BLUE2 : Colors.BLUE5}}>{JSON.stringify(v)}</span>
    }
}


export function ResultArea({queryResults}) {
    const colorScheme = usePreferredColorScheme();
    const [_, setViewingValue] = useAtom(viewingValueAtom);
    const renderCell = (colIdx) => (rowIdx) => <Cell>
        {displayValue(queryResults.rows[rowIdx][colIdx], colorScheme)}
    </Cell>

    function handleSelection(selection) {
        if (selection.length) {
            const col = selection[0].cols[0];
            const row = selection[0].rows[0];
            setViewingValue({
                col, row,
                colTitle: queryResults.headers[col],
                value: queryResults.rows[row][col]
            });
        }
    }

    return <Table2
        cellRendererDependencies={[renderCell, ...queryResults.rows]}
        numRows={queryResults.rows.length}
        enableFocusedCell
        onSelection={handleSelection}
    >
        {queryResults.headers.map((n, idx) => <Column
            name={n}
            key={idx}
            cellRenderer={renderCell(idx)}
        />)}
    </Table2>
}
