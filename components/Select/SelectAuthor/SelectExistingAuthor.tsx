import { SupabaseContext } from "@/context/supabase";
import { Tables } from "@/utils/database.types";
import { Autocomplete, AutocompleteItem } from "@nextui-org/react";
import { useContext, useEffect, useState } from "react";

type Author = Omit<Tables<'author'>, 'img_url'> & {
    name: string;
}

interface Props {
    setAuthorId: (i: string | null) => void;
}

export default function SelectExistingAuthor({setAuthorId}: Props) {
    const { supabase } = useContext(SupabaseContext)

    const [authors, setAuthors] = useState<Author[] | []>([])
    const [selectedAuthor, setSelectedAuthor] = useState<Author | null>(null)

    useEffect(() => {
        if (!supabase) return
        const fetchAuthors = async () => {
            const {data, error} = await supabase
                .from('author')
                .select('id, first_name, last_name')
                .order('id', {ascending: true})

             if (error) return
             setAuthors(addName(data))
        }
        fetchAuthors()
    }, [])

    const handleSelect = (author: Author) => {
        setSelectedAuthor(author)
    }

    return (
        <>
            <Autocomplete
                classNames={{
                    base: "max-w-m",
                    listboxWrapper: "bg-[lemonchiffon]",
                    selectorButton: "text-default-500",
                }}
                size="lg"
                defaultItems={authors ?? []}
                label="Author"
                name="author"
                placeholder="Search author by name"
                color="warning"
                // onInputChange={setAuthor}
                onSelectionChange={(n) => setAuthorId(String(n))}
                isRequired
            >
                {(author: Author) => <AutocompleteItem key={author.id} onPress={() => handleSelect(author)}>{author.name}</AutocompleteItem>}
            </Autocomplete >
            {/* <input hidden readOnly name="first_name" value={selectedAuthor?.first_name ?? ''} type="text" />
            <input hidden readOnly name="last_name" value={selectedAuthor?.last_name ?? ''} type="text" /> */}
            <input hidden readOnly name="author_id" value={selectedAuthor?.id ?? 0} type="number" />
        </>
    )
}

function addName(authors: Omit<Author, 'name'>[]): Author[] {
    return authors.map(author => ({
        ...author,
        name: `${author.first_name ?? ''} ${author.last_name }`.trim()
    }))
}