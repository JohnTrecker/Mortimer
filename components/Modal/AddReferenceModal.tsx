import { useContext, useState } from "react";
import { useParams } from 'next/navigation'

import { SupabaseContext } from "@/context/supabase";
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, Input, Form, Textarea } from "@nextui-org/react";
import { SelectionStateContext } from '@/context/selection';

import AuthModal from './AuthModal';
import SelectWork from "./SelectWork";
import SelectAuthor from "./SelectAuthor";

interface Props {
    isOpen: boolean,
    onOpenChange: () => void
}

export default function AddReferenceModal({isOpen, onOpenChange}: Props) {
    const { session } = useContext(SupabaseContext)
    const { topic, subtopic } = useContext(SelectionStateContext)
    const {id} = useParams()

    // select author
    const [author, setAuthor] = useState<string | null>(null)
    const [authorId, setAuthorId] = useState<string | null>(null)
    // select work
    const [work, setWork] = useState<string | null>(null)
    const [workId, setWorkId] = useState<string | null>(null)
    // select translator
    const [translator, setTranslator] = useState<string | null>(null)
    const [translatorId, setTranslatorId] = useState<string | null>(null)

    const onSubmit = (data) => {
        console.log(data)
    }

    if (!session) {
        return <AuthModal isOpen={isOpen} onOpenChange={onOpenChange} redirectTo={`/subtopics/${id}`} />
    }

    return (
            <Modal
                isOpen={isOpen}
                onOpenChange={onOpenChange}
                placement="top-center"
                backdrop="blur"
                classNames={{
                    body: "py-6 text-[#808080]",
                    backdrop: "bg-[#e7fcf1]/50 backdrop-opacity-40",
                    base: "border-[#e7fcf1] bg-[#fffacd] text-[#808080]",
                    header: "border-b-[1px] border-[#e7fcf1] text-[#808080]",
                    footer: "border-t-[1px] border-[#e7fcf1]",
                    closeButton: "hover:bg-white/5 active:bg-white/10",
                }}
            >
                <ModalContent>
                    {(onClose) => (
                        <Form className="w-full max-w-m" validationBehavior="native" onSubmit={onSubmit}>
                            <ModalHeader className="w-full flex flex-col gap-1">Add a New Reference</ModalHeader>
                            <ModalBody className="w-full">
                                <Input
                                    label="Topic"
                                    type="text"
                                    variant="bordered"
                                    defaultValue={topic.id!}
                                    isReadOnly
                                />
                                <Input
                                    label="Subtopic"
                                    type="text"
                                    variant="bordered"
                                    defaultValue={subtopic.id!}
                                    isReadOnly
                                />
                                <SelectAuthor setAuthor={setAuthor} setAuthorId={setAuthorId}/>
                                {
                                    author && <SelectWork authorId={authorId} setWork={setWork} setWorkId={setWorkId} />
                                }
                                <Textarea
                                    isClearable
                                    className="max-w-m"
                                    label="Text"
                                    placeholder="Type of paste the text here."
                                    variant="bordered"
                                />
                                <Textarea
                                    isClearable
                                    className="max-w-m"
                                    label="Key Sentence"
                                    placeholder="What's the single most relevant sentence in this text?"
                                    variant="bordered"
                                />
                                <Input
                                    // endContent={
                                    //     <LockIcon className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
                                    // }
                                    isClearable
                                    label="Translator"
                                    type="text"
                                    variant="bordered"
                                />
                                <Input
                                    // endContent={
                                    //     <LockIcon className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
                                    // }
                                    isClearable
                                    label="ISBN"
                                    type="text"
                                    placeholder="ISBN of the volume quoted"
                                    variant="bordered"
                                />
                                <Input
                                    // endContent={
                                    //     <LockIcon className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
                                    // }
                                    isClearable
                                    label="Page(s)"
                                    type="text"
                                    placeholder="Which page did it come from?"
                                    variant="bordered"
                                />
                                {/* <div className="flex py-2 px-1 justify-between">
                                    <Checkbox
                                        classNames={{
                                            label: "text-small",
                                        }}
                                    >
                                        Remember me
                                    </Checkbox>
                                    <Link color="primary" href="#" size="sm">
                                        Forgot password?
                                    </Link>
                                </div> */}
                            </ModalBody>
                            <ModalFooter>
                                <Button color="danger" variant="flat" onPress={onClose}>
                                    Close
                                </Button>
                                <Button color="warning" type="reset">
                                    Reset
                                </Button>
                                <Button color="primary" type="submit">
                                    Submit
                                </Button>
                            </ModalFooter>
                        </Form>
                    )}
                </ModalContent>
            </Modal>
    );
}