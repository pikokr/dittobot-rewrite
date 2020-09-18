import fetch from 'node-fetch'

export default async (sessionID: string, query: string): Promise<string> => {
    const { response: { replies: [{ text }] } } = await fetch(`https://builder.pingpong.us/api/builder/${process.env.PINGPONG_ID}/integration/v0.2/custom/${sessionID}`, {
        method: 'POST',
        headers: {
            'Authorization': `Basic ${process.env.PINGPONG_AUTHORIZATION}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            request: {
                query: query
            }
        })
    }).then(res => res.json())

    return text
}