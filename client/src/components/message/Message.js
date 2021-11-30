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
import "./message.css";

export default function Message({ message, self }) {
  return (
    <Box className={self ? "message self" : "message"}>
      <Box className="messageHeader">
        <Typography className="messageText">{message.text}</Typography>
      </Box>
      {/* <div className="messageBottom">{message.createdAt}</div> */}
    </Box>
  );
}
