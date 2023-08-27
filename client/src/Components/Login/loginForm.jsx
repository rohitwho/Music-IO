import React, { useState } from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
  Checkbox,
  Input,
 
} from "@nextui-org/react";
import MailFilledIcon from "../Animations-formIcons/formIcons/MailIcon";
import { LockIcon } from "../Animations-formIcons/formIcons/LockIcon";
import { LOGIN_USER } from "../../utils/Aplllo-Client/mutation";
import {GET_USER} from "../../utils/Aplllo-Client/queries"
import { useMutation,useQuery } from "@apollo/client";
import Auth from "../../utils/auth";
import {Link} from "react-router-dom"

export default function Login() {
  const [logInData, setLoginData] = useState({ email: "", password: "" });
  const [login, { error }] = useMutation(LOGIN_USER);
  const { data } = useQuery(GET_USER);
  const userName = data?.user.username || "Music";
  console.log(userName)

  const handleLogIn = async (event) => {
    const { name, value } = event.target;
    setLoginData({ ...logInData, [name]: value });
  };

  const checkCredentials = async () => {


    try {
      const { data } = await login({
        variables: { ...logInData },
      });
      
      Auth.login(data.login.token);
   
    
      localStorage.setItem("username",logInData.email)

    } catch (err) {
      console.log(err);
    }

    setLoginData({
      email: "",
      password: "",
    });
  };

  const { isOpen, onOpen, onOpenChange } = useDisclosure();


  return (
    <>
      <Button onPress={onOpen} color="primary">
     LogIn
      </Button>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange} placement="top-center">
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">Log in</ModalHeader>
              <ModalBody>
                <Input
                  autoFocus
                  endContent={
                    <MailFilledIcon className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
                  }
                  label="Email"
                  name="email"
                  onChange={handleLogIn}
                  value={logInData.email}
                  placeholder="Enter your email"
                  variant="bordered"
                />
                <Input
                  endContent={
                    <LockIcon className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
                  }
                  label="Password"
                  name="password"
                  onChange={handleLogIn}
                  value={logInData.password}
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
                 
                </div>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="flat" onClick={onClose}>
                  Close
                </Button>
          
                <Button color="primary" onPress={checkCredentials}>
                  Sign in
                  <Link  to = "/login"> link</Link>
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
