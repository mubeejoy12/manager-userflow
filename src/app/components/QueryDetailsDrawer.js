import React from "react";
import {
  Box,
  Drawer,
  Typography,
  Button,
  Avatar,
  Divider,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";

const QueryDetailsDrawer = ({ open, onClose, selectedRow, tab }) => {
  return (
    <Drawer
      anchor="right"
      open={open}
      onClose={onClose}
      PaperProps={{
        sx: {
          width: "416px",
          height: "100vh",
          padding: 2,
        },
      }}
    >
      {selectedRow && (
        <Box role="presentation">
          {/* Header with Avatar and Name */}
          <Box display="flex" alignItems="center" gap={1} mb={2}>
            <Avatar
              alt={selectedRow.name}
              src="/path/to/avatar.jpg" // Replace with actual image path
              sx={{ width: 48, height: 48 }}
            />
            <Box>
              <Typography
                sx={{
                  fontFamily: "Outfit",
                  fontWeight: 900,
                  fontSize: "12px",
                  lineHeight: "18px",
                  letterSpacing: "0%",
                  color: "black",
                }}
              >
                {selectedRow.name}
              </Typography>
              <Typography
                sx={{
                  fontFamily: "Outfit",
                  fontWeight: 400,
                  fontSize: "12px",
                  lineHeight: "18px",
                  letterSpacing: "0%",
                  color: tab === 0 ? "#34C759" : "#FFD60A", // Green for Resolved, Yellow for In Progress
                }}
              >
                {selectedRow.status}
              </Typography>
            </Box>
          </Box>

          {/* Employee Details */}
          <Box mt={2}>
            <Typography
              sx={{
                fontFamily: "Outfit",
                fontWeight: 300,
                fontSize: "14px",
                lineHeight: "22px",
                letterSpacing: "0%",
                color: "text.secondary",
              }}
            >
              Employee ID
            </Typography>
            <Typography
              sx={{
                fontFamily: "Outfit",
                fontWeight: 900,
                fontSize: "16px",
                lineHeight: "24px",
                letterSpacing: "0%",
                color: "black",
              }}
            >
              {selectedRow.empId}
            </Typography>
          </Box>
          <Box mt={2}>
            <Typography
              sx={{
                fontFamily: "Outfit",
                fontWeight: 300,
                fontSize: "14px",
                lineHeight: "22px",
                letterSpacing: "0%",
                color: "text.secondary",
              }}
            >
              Role
            </Typography>
            <Typography
              sx={{
                fontFamily: "Outfit",
                fontWeight: 900,
                fontSize: "16px",
                lineHeight: "24px",
                letterSpacing: "0%",
                color: "black",
              }}
            >
              {selectedRow.role}
            </Typography>
          </Box>
          <Box mt={2}>
            <Typography
              sx={{
                fontFamily: "Outfit",
                fontWeight: 300,
                fontSize: "14px",
                lineHeight: "22px",
                letterSpacing: "0%",
                color: "text.secondary",
              }}
            >
              Email
            </Typography>
            <Typography
              sx={{
                fontFamily: "Outfit",
                fontWeight: 900,
                fontSize: "16px",
                lineHeight: "24px",
                letterSpacing: "0%",
                color: "black",
              }}
            >
              {selectedRow.email || "N/A"}
            </Typography>
          </Box>
          <Box mt={2}>
            <Typography
              sx={{
                fontFamily: "Outfit",
                fontWeight: 300,
                fontSize: "14px",
                lineHeight: "22px",
                letterSpacing: "0%",
                color: "text.secondary",
              }}
            >
              Department
            </Typography>
            <Typography
              sx={{
                fontFamily: "Outfit",
                fontWeight: 900,
                fontSize: "16px",
                lineHeight: "24px",
                letterSpacing: "0%",
                color: "black",
              }}
            >
              {selectedRow.dept}
            </Typography>
          </Box>

          <Divider sx={{ my: 2 }} />

          {/* Query or Suspension Details */}
          <Box mt={2}>
            <Typography
              sx={{
                fontFamily: "Outfit",
                fontWeight: 300,
                fontSize: "14px",
                lineHeight: "22px",
                letterSpacing: "0%",
                color: "text.secondary",
              }}
            >
              {tab === 0 ? "Query Type" : "Suspension Type"}
            </Typography>
            <Typography
              sx={{
                fontFamily: "Outfit",
                fontWeight: 500,
                fontSize: "16px",
                lineHeight: "24px",
                letterSpacing: "0%",
                color: "black",
              }}
            >
              {tab === 0 ? selectedRow.type : selectedRow.suspensionReason}
            </Typography>
          </Box>
          {tab === 1 && (
            <>
              <Box mt={2}>
                <Typography
                  sx={{
                    fontFamily: "Outfit",
                    fontWeight: 300,
                    fontSize: "14px",
                    lineHeight: "22px",
                    letterSpacing: "0%",
                    color: "text.secondary",
                  }}
                >
                  From
                </Typography>
                <Typography
                  sx={{
                    fontFamily: "Outfit",
                    fontWeight: 500,
                    fontSize: "16px",
                    lineHeight: "24px",
                    letterSpacing: "0%",
                    color: "black",
                  }}
                >
                  {selectedRow.fromDate}
                </Typography>
              </Box>
              <Box mt={2}>
                <Typography
                  sx={{
                    fontFamily: "Outfit",
                    fontWeight: 300,
                    fontSize: "14px",
                    lineHeight: "22px",
                    letterSpacing: "0%",
                    color: "text.secondary",
                  }}
                >
                  To
                </Typography>
                <Typography
                  sx={{
                    fontFamily: "Outfit",
                    fontWeight: 500,
                    fontSize: "16px",
                    lineHeight: "24px",
                    letterSpacing: "0%",
                    color: "black",
                  }}
                >
                  {selectedRow.toDate}
                </Typography>
              </Box>
            </>
          )}
          {tab === 0 && (
            <Box mt={2}>
              <Typography
                sx={{
                  fontFamily: "Outfit",
                  fontWeight: 300,
                  fontSize: "14px",
                  lineHeight: "22px",
                  letterSpacing: "0%",
                  color: "text.secondary",
                }}
              >
                Date
              </Typography>
              <Typography
                sx={{
                  fontFamily: "Outfit",
                  fontWeight: 900,
                  fontSize: "16px",
                  lineHeight: "24px",
                  letterSpacing: "0%",
                  color: "black",
                }}
              >
                {selectedRow.queryHistory && selectedRow.queryHistory.length > 0
                  ? selectedRow.queryHistory[0].date
                  : new Date().toLocaleDateString("en-GB")}
              </Typography>
            </Box>
          )}

          <Divider sx={{ my: 2 }} />

          {/* Query or Suspension History */}
          <Box mt={2}>
            <Typography
              sx={{
                fontFamily: "Outfit",
                fontWeight: 300,
                fontSize: "14px",
                lineHeight: "22px",
                letterSpacing: "0%",
                color: "text.secondary",
              }}
            >
              {tab === 0 ? "Query History" : "Suspension History"}
            </Typography>
            {selectedRow.queryHistory && selectedRow.queryHistory.length > 0 ? (
              <Box>
                {selectedRow.queryHistory.map((history, index) => (
                  <Typography
                    sx={{
                      fontFamily: "Outfit",
                      fontWeight: 900,
                      fontSize: "16px",
                      lineHeight: "24px",
                      letterSpacing: "0%",
                      color: "black",
                    }}
                    key={index}
                  >
                    {`${history.type} (${history.date})`}
                  </Typography>
                ))}
              </Box>
            ) : (
              <Typography>nil</Typography>
            )}
          </Box>

          <Divider sx={{ my: 2 }} />

          {/* Notes */}
          <Box mt={2}>
            <Typography
              sx={{
                fontFamily: "Outfit",
                fontWeight: 300,
                fontSize: "14px",
                lineHeight: "22px",
                letterSpacing: "0%",
                color: "text.secondary",
              }}
            >
              Notes
            </Typography>
            {selectedRow.notes && selectedRow.notes.length > 0 ? (
              <Box>
                {selectedRow.notes.map((note, index) => (
                  <Box
                    key={index}
                    p={2}
                    mb={2}
                    border={1}
                    borderColor="grey.300"
                    borderRadius={2}
                    bgcolor="grey.100"
                  >
                    <Typography
                      sx={{
                        fontFamily: "Outfit",
                        fontWeight: 900,
                        fontSize: "16px",
                        lineHeight: "24px",
                        letterSpacing: "0%",
                        color: "black",
                      }}
                      variant="subtitle2"
                    >
                      {note.author}
                    </Typography>
                    <Typography
                      sx={{
                        fontFamily: "Outfit",
                        fontWeight: 500,
                        fontSize: "12px",
                        lineHeight: "18px",
                        letterSpacing: "0%",
                        color: "text.secondary",
                      }}
                      variant="caption"
                    >
                      {note.date}
                    </Typography>
                    <Typography>{note.text}</Typography>
                  </Box>
                ))}
              </Box>
            ) : (
              <Typography>N/A</Typography>
            )}
          </Box>

          {/* Add Note Button */}
          <Box mt={4} display="flex" justifyContent="flex-end">
            <Button
              variant="contained"
              color="primary"
              sx={{ borderRadius: "50%", width: 50, height: 50 }}
            >
              <AddIcon />
            </Button>
          </Box>
        </Box>
      )}
    </Drawer>
  );
};

export default QueryDetailsDrawer;
