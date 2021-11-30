import "./chatPage.css";
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Container,
  Boxider,
  Fade,
  Grid,
  Paper,
  Rating,
  Stack,
  TextField,
  ThemeProvider,
  Typography,
} from "@mui/material";
import Conversation from "../../components/conversation/Conversation";
import Message from "../../components/message/Message";
import { useContext, useEffect, useRef, useState } from "react";
import axios from "axios";
import { io } from "socket.io-client";
import { useLocation } from "react-router-dom";
import HomeNavBar from "../../components/HomeNavBar";

export default function ChatPage() {
  const [isLoading, setIsLoading] = useState(true);
  const [conversations, setConversations] = useState([]);
  const [currentChat, setCurrentChat] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [arrivalMessage, setArrivalMessage] = useState(null);

  const [loggedUserAvatar, setLoggedUserAvatar] = useState("");
  const [userId, setUserId] = useState(null);

  const socket = useRef();
  const scrollRef = useRef();

  const token = localStorage.getItem("token");

  useEffect(() => {
    socket.current = io("/"); // change the path from "/" to "localhost:5000" for testing locally.
    socket.current.on("getMessage", (data) => {
      setArrivalMessage({
        sender: data.senderId,
        text: data.text,
        createdAt: Date.now(),
      });
    });
  }, [isLoading]);

  useEffect(() => {
    async function fetchUserId() {
      let res = await axios.get("/api/user/id", {
        headers: { Authorization: `Bearer ${token}` },
      });

      let profileRes = await axios.get("/api/user/profile", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setLoggedUserAvatar(profileRes.data["profilePic"]);
      setUserId(res.data.userId);
      setIsLoading(false);
    }
    fetchUserId();
  }, []);

  useEffect(() => {
    arrivalMessage &&
      currentChat?.members.includes(arrivalMessage.sender) &&
      setMessages((prev) => [...prev, arrivalMessage]);
  }, [arrivalMessage, currentChat]);

  useEffect(() => {
    socket.current.emit("addUser", userId);
  }, [userId]);

  useEffect(() => {
    const getConversations = async () => {
      try {
        const res = await axios.get("api/conversations/" + userId);
        setConversations(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getConversations();
  }, [userId]);

  useEffect(() => {
    const getMessages = async () => {
      try {
        const res = await axios.get("api/messages/" + currentChat?._id);
        setMessages(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getMessages();
  }, [currentChat]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const message = {
      senderId: userId,
      text: newMessage,
      conversationId: currentChat._id,
    };

    const receiverId = currentChat.members.find((member) => member !== userId);

    socket.current.emit("sendMessage", {
      senderId: userId,
      receiverId,
      text: newMessage,
    });

    try {
      console.log(message);
      const res = await axios.post("/api/messages", message);
      setMessages([...messages, res.data]);
      setNewMessage("");
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  if (isLoading) {
    return <Typography>Loading...</Typography>;
  }
  return (
    <>
      <HomeNavBar loggedUserAvatar={loggedUserAvatar} />
      <Box>
        <Container>
          <Grid container spacing={2}>
            <Grid item xs={3}>
              <Stack>
                {conversations.map((c) => (
                  <Box onClick={() => setCurrentChat(c)}>
                    <Conversation conversation={c} currentUser={userId} />
                  </Box>
                ))}
              </Stack>
            </Grid>

            <Grid item xs={9}>
              <Box className="chatBox">
                <Box className="chatBoxWrapper">
                  {currentChat ? (
                    <>
                      <Box
                        className="chatBoxTop"
                        sx={{ height: "75vh", overflowY: "auto" }}
                      >
                        <Typography>
                          Chatting with{" "}
                          {currentChat.members.find(
                            (member) => member !== userId
                          )}
                        </Typography>
                        {messages.map((m) => (
                          <Box ref={scrollRef}>
                            <Message message={m} self={m.senderId === userId} />
                          </Box>
                        ))}
                      </Box>
                      <Box className="chatBoxBottom">
                        <Grid
                          container
                          sx={{ alignItems: "center" }}
                          spacing={1}
                        >
                          <Grid item xs={9}>
                            <TextField
                              className="chatMessageInput"
                              placeholder="write something..."
                              onChange={(e) => setNewMessage(e.target.value)}
                              onKeyPress={(e) => {
                                if (e.key === "Enter") handleSubmit(e);
                              }}
                              value={newMessage}
                            />
                          </Grid>
                          <Grid item xs={3}>
                            <Button variant="contained" onClick={handleSubmit}>
                              Send
                            </Button>
                          </Grid>
                        </Grid>
                      </Box>
                    </>
                  ) : (
                    <Typography variant="h4" className="noConversationText">
                      Select a conversation to chat!
                    </Typography>
                  )}
                </Box>
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </>
  );
}
