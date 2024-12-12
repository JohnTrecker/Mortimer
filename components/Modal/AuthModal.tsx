import { Auth } from '@supabase/auth-ui-react'
import { ThemeSupa } from '@supabase/auth-ui-shared'
import { useContext } from "react";
import { SupabaseContext } from "@/context/supabase";
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button } from "@nextui-org/react";

interface Props {
    isOpen: boolean,
    onOpenChange: () => void
}
export default function AddReferenceModal({ isOpen, onOpenChange }: Props) {
    const { supabase } = useContext(SupabaseContext)

    if (!supabase) {
        return null
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
                            <Auth
                                supabaseClient={supabase}
                                additionalData={{
                                    shouldCreateUser: false,
                                }}
                                appearance={{
                                    theme: ThemeSupa,
                                    variables: {
                                        default: {
                                            colors: {
                                                brand: '#ffb300',
                                                brandAccent: '#ffb300',
                                            },
                                        },
                                    },
                                }}
                                view="sign_in"
                            />
                        </ModalBody>
                        <ModalFooter>
                            <Button color="danger" variant="flat" onPress={onClose}>
                                Close
                            </Button>
                            {/* <Button color="primary" onPress={onClose}>
                                Sign in
                            </Button> */}
                        </ModalFooter>
                    </>
                )}
            </ModalContent>
        </Modal>
    );
}