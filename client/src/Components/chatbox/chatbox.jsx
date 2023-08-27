import React, { useEffect, useState } from "react";
import { useMutation, useQuery } from "@apollo/client";
import { SEND_MESSAGE } from "../../utils/Aplllo-Client/mutation";
import { Input } from "@nextui-org/react";
import { Button } from "@nextui-org/react";
import { Avatar, Link, Divider, Badge, AvatarGroup } from "@nextui-org/react";
import ScrollToBottom from "react-scroll-to-bottom";
import { GET_USER } from "../../utils/Aplllo-Client/queries";
import { Box, Stack } from "@mui/material";
import Lottie from "lottie-react";
import TextMessage from "../Animations-formIcons/TextMesage.json";
import Auth from "../../utils/auth";

export default function Chatbox({ socket }) {
  const [inputValue, setInputValue] = useState("");
  const [message, setMessage] = useState([]);
  const [userCount, setUserCount] = useState([]);
  console.log(userCount);
  const [sentMessage] = useMutation(SEND_MESSAGE);
  const { data } = useQuery(GET_USER);
  const userName = data?.user.username;
  const userData = data?.user._id || {};

  const [room, setRoom] = useState("");
  console.log(room);

  function joinRoom() {
    if (room === "") {
      return;
    }
    socket.emit("join_room", room);
    showUser()
  }


const showUser = async()=>{
let value =localStorage.getItem("username")
const userData = {

  user: value,
}

await socket.emit("users",userData)
setUserCount((prevData) => [...prevData, userData]);



}





  // Text handler
  const handlechange = (e) => {
    setInputValue(e.target.value);
  };
  const handleRoomChange = (e) => {
    setRoom(e.target.value);
    room ? joinRoom() : "";
    //  await  socket.emit("join_room",room)
  };
  const handleText = async () => {
    const socketData = {
      messageContent: inputValue,
      user: userName,
      userID: userData,
      chatRoom: room,
    };
    await socket.emit("send_message", socketData);
    setMessage((prevMessages) => [...prevMessages, socketData]);
    console.log(socketData);
    setInputValue("");

    const saveMessage = {
      messageContent: inputValue,
      // UserId:kk,
    };

    try {
      const response = await sentMessage({
        variables: { input: { ...saveMessage } },
      });

      setInputValue("");
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    socket.on("message_Recieved", (data) => {
      setMessage((prevMessages) => [...prevMessages, data]);
    });

    socket.on("user_data", (data) => {
      setUserCount((prevData) => [...prevData, data]);
    });

    // socket.on("user_disconnected",(data)=>{
    //   disconnected((prevMessages)=>[...prevMessages,data])
    // })
  }, [socket]);

  return (
    <main
      style={{
        display: "flex",
        width: "100%",
      }}
    >
       

      <section
        style={{
          display: "flex",
          justifyContent: "flex-start",
          width: "100%",
          margin: "2%",
          height: "80vh",
          border: "2px solid white",
          borderRadius: "14px",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            borderRight: "1px solid white",
            width: "30%",
            padding: "2%",
            margin: "2%",

            justifyContent: "flex-start",
          }}
        >
          <Input
            className="max-w-[220px]  px-10 "
            radius="sm"
            type="text"
            label="Music Io"
            placeholder="Search Rooms.."
            onChange={(e) => {
              setRoom(e.target.value);
            }}
          />

          <Button
            variant="ghost"
            color="primary"
            onClick={joinRoom}
            style={{ margin: "2%" }}
          >
            Join
          </Button>

          <h2>Popular Rooms</h2>
          <Stack spacing={2} justifyContent={"center"}>
            <Button
              isbordered="false"
              variant="ghost"
              color="warning"
              className=" cursor-pointer"
              value="Rock"
              onPress={handleRoomChange}
            >
              Rock{" "}
            </Button>
            <Badge
              content="2"
              size="lg"
              color="warning"
              shape="rectangle"
            ></Badge>
            <Divider className="  bg-white" />
            <Button
              variant="ghost"
              color="warning"
              className=" cursor-pointer"
              value="Hip-Hop"
              onPress={handleRoomChange}
            >
              Hip-Hop
            </Button>
            <Badge
              content="3"
              size="lg"
              color="warning"
              shape="rectangle"
            ></Badge>
            <Divider className="  bg-white" />
            <Button
              variant="ghost"
              color="warning"
              className=" cursor-pointer"
              value="Jazz"
              onPress={handleRoomChange}
            >
              Jazz
            </Button>
            <Badge
              content="4"
              size="lg"
              color="warning"
              shape="rectangle"
            ></Badge>
            <Divider className="  bg-white" />

            <Button
              variant="ghost"
              color="warning"
              className=" cursor-pointer"
              value="Pop"
              onPress={handleRoomChange}
            >
              Pop
            </Button>
            <Badge
              content="5"
              size="lg"
              color="warning"
              shape="rectangle"
            ></Badge>
            <Divider className="  bg-white" />
          </Stack>
        </div>

        <div
          className="Primary-Chat"
          style={{
            display: "flex",
            maxHeight: "80vh",
            flexDirection: "column",
            padding: "1%",
     
            // justifyContent:"flex-end",
            // alignItems: "flex-end",
            width: "100%",
            
            overflowY: "auto",
          }}
        >
          {room ? (
            <div>
              <Box
                sx={{
                  width: "100%",
                  height: 100,
                  backgroundColor: "white",
                  borderRadius: 2,
                  justifyContent: "flex-start",
                  alignItems: "center",
                  padding: 2,
                  marginBottom:2
                  
                }}
              >
                <h1 className="  font-semibold">Room Name:{room}</h1>
                <AvatarGroup isBordered>
                {userCount.map((uName, index) => (
                <Avatar key={index} isBordered radius="lg" name={uName.user} />
              ))}
                </AvatarGroup>
              </Box>
              {/* <Divider  className="  bg-white" /> */}
            </div>
          ) : (
            ""
          )}

          <ScrollToBottom className="Scroll">
            {message?.map((messages, index) => (
              <div
                key={index}
                style={{
                  position: "sticky",
                  display: "flex",

                  justifyContent:
                    messages.userID === userData ? "flex-end" : "flex-start",
                  // userData.username === messageUser ? "flex-start" : "flex-end",
                  paddingBottom: "1em",
                }}
              >
                <main>
                  <div
                    style={{
                      background:
                        messages.userID === userData ? "#027aff" : "green",
                      color: messages.userID === userData ? "black" : "white",
                      padding: "0.4em",
                      borderRadius:
                        messages.userID === userData
                          ? "10px 10px 0px 24px"
                          : "10px 10px 24px 0px",
                      // maxWidth: "60%",
                    }}
                  >
                    {messages.messageContent}
                  </div>
                  <span
                    style={{
                      display: "flex",
                      paddingTop: "0.2em",

                      justifyContent:
                        messages.userID === userData
                          ? "flex-end"
                          : "flex-start",
                    }}
                  >
                    {userName}
                  </span>
                </main>
              </div>
            ))}
          </ScrollToBottom>
          {Auth.loggedIn() && room ? (
            <div
              style={{
                display: "inline-flex",
                marginInline: "1rem",
                width: "100%",
                alignItems: "center",
                color: "whitesmoke",
                padding: "2%",
              }}
            >
              <Input
                isClearable
                type="text"
                label="Message"
                variant="bordered"
                value={inputValue}
                onChange={handlechange}
                onClear={() => console.log("input cleared")}
              />
              <Button
                onClick={handleText}
                style={{
                  marginInline: "1rem",
                  alignItems: "center",
                  display: "flex",
                  justifyContent: "center",
                }}
                color="primary"
                variant="ghost"
              >
                Send
              </Button>
            </div>
          ) : (
            <div>
              <Lottie animationData={TextMessage}></Lottie>
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
