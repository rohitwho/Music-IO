

import React, { useState } from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,

  Input,

} from "@nextui-org/react";
// import { GET_USER } from "../../../utils/queries";
import { useQuery, useMutation } from "@apollo/client";
import MailFilledIcon from "../Animations-formIcons/formIcons/MailIcon";
import { LockIcon } from "../Animations-formIcons/formIcons/LockIcon";
import { SIGN_UP } from "../../utils/Aplllo-Client/mutation";
import Auth from "../../utils/auth";






export default function SignUpForm (){



  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  // const { data, loading } = useQuery(GET_USER);
  const [signUp, { error }] = useMutation(SIGN_UP);
  const [userSignupData, setUserSignup] = useState({
    username: "",
    email: "",
    password: "",
  });



  const inputhandler = (event) => {
    const { name, value } = event.target;
    setUserSignup({ ...userSignupData, [name]: value });
  };

  const handleSignUp = async () => {
    try {
      const {data} = await signUp({
        variables: { ...userSignupData },
      });

      if (data.signUp.token) {
        

        Auth.login(data.data.signUp.token);
      } else {
        throw new Error("something went wrong!");
      }
    } catch (err) {
      console.log(err);
    }

    setUserSignup({
      username: "",
      email: "",
      password: "",
    });
  };




return (
    <>
    <Button 
                  onPress={onOpen}
              
                  color="warning"
          
                  variant="flat"
                >
                  Sign Up
                </Button>
    
    
    <Modal isOpen={isOpen} onOpenChange={onOpenChange} placement="top-center">
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Sign Up{" "}
              </ModalHeader>
              <ModalBody>
                <Input
                  autoFocus
                  endContent={
                    <MailFilledIcon className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
                  }
                  name="username"
                  value={userSignupData.username}
                  onChange={inputhandler}
                  label="Username"
                  placeholder="Enter your username"
                  variant="bordered"
                />
                <Input
                  autoFocus
                  endContent={
                    <MailFilledIcon className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
                  }
                  name="email"
                  value={userSignupData.email}
                  onChange={inputhandler}
                  label="Email"
                  placeholder="Enter your email"
                  variant="bordered"
                />
                <Input
                  endContent={
                    <LockIcon className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
                  }
                  name="password"
                  value={userSignupData.password}
                  onChange={inputhandler}
                  label="Password"
                  placeholder="Enter your password"
                  type="password"
                  variant="bordered"
                />
             
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="flat" onClick={onClose}>
                  Close
                </Button>
                <Button color="primary" onPress={handleSignUp}>
                  Sign in
                </Button>

              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
)

} 