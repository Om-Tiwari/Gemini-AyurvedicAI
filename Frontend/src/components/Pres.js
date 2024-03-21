import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Button, Typography, Grid, Paper } from "@mui/material";

const Prescription = () => {
  const data = useSelector((state) => state.Render.Render);
  const currentDate = new Date().toLocaleDateString();

  const [showHomeRemedy, setShowHomeRemedy] = useState(false);

  const handleHomeRemedy = () => {
    setShowHomeRemedy(!showHomeRemedy);
  };

  return (
    <div className="container mx-auto p-4">
      <Typography variant="h4" align="center" gutterBottom>
        Prescription
      </Typography>
      <Paper elevation={3} className="p-4">
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <Typography>Name of the Patient:</Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography>{data.Name}</Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography>Date of Birth:</Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography>{data.Dob}</Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography>Age:</Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography>{data.Age}</Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography>Contact Number:</Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography>{data.Mobile}</Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography>Today's Date:</Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography>{currentDate}</Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography>Diagnosed with:</Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography>{data.Result.CommonlyUsedforDiseases}</Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="h6">Medication Details</Typography>
          </Grid>
          <Grid item xs={4}>
            <Typography>Ayurvedic Medicine</Typography>
          </Grid>
          <Grid item xs={4}>
            <Typography>Dosage (per day)</Typography>
          </Grid>
          <Grid item xs={4}>
            <Button
              variant="contained"
              onClick={handleHomeRemedy}
              fullWidth
              color={showHomeRemedy ? "secondary" : "primary"}
            >
              {showHomeRemedy ? "Hide Home Remedy" : "Show Home Remedy"}
            </Button>
          </Grid>
          <Grid item xs={4}>
            <Typography>{data.Result.MedicineName}</Typography>
          </Grid>
          <Grid item xs={4}>
            <Typography>{data.Result.Dosage}</Typography>
          </Grid>
          {showHomeRemedy && (
            <Grid item xs={12}>
              <Typography variant="h6">Home Remedy</Typography>
              <Typography>{data.Result.HomeRemedies}</Typography>
            </Grid>
          )}
        </Grid>
      </Paper>
    </div>
  );
};

export default Prescription;
