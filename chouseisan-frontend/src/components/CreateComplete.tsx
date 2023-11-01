import React, { useState, ChangeEvent } from "react";
import { Link } from "react-router-dom";
import {
  Stack,
  TextField,
  FormControl,
  Button,
  FormHelperText,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Alert,
  Snackbar,
  Grid,
  Autocomplete,
  CircularProgress,
  IconButton,
  Tooltip,
  Box,
} from "@mui/material";
import "./CreateComplete.css";
export default function CreateComplete() {
  console.log("123");
  return (
    <>
      <div className="container">
        <h2 className="form-header">Your event page is ready to be shared!</h2>
        <h4 className="description">
          Your event page is created! You can start inviting people by sharing
          the URL below! Using the URL, your peers can submit when they are
          available to meet.
        </h4>
        <TextField
          size="small"
          fullWidth
          defaultValue={"https://chouseisan.com"}
        />
        <Button
          size="large"
          variant="contained"
          component={Link}
          to="/view_event"
          sx={{
            width: 300,
            height: 50,
            marginTop: 10,
            left: "50%",
            position: "absolute",
            transform: "translate(-50%, -50%)",
            borderRadius: 3,
          }}
        >
          Go to your event page
        </Button>
      </div>
    </>
  );
}
