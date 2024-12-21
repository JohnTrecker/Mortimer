import { SupabaseContext } from "@/context/supabase";
import { Tables } from "@/utils/database.types";
import { Autocomplete, AutocompleteItem } from "@nextui-org/react";
import { useCallback, useContext, useEffect, useState } from "react";

type Work = Omit<Tables<'work'>, 'author' | 'author_id'>

interface HiddenInputState {
    translator: string | null,
    workId: number | null,
    volumeId: number | null,
}
interface Props {
    authorId: string | null
}

export default function SelectExistingWork({ authorId }: Props) {
    const { supabase } = useContext(SupabaseContext)
    const [works, setWorks] = useState<Work[]>([])

    const [hiddenValues, setHiddenValues] = useState<HiddenInputState>({
        translator: null,
        workId: null,
        volumeId: null,
    })

    const fetchWorks = useCallback(async () => {
        if (!supabase || !authorId || authorId === 'null') return
        const { data } = await supabase
            .from('work')
            .select('id, title, translator, volume_id')
            .eq('author_id', authorId)
            .order('title', { ascending: true })

        if (data) setWorks(data)
    }, [authorId, supabase])

    useEffect(() => {
        fetchWorks()
    }, [fetchWorks])

    const handleSelect = (work: Work) => {
        const values = extractHiddenValues(work)
        setHiddenValues({...values})
    }

    return (
        <>
            <Autocomplete
                classNames={{
                    base: "max-w-m text-[white]",
                    listboxWrapper: "bg-[lemonchiffon]",
                    selectorButton: "text-default-500",
                }}
                size="lg"
                label="Title"
                // name="title"
                placeholder="Search by title"
                // color="primary"
                defaultItems={works}
                isDisabled={works.length === 0}
                isRequired
                allowsCustomValue
            >
                {(work: Work) => <AutocompleteItem onPress={() => handleSelect(work)} key={work.id}>{work.title}</AutocompleteItem>}
            </Autocomplete>
            {/* <input hidden readOnly name="translator" value={hiddenValues.translator ?? ''} type="text" /> */}
            <input hidden readOnly name="work_id" value={hiddenValues.workId ?? 0} type="number" />
            <input hidden readOnly name="volume" value={hiddenValues.volumeId ?? 0} type="number" />
        </>
    )
}

function extractHiddenValues(work: Work){
    return {
        translator: work.translator,
        workId: work.id,
        volumeId: work.volume_id
    }
}