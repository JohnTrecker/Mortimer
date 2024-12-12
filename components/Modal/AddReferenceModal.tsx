import { SupabaseContext } from "@/context/supabase";
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, Checkbox, Input, Link } from "@nextui-org/react";
import { useContext } from "react";
import AuthModal from "./AuthModal";

interface Props {
    isOpen: boolean,
    onOpenChange: () => void
}
export default function AddReferenceModal({isOpen, onOpenChange}: Props) {
    const { session } = useContext(SupabaseContext)

    if (!session) {
        return <AuthModal isOpen={isOpen} onOpenChange={onOpenChange} />
    }

    return (
            <Modal
                isOpen={isOpen}
                onOpenChange={onOpenChange}
                placement="top-center"
            >
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader className="flex flex-col gap-1">Log in</ModalHeader>
                            <ModalBody>
                                <Input
                                    autoFocus
                                    // endContent={
                                    //     <MailIcon className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
                                    // }
                                    label="Email"
                                    placeholder="Enter your email"
                                    variant="bordered"
                                />
                                <Input
                                    // endContent={
                                    //     <LockIcon className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
                                    // }
                                    label="Password"
                                    placeholder="Enter your password"
                                    type="password"
                                    variant="bordered"
                                />
                                <div className="flex py-2 px-1 justify-between">
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
                                </div>
                            </ModalBody>
                            <ModalFooter>
                                <Button color="danger" variant="flat" onPress={onClose}>
                                    Close
                                </Button>
                                <Button color="primary" onPress={onClose}>
                                    Sign in
                                </Button>
                            </ModalFooter>
                        </>
                    )}
                </ModalContent>
            </Modal>
    );
}