import React, { useState } from "react";
import { JsonForms } from "@jsonforms/react";
import {
  materialRenderers,
  materialCells,
} from "@jsonforms/material-renderers";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Box,
  Typography,
  Container,
  Paper,
} from "@mui/material";
import profileSchema from "../schemas/profile-schema.json";

export const JsonFormsEditor = () => {
  const [open, setOpen] = useState(false);
  const [jsonData, setJsonData] = useState(null);
  const [file, setFile] = useState(null);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
  };

  const handleFileUpload = () => {
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        try {
          const parsedData = JSON.parse(reader.result);
          setJsonData(parsedData);
          setOpen(false);
        } catch (error) {
          alert("Invalid JSON file.");
        }
      };
      reader.readAsText(file);
    }
  };

  const handleSubmit = () => {
    handleDownload();
  };

  const handleDownload = () => {
    const dataStr =
      "data:text/json;charset=utf-8," +
      encodeURIComponent(JSON.stringify(jsonData, null, 2));
    const downloadAnchorNode = document.createElement("a");
    downloadAnchorNode.setAttribute("href", dataStr);
    downloadAnchorNode.setAttribute("download", "portfolio.json");
    document.body.appendChild(downloadAnchorNode);
    downloadAnchorNode.click();
    downloadAnchorNode.remove();
  };

  return (
    <Container maxWidth="md">
      {/* Header Section with Conditional Export Button */}
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        mt={4}
        mb={2}
      >
        <Typography variant="h5" component="h1">
          Portfolio JSON Editor
        </Typography>
        <Box display="flex" gap={2}>
          <Button variant="contained" color="primary" onClick={handleClickOpen}>
            Load JSON
          </Button>
          {jsonData && (
            <Button
              variant="contained"
              color="secondary"
              onClick={handleSubmit}
            >
              Export JSON
            </Button>
          )}
        </Box>
      </Box>

      {/* Dialog for Uploading JSON */}
      <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
        <DialogTitle>Upload a JSON File</DialogTitle>
        <DialogContent>
          <Box display="flex" flexDirection="column" alignItems="stretch">
            <TextField
              type="file"
              accept=".json"
              onChange={handleFileChange}
              variant="outlined"
              fullWidth
              margin="normal"
              InputProps={{ style: { padding: "10px" } }}
            />
            {file && (
              <TextField
                value={file.name}
                fullWidth
                disabled
                variant="outlined"
                margin="normal"
              />
            )}
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="secondary">
            Cancel
          </Button>
          <Button onClick={handleFileUpload} color="primary">
            Upload
          </Button>
        </DialogActions>
      </Dialog>

      {/* Initial Content if no JSON has been uploaded */}
      {!jsonData && (
        <Paper
          elevation={3}
          style={{ padding: "20px", textAlign: "center", marginTop: "20px" }}
        >
          <Typography variant="body1" color="textSecondary">
            To begin, upload your JSON file by clicking on the "Load JSON"
            button at the top. Once uploaded, you’ll be able to view and edit
            the details of your portfolio.
          </Typography>
        </Paper>
      )}

      {/* JSON Form Editor after JSON is loaded */}
      {jsonData && (
        <>
          <Box mt={4} mb={2} textAlign="center">
            <Typography variant="h4" component="h1" gutterBottom>
              Edit Your Portfolio
            </Typography>
          </Box>

          <JsonForms
            schema={profileSchema}
            data={jsonData}
            renderers={materialRenderers}
            cells={materialCells}
            onChange={({ data }) => setJsonData(data)}
          />
        </>
      )}
    </Container>
  );
};
