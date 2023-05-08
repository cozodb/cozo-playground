export async function CozoClient(params) {
    if (!params.serverUrl) {
        return WASMClient(params);
    } else {
        return HTTPClient(params);
    }
}

async function WASMClient({query, params}) {

}

async function HTTPClient({serverUrl, authString, query, params}) {
    console.log('sending request to', serverUrl, authString, query, params);
    const url = new URL('/text-query', serverUrl);
    const resp = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'x-cozo-auth': authString
        },
        body: JSON.stringify({
            script: query,
            params: params || {}
        })
    });
    if (resp.ok) {
        return await resp.json();
    } else {
        throw await resp.json();
    }
}