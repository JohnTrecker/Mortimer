import { useContext, useEffect, useState } from "react"

import { Autocomplete, AutocompleteItem } from "@nextui-org/react"
import { SupabaseContext } from "@/context/supabase"
import { Tables } from "@/utils/database.types"

type Work = Omit<Tables<'work'>, 'author' | 'author_id'>

interface Props {
    authorId: string | null
    setWork: (w: string) => void;
    setWorkId: (w: string) => void;
}

export default function SelectWork({ authorId, setWork, setWorkId }: Props) {
    const { supabase } = useContext(SupabaseContext)
    const [works, setWorks] = useState<Work[]>([])

    useEffect(() => {
        if (!supabase || !authorId) return
        const fetchWorks = async () => {
            const { data } = await supabase
                .from('work')
                .select('id, title, translator, volume_id')
                .eq('author_id', authorId)
                .order('title', { ascending: true })

            if (data) setWorks(data)
        }

        fetchWorks()
    }, [authorId, supabase])

    return (
        <Autocomplete
            classNames={{
                base: "max-w-m text-[white]",
                listboxWrapper: "bg-[lemonchiffon]",
                selectorButton: "text-default-500",
            }}
            size="lg"
            defaultItems={works ?? []}
            label="Title"
            placeholder="Search by title"
            color="warning"
            onInputChange={setWork}
            onSelectionChange={(id) => setWorkId(String(id))}
            isRequired
            allowsCustomValue
        >
            {(work: Work) => <AutocompleteItem key={work.id}>{work.title}</AutocompleteItem>}
        </Autocomplete>
    )
}