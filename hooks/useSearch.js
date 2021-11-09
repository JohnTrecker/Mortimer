import { useState } from 'react'

export default function useSearch(rawdata, nameKey){    
    const [input, setInput] = useState('')
    const data = filter(rawdata, nameKey, input)

    return [data, input, search, clear]

    function search(e){ setInput(e.target.value?.toLowerCase() ?? '') }
    function clear(_){ setInput('') }
    function filter(data, nameKey, input){
        const searchPrefixes = data.filter(({[nameKey]: text}) => text.toLowerCase().startsWith(input))
        const searchIncludes = data.filter(({[nameKey]: text}) => text.toLowerCase().includes(input))
        return searchPrefixes.length ? searchPrefixes : searchIncludes    
    }
}