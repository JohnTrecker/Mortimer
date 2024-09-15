

export async function mockResponse(uri){
    const url = `http://localhost:8000${uri}`
    const res = await fetch(url)
    return await res.json()
}


function sortSubsByAltId(subs) {
    // Can we do this on the server?
    return subs.sort((a, b) => {
        const getId = (sub) => sub.alt_id.replace(/\D/g, '.').split('.').map(Number);
        const idA = getId(a);
        const idB = getId(b);
        for (let i = 0; i < Math.max(idA.length, idB.length); i++) {
            if (idA[i] === undefined) return -1;
            if (idB[i] === undefined) return 1;
            if (idA[i] !== idB[i]) return idA[i] - idB[i];
        }
        return 0;
    });
}

export function nestSubtopics(subs){ // TODO: deprecate once data formatted in server
    const memo = {}
    const alpha = 'abcdefghijklmnopqrstuvwxyz'
        .split('')
        .reduce((memo, letter, number) => ({...memo, [letter]: number}), {})

    for (let sub of sortSubsByAltId(subs)) {
        const { alt_id } = sub
        const [primary, secondary, tertiary] = alt_id.split('.')

        if (tertiary) {
            memo[primary].children[alpha[secondary]].children.push({...sub})
            continue
        }
        if (secondary) {
            memo[primary].children.push({...sub, children: []})
            continue
        }
        if (primary) {
            memo[primary] = {...sub, children: []}
            continue
        }
    }

    return Object.values(memo)
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