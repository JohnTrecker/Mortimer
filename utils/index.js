import { default as jsonServer } from '../json-server.json'

export async function mockResponse(uri){
    const url = `http://localhost:8000${uri}`
    return await fetch(url)
}
