import axios from "axios";
import { useEffect, useState } from "react";
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Container,
  Divider,
  Fade,
  Grid,
  Paper,
  Rating,
  Stack,
  ThemeProvider,
  Typography,
} from "@mui/material";
import "./conversation.css";

export default function Conversation({ conversation, currentUser }) {
  const [otherUser, setOtherUser] = useState(null);

  useEffect(() => {
    const otherUserId = conversation.members.find((m) => m !== currentUser);

    const getUser = async () => {
      try {
        const res = await axios(`/api/user/profile/${otherUserId}`, {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        });
        setOtherUser({
          ...res.data,
          userId: otherUserId,
        });
      } catch (err) {
        console.log(err);
      }
    };
    getUser();
  }, [currentUser, conversation]);

  return (
    <Box className="conversation" sx={{ backgroundColor: "#f1f1f1" }}>
      {otherUser?.profilePic && (
        <img
          className="profilePic"
          src={otherUser.profilePic}
          alt={`${otherUser?.firstName ?? ""} ${otherUser?.lastName ?? ""}`}
        />
      )}
      <Typography className="conversationName" sx={{ ml: 1 }}>{`${
        otherUser?.firstName ?? ""
      } ${otherUser?.lastName ?? ""}`}</Typography>
    </Box>
  );
}
