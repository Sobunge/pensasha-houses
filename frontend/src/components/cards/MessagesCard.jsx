// src/components/MessagesCard.jsx
import React from "react";
import {
  Card,
  CardContent,
  Box,
  Stack,
  Typography,
  Divider,
  Avatar,
  Button,
  IconButton,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import ArrowForwardIcon from "@mui/icons-material/ArrowForwardOutlined";
import MailOutlineIcon from "@mui/icons-material/MailOutlineOutlined";
import CloseIcon from "@mui/icons-material/Close";
import { useAuth } from "../../pages/Auth/AuthContext";

function MessagesCard({ messages = [], compact = false, onClose }) {
  const navigate = useNavigate();
  const { user } = useAuth();
  const role = user?.role || "tenant";

  // Limit messages if compact mode
  const displayMessages = compact ? messages.slice(0, 3) : messages;

  const handleNavigate = (path) => {
    navigate(path);
    if (onClose) onClose();
  };

  return (
    <Card
      elevation={0}
      sx={(theme) => ({
        flex: compact
          ? undefined
          : { xs: "1 1 100%", md: "1 1 45%", lg: "0 1 400px" },
        minWidth: compact
          ? { xs: 300, sm: 360 }
          : { xs: "100%", sm: "320px" },
        borderRadius: `${theme.shape.borderRadius * 2}px`,
        border: `1.5px solid ${theme.palette.secondary.main}66`,
        bgcolor: theme.palette.background.paper,
        display: "flex",
        flexDirection: "column",
        boxShadow: `0 15px 35px -5px ${theme.palette.primary.main}14`,
        transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
        "&:hover": {
          boxShadow: `0px 20px 40px -10px ${theme.palette.primary.main}24`,
          transform: "translateY(-4px)",
          borderColor: theme.palette.secondary.main,
        },
      })}
    >
      {/* --- Header --- */}
      <Box
        sx={(theme) => ({
          display: "flex",
          alignItems: "center",
          gap: 1.5,
          p: 2,
          bgcolor: `${theme.palette.secondary.main}0A`,
          borderBottom: `1px solid ${theme.palette.divider}`,
        })}
      >
        <Box
          sx={(theme) => ({
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: 32,
            height: 32,
            borderRadius: `${theme.shape.borderRadius}px`,
            bgcolor: `${theme.palette.secondary.main}1F`,
            color: theme.palette.secondary.main,
            border: `1px solid ${theme.palette.secondary.main}40`,
          })}
        >
          <MailOutlineIcon sx={{ fontSize: 18 }} />
        </Box>

        <Typography
          variant="subtitle1"
          sx={(theme) => ({
            fontWeight: 800,
            color: theme.palette.primary.main,
            flexGrow: 1,
            fontSize: "1rem",
            letterSpacing: "-0.2px",
          })}
        >
          Messages
        </Typography>

        {onClose && (
          <IconButton
            size="small"
            onClick={onClose}
            sx={(theme) => ({
              color: theme.palette.text.secondary,
              borderRadius: `${theme.shape.borderRadius}px`,
              "&:hover": {
                bgcolor: `${theme.palette.primary.main}0D`,
                color: theme.palette.text.primary,
              },
            })}
          >
            <CloseIcon fontSize="small" />
          </IconButton>
        )}
      </Box>

      {/* --- Message List Area --- */}
      <CardContent
        sx={{
          p: 2,
          flexGrow: 1,
          display: "flex",
          flexDirection: "column",
          justifyContent: displayMessages.length === 0 ? "center" : "flex-start",
          minHeight: 160,
        }}
      >
        <Stack spacing={1}>
          {displayMessages.length === 0 ? (
            <Typography
              variant="body2"
              sx={(theme) => ({ color: theme.palette.text.secondary, textAlign: "center", py: 2 })}
            >
              No recent messages available.
            </Typography>
          ) : (
            displayMessages.map((msg) => (
              <Box
                key={msg.id}
                onClick={() => handleNavigate(`/${role}/messages/${msg.id}`)}
                sx={(theme) => ({
                  display: "flex",
                  alignItems: "center",
                  gap: 1.5,
                  p: 1.25,
                  borderRadius: `${theme.shape.borderRadius * 1.5}px`,
                  cursor: "pointer",
                  transition: "all 0.2s ease-in-out",
                  bgcolor: msg.unread
                    ? `${theme.palette.secondary.main}0F`
                    : "transparent",
                  border: "1px solid",
                  borderColor: msg.unread
                    ? `${theme.palette.secondary.main}40`
                    : "transparent",
                  "&:hover": {
                    bgcolor: `${theme.palette.secondary.main}1A`,
                    borderColor: `${theme.palette.secondary.main}66`,
                    transform: "translateX(3px)",
                  },
                })}
              >
                {/* Avatar with initial */}
                <Avatar
                  sx={(theme) => ({
                    bgcolor: msg.unread ? theme.palette.primary.main : theme.palette.action.hover,
                    color: msg.unread ? theme.palette.secondary.main : theme.palette.text.secondary,
                    width: 38,
                    height: 38,
                    fontSize: "0.875rem",
                    fontWeight: 700,
                    border: msg.unread
                      ? `1.5px solid ${theme.palette.secondary.main}`
                      : `1px solid ${theme.palette.divider}`,
                  })}
                >
                  {msg.sender ? msg.sender[0].toUpperCase() : "U"}
                </Avatar>

                {/* Message Details */}
                <Box sx={{ flexGrow: 1, minWidth: 0 }}>
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                    }}
                  >
                    <Typography
                      variant="subtitle2"
                      sx={(theme) => ({
                        fontWeight: msg.unread ? 800 : 500,
                        color: theme.palette.primary.main,
                        fontSize: "0.875rem",
                      })}
                      noWrap
                    >
                      {msg.sender}
                    </Typography>

                    {/* Unread Glow Dot */}
                    {msg.unread && (
                      <Box
                        sx={(theme) => ({
                          width: 7,
                          height: 7,
                          borderRadius: "50%",
                          bgcolor: theme.palette.secondary.main,
                          boxShadow: `0 0 6px ${theme.palette.secondary.main}CC`,
                        })}
                      />
                    )}
                  </Box>

                  <Typography
                    variant="body2"
                    sx={(theme) => ({
                      color: msg.unread ? theme.palette.text.primary : theme.palette.text.secondary,
                      fontSize: "0.78rem",
                      fontWeight: msg.unread ? 500 : 400,
                    })}
                    noWrap
                  >
                    {msg.lastMessage}
                  </Typography>
                </Box>

                {/* Timestamp */}
                {!compact && (
                  <Typography
                    variant="caption"
                    sx={(theme) => ({ color: theme.palette.text.secondary, fontSize: "0.7rem", flexShrink: 0 })}
                  >
                    {msg.time || "10:00 AM"}
                  </Typography>
                )}
              </Box>
            ))
          )}
        </Stack>
      </CardContent>

      <Divider sx={(theme) => ({ borderStyle: "dashed", borderColor: theme.palette.divider })} />

      {/* --- Action Footer --- */}
      <Box
        sx={{
          p: 2,
          display: "flex",
          justifyContent: { xs: "center", sm: "flex-end" },
        }}
      >
        <Button
          variant="contained"
          endIcon={<ArrowForwardIcon />}
          onClick={() => handleNavigate(`/${role}/messages`)}
          sx={(theme) => ({
            bgcolor: theme.palette.primary.main,
            color: theme.palette.primary.contrastText,
            textTransform: "none",
            fontWeight: 700,
            fontSize: { xs: "0.8125rem", sm: "0.875rem" },
            px: { xs: 2, sm: 3 },
            py: 1.2,
            borderRadius: `${theme.shape.borderRadius}px`,
            width: { xs: "100%", sm: "auto" },
            boxShadow: `0 4px 12px ${theme.palette.primary.main}26`,
            "& .MuiButton-endIcon": {
              color: theme.palette.secondary.main,
            },
            "&:hover": {
              bgcolor: theme.palette.secondary.main,
              color: theme.palette.primary.main,
              boxShadow: `0 6px 16px ${theme.palette.secondary.main}4D`,
              "& .MuiButton-endIcon": {
                color: theme.palette.primary.main,
              },
            },
            transition: "all 0.2s ease-in-out",
          })}
        >
          View All Messages
        </Button>
      </Box>
    </Card>
  );
}

export default MessagesCard;