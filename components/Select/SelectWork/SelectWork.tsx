// import { Checkbox } from "@nextui-org/react";
// import { useState } from "react";
// import PlusIcon from "../../Icons/PlusIcon";
// import SelectNewWork from "./SelectNewWork";
import SelectExistingWork from "./SelectExistingWork";

interface Props {
    authorId: string | null;
}

export default function SelectWork({ authorId }: Props) {
    return <SelectExistingWork authorId={authorId} />

    // TODO: Implement new Work insertion

    // const [isNewWork, setIsNewWork] = useState<boolean>(false)

    // const handleCheck = () => setIsNewWork(!isNewWork)
    // const checkboxMessage = isNewWork ? "Fill in work details" : " I can't find the title I'm looking for"
    // return (
    //     <>
    //         {
    //             isNewWork ? <SelectNewWork /> : <SelectExistingWork authorId={authorId} />
    //         }
    //         <Checkbox checked={isNewWork} onChange={handleCheck} color="warning" icon={<PlusIcon />}>
    //             {checkboxMessage}
    //         </Checkbox>
    //     </>
    // )
}