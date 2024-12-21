import { useActionState, useContext, useEffect, useState } from "react";
import { useParams } from 'next/navigation'

import { SelectionDispatchContext, SelectionStateContext } from '@/context/selection';
import { SupabaseContext } from "@/context/supabase";
import { QueryData } from "@supabase/supabase-js";
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, Input, Form, Textarea, Alert } from "@nextui-org/react";

import AuthModal from './AuthModal';
import SelectAuthor from "../Select/SelectAuthor/SelectAuthor";
import SelectWork from "../Select/SelectWork/SelectWork";
import { submitReference } from "@/app/actions/reference";
import { ActionResponse } from "@/types/reference";

interface Props {
    isOpen: boolean;
    onOpenChange: () => void;
}

const initialState: ActionResponse = {
    success: false,
    message: '',
    data: undefined,
}

export default function AddReferenceModal({isOpen, onOpenChange}: Props) {
    const [state, action, isPending] = useActionState(submitReference, initialState)

    const { session, supabase } = useContext(SupabaseContext)
    const { topic, subtopic } = useContext(SelectionStateContext)
    const { updateSeveral } = useContext(SelectionDispatchContext)
    const {id} = useParams()

    // select author ID
    const [authorId, setAuthorId] = useState<string | null>(null)

    // update current topic and subtopic context if needed
    useEffect(() => {
        if (topic.id && subtopic.id || !supabase) return

        const fetchTopicAndSubtopic = async () => {
            const subtopicWithTopicQuery = supabase
                .from('subtopic')
                .select('id, topic(id, name), description')
                .eq('id', id)
                .limit(1)
                .single()

            type SubtopicWithTopic = QueryData<typeof subtopicWithTopicQuery>;

            const { data, error } = await subtopicWithTopicQuery

            if (error) return

            const d: SubtopicWithTopic = data
            const t = Array.isArray(d.topic) ? d.topic[0] : d.topic
            const topic = { id: t.id, name: t.name }
            const subtopic = { id: d.id, name: d.description }

            updateSeveral({topic, subtopic, reference: {id: null, name: null}})
        }
        fetchTopicAndSubtopic()
    }, [])

    // require authentication to add reference
    if (!session) {
        return <AuthModal isOpen={isOpen} onOpenChange={onOpenChange} redirectTo={`/subtopics/${id}`} />
    }

    const handleReset = () => {state.message = ''}

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
                    <Form className="w-full max-w-m" validationBehavior="native" action={action} onReset={handleReset}>
                            <ModalHeader className="w-full flex flex-col gap-1">Add a New Reference</ModalHeader>
                            <ModalBody className="w-full">
                                <Input
                                    label="Topic"
                                    // name intentionally omitted
                                    type="text"
                                    variant="bordered"
                                    defaultValue={topic.name ?? ''}
                                    isReadOnly
                                />
                                <Input
                                    label="Subtopic"
                                    // name intentionally omitted
                                    type="text"
                                    variant="bordered"
                                    defaultValue={subtopic.name ?? ''}
                                    isReadOnly
                                />
                                <SelectAuthor setAuthorId={setAuthorId}/>
                                <SelectWork authorId={authorId} />
                                <Textarea
                                    label="Text"
                                    name="text"
                                    type="text"
                                    placeholder="Type of paste the text here."
                                    variant="bordered"
                                    className={state?.errors?.text ? 'border-red-500' : ''}
                                    isRequired
                                    isClearable
                                />
                                <InputError field='text' state={state}/>
                                <Textarea
                                    label="Key Sentence"
                                    name="summary"
                                    type="text"
                                    placeholder="What's the single most relevant sentence in this text?"
                                    variant="bordered"
                                    className={state?.errors?.summary ? 'border-red-500' : ''}
                                    isRequired
                                    isClearable
                                />
                                <InputError field='summary' state={state} />
                                <Input
                                    label="Page(s)"
                                    name="pages"
                                    type="text"
                                    placeholder="Which page did it come from?"
                                    variant="bordered"
                                    className={state?.errors?.pages ? 'border-red-500' : ''}
                                    isRequired
                                    isClearable
                                />
                                <InputError field='pages' state={state} />
                                <Input
                                    label="Notes"
                                    name="notes"
                                    type="text"
                                    placeholder="Anything you'd like to add?"
                                    variant="bordered"
                                    className={state?.errors?.notes ? 'border-red-500' : ''}
                                    isClearable
                                />
                                <InputError field='notes' state={state} />
                                <input hidden readOnly name="topic_id" value={topic.id ?? 0} type="number" />
                                <input hidden readOnly name="subtopic_id" value={subtopic.id ?? 0} type="number" />
                                <input hidden readOnly name="upvotes" value={0} type="number" />
                                <input hidden readOnly name="downvotes" value={0} type="number" />
                                <input hidden readOnly name="referrer_id" value={session.user.id ?? ''} type="text" />

                                {state?.message && (
                                    <div className="w-full flex items-center my-3">
                                        <Alert
                                            title={state.message}
                                            color={state.success ? "success" : "danger"}
                                            variant="solid"
                                            radius="lg"
                                        />
                                    </div>
                                )}

                            </ModalBody>
                            <ModalFooter className="flex flex-start">
                                <Button color="danger" variant="flat" onPress={onClose}>
                                    Close
                                </Button>
                                <Button color="warning" type="reset">
                                    Reset
                                </Button>
                                <Button color="primary" type="submit" isDisabled={isPending}>
                                    {isPending ? 'Saving...' : 'Submit'}
                                </Button>
                            </ModalFooter>
                        </Form>
                    )}
                </ModalContent>
            </Modal>
    );
}

interface InputErrorProps {
    field: string
    state: ActionResponse
}

function InputError({ field, state }: InputErrorProps) {
    return state?.errors?.[field as keyof typeof state.errors] && (
        <p id={`${field}-error`} className="text-sm text-red-500">
            {state.errors?.[field as keyof typeof state.errors]?.[0]}
        </p>
    )
}
