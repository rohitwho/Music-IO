import { useState } from "react";
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure, Input, Textarea } from "@nextui-org/react";
import { useMutation, useQuery } from "@apollo/client";
import { GET_USER } from "../../utils/Aplllo-Client/queries";
import { UPDATE_USER_PROFILE } from "../../utils/Aplllo-Client/mutation";

export default function Profile({setSaved}) {
    const { isOpen, onOpen, onOpenChange } = useDisclosure();

    const [updateUserProfile] = useMutation(UPDATE_USER_PROFILE); // 
    const { loading, error, data } = useQuery(GET_USER); // Fetch initial user data
    const [username, setUsername] = useState(data?.user.username || "");
    const [email, setEmail] = useState(data?.user.email || "");
    const [description, setDescription] = useState(data?.user.description || "");


 async function handleSave ()  {
        try {
            const { data } = await updateUserProfile({
                variables: {
                    input: {
                        username,
                        email,
                        description
                    }
                }
            });
          
            setSaved(true)
        } catch (error) {
            // Handle error if the update fails
            console.error("Error updating profile:", error);
        }
    }
    
    return (
        <>
       
            <Button variant="flat" color="primary"  size="md" onPress={onOpen}>Profile</Button>
            <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader className="flex flex-col gap-1">Edit Profile</ModalHeader>
                            <ModalBody>

                                <div className="flex w-full flex-wrap md:flex-nowrap gap-4">
                                    <Input
                                        type="username"
                                        label="Username"
                                        value={username}
                                        onChange={(e) => setUsername(e.target.value)}
                                        placeholder="Enter New Username" />
                                </div>

                                <div className="flex w-full flex-wrap md:flex-nowrap gap-4">
                                    <Input
                                        type="email"
                                        label="Email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        placeholder="Enter New Email" />
                                </div>
                                <div>
                                    <Textarea
                                        label="Description"
                                        labelPlacement="inside"
                                        value={description}
                                        onChange={(e) => setDescription(e.target.value)}
                                        placeholder="Enter your description"
                                        className="max-w-lg"
                                    />
                                </div>
                            </ModalBody>
                            <ModalFooter>
                                <Button color="danger" variant="light" onClick={onClose}>
                                    Close
                                </Button>
                                <Button color="primary" onClick={()=>{
                                    handleSave()
                                    onClose()
                                }}>
                                    Save
                                </Button>
                            </ModalFooter>
                        </>
                    )}
                </ModalContent>
            </Modal>
        </>
    );
}

