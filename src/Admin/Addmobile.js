import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import Button from "@material-ui/core/Button";
import { getData, postData, postDataAndImage } from "../FetchNodeServices";
import Typography from "@material-ui/core/Typography";
import renderHTML from "react-render-html";
import Snackbar from "@material-ui/core/Snackbar";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import swal from "sweetalert";

import { isEmpty, isName, isMobile, isEmail, isNumeric } from "./Checks";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },

  subdiv: {
    width: window.screen.width * 0.6,
    padding: 10,
    marginTop: window.screen.height * 0.05,
    backgroundColor: "white",
  },
  input: {
    display: "none",
  },
}));

export default function Addmobile(props) {
  const classes = useStyles();
  const [getImage, setImage] = useState({ url: "noimg.png", bytes: "" });
  const [getProductName, setProductName] = useState(""); 
  const [getProductRate, setProductRate] = useState("");
  const [getDescription1, setDescription1] = useState("");
  const [getDescription2, setDescription2] = useState("");
  const [getDescription3, setDescription3] = useState("");
  const [getOfferRate, setOfferRate] = useState("");
  const [getOfferType, setOfferType] = useState("");
  const [getDeliveryAmt, setDeliveryAmt] = useState("");
  const [getColor, setColor] = useState("");
  const [getStock, setStock] = useState("");
  const [getStatus, setStatus] = useState("");

  const [getMessages, setMessages] = useState("");

 

  useEffect(function () {
   
  }, []);

  // //------------------Snackbar------------------------//
  const [open, setOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  //------------Image------------------//
  const handleImage = (event) => {
    setImage({
      url: URL.createObjectURL(event.target.files[0]),
      bytes: event.target.files[0],
    });
  }
    
   

  //----------------Submit Form--------------------------//

  const handleSubmit = async () => {
    setMessages("");
    var count = 0;

    var error = false;
    var msg = "";
    if (isEmpty(getProductName)) {
      error = true;
      msg += "Product Name Should Not Be Empty...<br/>";
    }
    if (!isName(getProductName)) {
      error = true;
      msg += "Product Name Allow only Alphabets<br/>";
    }
    if (!isNumeric(getProductRate)) {
      error = true;
      msg += "Product Rate Allow only Numbers<br/>";
    }
    if (!isNumeric(getOfferRate)) {
      error = true;
      msg += "Offer Rate Allow only Numbers<br/>";
    }
    if (!isName(getColor)) {
      error = true;
      msg += "Color Allow only Alphabets<br/>";
    }
    if (!isName(getStatus)) {
      error = true;
      msg += "Status Allow only Alphabets<br/>";
    }
    if (isEmpty(getProductRate)) {
      error = true;
      msg += "Rate Not Be Empty...<br/>";
    }
    if (isEmpty(getColor)) {
      error = true;
      msg += "Color Not Be Empty...<br/>";
    }
    if (isEmpty(getStock)) {
      error = true;
      msg += "Stock Not Be Empty...<br/>";
    }
    if (isEmpty(getStatus)) {
      error = true;
      msg += "Status Not Be Empty...<br/>";
    }
    if (isEmpty(getImage)) {
      error = true;
      msg += "Image Not Be Empty...<br/>";
    }
    if (msg.length != 0) {
      setErrorMessage(msg);
      setOpen(true);
    }

    if (!error) {
      var formdata = new FormData();
      formdata.append("productname", getProductName);
      formdata.append("productrate", getProductRate);
      formdata.append("description1", getDescription1);
      formdata.append("description2", getDescription2);
      formdata.append("description3", getDescription3);
      formdata.append("offerrate", getOfferRate);
      formdata.append("offertype", getOfferType);
      formdata.append("deliveryamt", getDeliveryAmt);
      formdata.append("color", getColor);
      formdata.append("stock", getStock);
      formdata.append("status", getStatus);
      formdata.append("picture", getImage.bytes);

      const config = { header: { "content-type": "multipart/form-data" } };
      var result = postDataAndImage("mobile/addmobiles", formdata, config);
      if (result) {
        swal({
          title: "Good job!",
          text: "Record Submitted!",
          icon: "success",
        });
      } else {
        swal({
          title: "Oops!",
          text: "Fail to Submit!",
          icon: "error",
        });
      }
    }
  };

  //---------------------Web Page------------------//

  return (
    <div className={classes.root}>
      <div className={classes.subdiv}>
        <FormControl variant="outlined" className={classes.formControl}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
            <TextField
                fullWidth
                label="Product Name"
                variant="outlined"
                onChange={(event) => {
                  setProductName(event.target.value);
                }}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Product Rate"
                //error={getProductRateError}
                variant="outlined"
                onChange={(event) => {
                  //setProductRateError(false)
                  setProductRate(event.target.value);
                }}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Description 1"
                //error={getDescriptionError}
                variant="outlined"
                onChange={(event) => {
                  //setDescriptionError(false)
                  setDescription1(event.target.value);
                }}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Description 2"
                //error={getDescriptionError}
                variant="outlined"
                onChange={(event) => {
                  //setDescriptionError(false)
                  setDescription2(event.target.value);
                }}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Description 3"
                //error={getDescriptionError}
                variant="outlined"
                onChange={(event) => {
                  //setDescriptionError(false)
                  setDescription3(event.target.value);
                }}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Offer Rate"
                //error={getOfferRateError}
                variant="outlined"
                onChange={(event) => {
                  //setOfferRateError()
                  setOfferRate(event.target.value);
                }}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <FormControl
                variant="outlined"
                className={classes.formControl}
                fullWidth
              >
                <InputLabel id="demo-simple-select-outlined-label">
                  Offer Type
                </InputLabel>
                <Select
                  labelId="demo-simple-select-outlined-label"
                  id="demo-simple-select-outlined"
                  //value={age}
                  //error={getOfferTypeError}
                  onChange={(event) => {
                    //setOfferTypeError(false)
                    setOfferType(event.target.value);
                  }}
                  label="Offer Type"
                >
                  <MenuItem value={"Scheme"}>Scheme</MenuItem>
                  <MenuItem value={"Discount"}>Discount</MenuItem>
                  <MenuItem value={"Offer"}>Offer</MenuItem>
                  <MenuItem value={"Voucher"}>Voucher</MenuItem>
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Delivery Amount"
                variant="outlined"
                onChange={(event) => setDeliveryAmt(event.target.value)}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Color"
                //error={getColorError}
                variant="outlined"
                onChange={(event) => {
                  //setColorError(false)
                  setColor(event.target.value);
                }}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Stock"
                //error={getStatusError}
                variant="outlined"
                onChange={(event) => {
                  //setStockError(false)
                  setStock(event.target.value);
                }}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <FormControl
                variant="outlined"
                className={classes.formControl}
                fullWidth
              >
                <InputLabel id="demo-simple-select-outlined-label">
                  Status
                </InputLabel>
                <Select
                  labelId="demo-simple-select-outlined-label"
                  id="demo-simple-select-outlined"
                  //value={age}
                  label="Status"
                  //error={getStatusError}
                  onChange={(event) => {
                    //setStatusError(false)
                    setStatus(event.target.value);
                  }}
                >
                  <MenuItem value={"Available"}>Available</MenuItem>
                  <MenuItem value={"Comming Soon"}>Comming Soon</MenuItem>
                  <MenuItem value={"Pre-booking"}>Pre-booking</MenuItem>
                  <MenuItem value={"Discontinue"}>Discontinue</MenuItem>
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={12} sm={6}>
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItem: "center",
                }}
              >
                <img src={`${getImage.url}`} width="100" height="100"></img>
              </div>
              <input
                accept="image/*"
                className={classes.input}
                id="contained-button-file"
                multiple
                type="file"
                onChange={(event) => handleImage(event)}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <label htmlFor="contained-button-file">
                <Button
                  variant="contained"
                  color="primary"
                  component="span"
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItem: "center",
                    width: 200,
                    marginTop: 40,
                  }}
                >
                  Upload Image
                </Button>
              </label>
            </Grid>


            <Grid item xs={12} sm={6}>
              <Button
                variant="contained"
                color="primary"
                fullWidth
                className={classes.submit}
                onClick={() => handleSubmit()}
              >
                Submit
              </Button>
            </Grid>

            <Grid item xs={12} sm={6}>
              <Button
                variant="contained"
                color="primary"
                fullWidth
                type="reset"
                className={classes.reset}
              >
                Reset
              </Button>
            </Grid>
          </Grid>
        </FormControl>
        <br />
        <br />
        <Typography>{getMessages}</Typography>
      </div>
      <Snackbar
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
        open={open}
        autoHideDuration={6000}
        onClose={handleClose}
        message={renderHTML(errorMessage)}
        action={
          <React.Fragment>
            <Button color="secondary" size="small" onClick={handleClose}>
              UNDO
            </Button>
            <IconButton
              size="small"
              aria-label="close"
              color="inherit"
              onClick={handleClose}
            >
              <CloseIcon fontSize="small" />
            </IconButton>
          </React.Fragment>
        }
      />
    </div>
  );
}
