import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import * as yup from "yup";

import Container from "@mui/material/Container";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import TextareaAutosize from "@mui/material/TextareaAutosize";
import Button from "@mui/material/Button";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import { ContactInfo } from "../../schemas/Contact";

export default function Contact() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [gender, setGender] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [validationErrors, setValidationErrors] = useState<any>({});
  const navigate = useNavigate();

  // Yup schema for validation
  const schema = ContactInfo;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      // Validate form data
      await schema.validate(
        {
          FullName: name,
          Message: message,
          email: email,
          gender: gender,
        },
        { abortEarly: false }
      );

      // If validation passes, proceed with form submission
      // Create a URL-encoded form data
      const formData = new URLSearchParams();
      formData.append("name", name);
      formData.append("email", email);
      formData.append("message", message);
      formData.append("gender", gender);

      // Send the data to FormSubmit using fetch or any HTTP library
      fetch("https://formsubmit.co/ajax/trhien541@gmail.com", {
        method: "POST",
        body: formData.toString(),
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.success) {
            setSuccessMessage("Your message has been sent successfully!");
            // Redirect to the homepage after a successful submission
            setTimeout(() => {
              navigate("/");
            }, 2000); // Redirect after 2 seconds
          } else {
            setSuccessMessage(
              "Failed to send the message. Please try again later."
            );
          }
        })
        .catch((error) => {
          console.error("Error:", error);
          setSuccessMessage("An error occurred while sending the message.");
        });
    } catch (error) {
      // Handle validation errors
      const yupErrors: any = {};
      if (error instanceof yup.ValidationError) {
        error.inner.forEach((validationError) => {
          yupErrors[validationError.path as string] = validationError.message;
        });
      }
      setValidationErrors(yupErrors);
    }
  };

  return (
    <Container
      maxWidth="md"
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minWidth: "50vw",
        minHeight: "50vh",
        marginTop: "45px",
      }}
    >
      <Paper elevation={3} sx={{ padding: "20px", textAlign: "left" }}>
        <Typography variant="h4" gutterBottom>
          Contact Us
        </Typography>
        {successMessage !== "" && (
          <Typography variant="body1" color="success">
            {successMessage}
          </Typography>
        )}
        <form onSubmit={handleSubmit}>
          <TextField
            fullWidth
            label="Your Full Name"
            variant="outlined"
            value={name}
            onChange={(e) => setName(e.target.value)}
            margin="normal"
            error={!!validationErrors.FullName}
            helperText={validationErrors.FullName}
          />
          <TextField
            fullWidth
            label="Email address"
            variant="outlined"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            margin="normal"
            error={!!validationErrors.email}
            helperText={validationErrors.email}
          />
          <TextareaAutosize
            minRows={3}
            placeholder="Message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            style={{
              width: "100%",
              padding: "8px",
              fontSize: "16px",
              borderColor: validationErrors.Message ? "red" : undefined,
              backgroundColor: "inherit",
              color: "inherit",
            }}
          />
          <Typography variant="body2" color="error">
            {validationErrors.Message}
          </Typography>

          <Select
            fullWidth
            label="Gender"
            variant="outlined"
            value={gender}
            onChange={(e) => setGender(e.target.value)}
            margin="dense"
            displayEmpty // Add this prop
            error={!!validationErrors.gender}
          >
            <MenuItem value="" disabled>
              <em>Select Your Gender</em>
            </MenuItem>
            <MenuItem value="male">Male</MenuItem>
            <MenuItem value="female">Female</MenuItem>
            <MenuItem value="other">Other</MenuItem>
          </Select>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            sx={{ mt: 2 }}
          >
            Submit
          </Button>
        </form>
      </Paper>
    </Container>
  );
}
