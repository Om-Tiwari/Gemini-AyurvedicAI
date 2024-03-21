import { useState } from "react";
import {
  TextField,
  Button,
  Grid,
  IconButton,
  FormControl,
} from "@mui/material";
import { FormLabel, RadioGroup, FormControlLabel, Radio } from "@mui/material";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  Autocomplete,
} from "@mui/material";
import { Close } from "@mui/icons-material";
import symp from "./SympList";
import axios from "axios";
import { useDispatch } from "react-redux";
import { addData } from "../redux/data";

const Form = (props) => {
  const [name, setName] = useState("");
  const [emailAddress, setEmailAddress] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");
  const [age, setAge] = useState("");
  const [dob, setDob] = useState("");
  const [height, setHeight] = useState("");
  const [weight, setWeight] = useState("");
  const [selectedValue, setSelectedValue] = useState("Symptoms");

  const dispatch = useDispatch();

  const handleClose = () => {
    props.setOpen(false);
  };

  const handleAutocompleteChange = (event, newValue) => {
    console.log("added", newValue);
    setSelectedValue(newValue);
  };

  // const handleAutocompleteChange = (event, newValue) => {
  //   setSelectedValue(newValue);
  // };

  // const handleAutocompleteChange = (e, newValue) => {
  //   if(!newValue){
  //     setSelectedValue(e.target.value)
  //     console.log("typed value",e.target.value);
  //   }
  //   else{
  //     setSelectedValue(newValue); // Update selectedValue when an option is selected
  //     console.log("selected value",newValue);

  //   }
  // };

  const handleSubmit = () => {
    if (
      name === "" ||
      emailAddress === "" ||
      mobileNumber === "" ||
      age === "" ||
      dob === "" ||
      height === "" ||
      weight === "" ||
      selectedValue === "Symptoms" ||
      selectedValue === ""
    ) {
      alert("All fields are required");
    } else {
      const fetchSymptom = async () => {
        console.log("new data", selectedValue);
        const body = { Symptoms: selectedValue };
        const data = await axios.post("http://127.0.0.1:8000/", body);
        // const data = await axios.post("https://ayurmedic-txyf.onrender.com", body);
        dispatch(
          addData({
            Data: {
              Name: name,
              Email: emailAddress,
              Mobile: mobileNumber,
              Age: age,
              Dob: dob,
              Height: height,
              Weight: weight,
              Result: data.data,
            },
          })
        );
        console.log("response", props.data);
        props.setOpen(false);
        props.setprescription(true);
      };
      fetchSymptom();
    }
  };

  return (
    <Dialog
      open={props.open}
      onClose={handleClose}
      sx={{
        justifyContent: "center",
        display: "flex",
        flexDirection: "column",
        m: "auto",
        width: "40%",
      }}
    >
      <DialogTitle id="alert-dialog-title">
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <div
            style={{
              marginBottom: "5px",
              fontFamily: "Poppins",
              fontSize: "18px",
              fontWeight: "bold",
            }}
          >
            Patient Details
          </div>
          <div onClick={handleClose} style={{ cursor: "pointer" }}>
            <IconButton>
              <Close />
            </IconButton>
          </div>
        </div>
      </DialogTitle>
      <DialogContent>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              fullWidth
              value={name}
              variant="outlined"
              label="Patient's Name"
              onChange={(event) => setName(event.target.value)}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              fullWidth
              value={emailAddress}
              variant="outlined"
              label="Email Address(abc@xyz.com)"
              onChange={(event) => setEmailAddress(event.target.value)}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              fullWidth
              value={mobileNumber}
              variant="outlined"
              label="Mobile Number"
              onChange={(event) => setMobileNumber(event.target.value)}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              fullWidth
              value={age}
              variant="outlined"
              label="Age"
              onChange={(event) => setAge(event.target.value)}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              fullWidth
              value={dob}
              variant="outlined"
              label="Date of Birth(dd/mm/yyyy)"
              onChange={(event) => setDob(event.target.value)}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              fullWidth
              value={height}
              variant="outlined"
              label="Height(cm)"
              onChange={(event) => setHeight(event.target.value)}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              fullWidth
              value={weight}
              variant="outlined"
              label="Weight(kg)"
              onChange={(event) => setWeight(event.target.value)}
            />
          </Grid>
          <Grid item xs={6}>
            <FormControl>
              <FormLabel id="demo-row-radio-buttons-group-label">
                Gender
              </FormLabel>
              <RadioGroup
                row
                aria-labelledby="demo-row-radio-buttons-group-label"
                name="row-radio-buttons-group"
              >
                <FormControlLabel
                  value="female"
                  control={<Radio />}
                  label="Female"
                />
                <FormControlLabel
                  value="male"
                  control={<Radio />}
                  label="Male"
                />
              </RadioGroup>
            </FormControl>
          </Grid>
          <Grid item xs={6}>
            <FormControl>
              <FormLabel id="demo-row-radio-buttons-group-label">
                Do you have any Allergy?
              </FormLabel>
              <RadioGroup
                row
                aria-labelledby="demo-row-radio-buttons-group-label"
                name="row-radio-buttons-group"
              >
                <FormControlLabel value="yes" control={<Radio />} label="Yes" />
                <FormControlLabel value="no" control={<Radio />} label="No" />
              </RadioGroup>
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <Autocomplete
              disablePortal
              id="combo-box-demo"
              options={symp}
              value={selectedValue}
              onChange={handleAutocompleteChange}
              sx={{ width: 300 }}
              freeSolo
              renderInput={(params) => (
                <TextField {...params} label="Symptoms" />
              )}
            />
          </Grid>
          <Grid item xs={12}>
            <Button
              onClick={handleSubmit}
              fullWidth
              variant="contained"
              color="secondary"
            >
              Submit
            </Button>
          </Grid>
        </Grid>
      </DialogContent>
    </Dialog>
  );
};

export default Form;
