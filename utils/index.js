import { default as jsonServer } from '../json-server.json'

export async function mockResponse(uri){
    const url = `http://localhost:8000${uri}`
    const res = await fetch(url)
    return await res.json()
}
