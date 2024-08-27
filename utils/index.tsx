

export async function mockResponse(uri){
    const url = `http://localhost:8000${uri}`
    const res = await fetch(url)
    return await res.json()
}

export function extractExcerpt(res){ // TODO: deprecate once data formatted in server
    let text = ''
    if (Array.isArray(res) && res.length > 0) text = res[0]?.text
    return trimExcerpt(text)
}

function trimExcerpt(str){ // TODO: deprecate once excerpt data is cleaned
    try {
        return str.slice(str.indexOf('.') + 1, str.lastIndexOf('.') + 1)
    } catch {
        return str
    }
}

export function getOrderedListItemDetails(item, path){
    const {id, is_referenced: isReferenced = true} = item
    let href = null
    let classes = 'row'
    if (isReferenced) {
        href = `${path}${id}`
        classes = classes.concat(' link')
    }
    return { classes, href }
}