import dJSON from 'dirty-json';
import init, {CozoDb} from "cozo-lib-wasm";


export async function CozoClient(args) {
    if (!args.serverUrl) {
        return WASMClient(args);
    } else {
        return HTTPClient(args);
    }
}

let db;

async function WASMClient({query, params}) {
    if (!db) {
        await init();
        db = CozoDb.new();
    }
    const res_str = db.run(query, JSON.stringify(dJSON.parse(params)));
    console.log(res_str);
    const res = JSON.parse(res_str);
    if (!res.ok) {
        throw res;
    } else {
        return res;
    }
}

async function HTTPClient({serverUrl, authString, query, params}) {
    const url = new URL('/text-query', serverUrl);
    const resp = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'x-cozo-auth': authString
        },
        body: JSON.stringify({
            script: query,
            params: dJSON.parse(params) || {}
        })
    });
    if (resp.ok) {
        return await resp.json();
    } else {
        throw await resp.json();
    }
}

export async function ImportData({serverUrl, authString, content}) {
    if (serverUrl) {
        const url = new URL('/import', serverUrl);
        const resp = await fetch(url, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'x-cozo-auth': authString
            },
            body: content
        });
        if (resp.ok) {
            return await resp.json();
        } else {
            throw await resp.json();
        }
    } else if (db) {
        const res = JSON.parse(db.import_relations(content));
        if (!res.ok) {
            throw res;
        } else {
            return res;
        }
    } else {
        throw new Error('No serverUrl or db');
    }
}
export async function ExportRelations({serverUrl, authString, relations}) {
    if (serverUrl) {
        const url = new URL('/export/' + relations.join(','), serverUrl);
        const resp = await fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'x-cozo-auth': authString
            },
        });
        if (resp.ok) {
            return await resp.json();
        } else {
            throw await resp.json();
        }

    } else if (db) {
        const payload = JSON.stringify({relations: relations})
        console.log(payload);
        return JSON.parse(db.export_relations(payload));
    } else {
        throw new Error('No serverUrl or db');
    }
}