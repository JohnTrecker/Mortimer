import { useContext } from "react";
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button } from "@nextui-org/react";
import { Auth } from '@supabase/auth-ui-react'
import { ThemeSupa } from '@supabase/auth-ui-shared'
import { SupabaseContext } from "@/context/supabase";

interface Props {
    isOpen: boolean,
    onOpenChange: () => void,
    redirectTo: string,
}
export default function AuthModal({ isOpen, onOpenChange, redirectTo }: Props) {
    const { supabase } = useContext(SupabaseContext)

    if (!supabase) {
        return null
    }

    return (
        <Modal
            isOpen={isOpen}
            onOpenChange={onOpenChange}
            placement="top-center"
            backdrop="opaque"
            classNames={{
                body: "py-6",
                backdrop: "bg-[#e7fcf1]/50 backdrop-opacity-40",
                base: "border-[#e7fcf1] bg-[#fffacd] text-[#a8b0d3]",
                header: "border-b-[1px] border-[#e7fcf1] text-[#808080]",
                footer: "border-t-[1px] border-[#e7fcf1]",
                closeButton: "hover:bg-white/5 active:bg-white/10",
            }}
        >
            <ModalContent>
                {(onClose) => (
                    <>
                        <ModalHeader className="flex flex-col gap-1">Sign in to add new references</ModalHeader>
                        <ModalBody autoFocus>
                            <Auth
                                supabaseClient={supabase}
                                additionalData={{
                                    shouldCreateUser: false,
                                }}
                                redirectTo={redirectTo}
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
                                providers={[]}
                                theme="default"
                                view="sign_up"
                                otpType="email"
                            />
                        </ModalBody>
                        <ModalFooter>
                            <Button color="danger" variant="flat" onPress={onClose}>
                                Close
                            </Button>
                        </ModalFooter>
                    </>
                )}
            </ModalContent>
        </Modal>
    );
}