// import { Checkbox } from "@nextui-org/react";
// import { useState } from "react";
// import SelectNewAuthor from "./SelectNewAuthor";
// import PlusIcon from "../../Icons/PlusIcon";
import SelectExistingAuthor from "./SelectExistingAuthor";

interface Props {
    setAuthorId: (i: string | null) => void;
}

export default function SelectAuthor({setAuthorId}: Props) {
    return <SelectExistingAuthor setAuthorId={setAuthorId} />

    // TODO: Implement new Author creation

    // const [isNewAuthor, setIsNewAuthor] = useState<boolean>(false)

    // const handleCheck = () => setIsNewAuthor(!isNewAuthor)
    // const checkboxMessage = isNewAuthor ? "Fill in author details" : " I can't find my author"
    // return (
        // <>
        //     {
        //         isNewAuthor ? <SelectNewAuthor/> : <SelectExistingAuthor setAuthorId={setAuthorId}/>
        //     }
        //     <Checkbox checked={isNewAuthor} onChange={handleCheck} color="warning" icon={<PlusIcon />}>
        //         {checkboxMessage}
        //     </Checkbox>
        // </>
    // )

}