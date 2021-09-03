import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import MaterialTable from "material-table";
import Dialog from "@material-ui/core/Dialog";
import ListItemText from "@material-ui/core/ListItemText";
import ListItem from "@material-ui/core/ListItem";
import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import CloseIcon from "@material-ui/icons/Close";
import Slide from "@material-ui/core/Slide";
import {
  ServerURL,
  getData,
  postData,
  postDataAndImage,
} from "../FetchNodeServices";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import Button from "@material-ui/core/Button";
import Snackbar from "@material-ui/core/Snackbar";
import { isEmpty, isName, isMobile, isEmail, isNumeric } from "./Checks";
import renderHTML from "react-render-html";

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
  },
  input: {
    display: "none",
  },
  appBar: {
    position: "relative",
  },
  title: {
    marginLeft: theme.spacing(2),
    flex: 1,
    fontWeight: "bold",
  },
}));

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function Listmobiles(props) {
  const classes = useStyles();
  const [getImage, setImage] = useState({ url: "noimg.png", bytes: "" });
  const [getProductid, setProductid] = useState([]);
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

  const [open, setOpen] = React.useState(false);
  const [getlist, setlist] = useState([]);

  //------------------Snackbar------------------------//
  const [erroropen, setErrorOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  //-----------------------------------//
  const handleErrorClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setErrorOpen(false);
  };

  //----------------------Handle Open And Close---------------------//
  const handleClickOpen = (rowData) => {
    setProductid(rowData.productid);
    setProductName(rowData.productname);
    setProductRate(rowData.productrate);
    setDescription1(rowData.description1);
    setDescription2(rowData.description2);
    setDescription3(rowData.description3);
    setOfferRate(rowData.offerrate);
    setOfferType(rowData.offertype);
    setDeliveryAmt(rowData.deliveryamt);
    setColor(rowData.color);
    setStock(rowData.stock);
    setStatus(rowData.status);


    setImage({ url: `${ServerURL}/images/${rowData.productimage}`, bytes: "" });
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  

 

  //---------------CONSTRUCTOR--------------------//
  useEffect(function () {
    fetchData();
  }, []);

  //------------Image------------------//
  const handleImage = (event) => {
    setImage({
      url: URL.createObjectURL(event.target.files[0]),
      bytes: event.target.files[0],
    });
  }

   

  //----------------Submit Form--------------------------//

  const handleSubmit = async () => {
    // setMessages("")
    // var count =0;
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
      setErrorOpen(true);
      setOpen(true);
    }

    if (!error) {
      var formdata = new FormData();
      formdata.append("productid", getProductid);
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
      var result = await postDataAndImage(
        "mobile/editmobiles",
        formdata,
        config
      );

      handleClose();
      await fetchData();
    }
  };

  //-------------------Delete--------------------------------//
  const handleDelete = async () => {
    var formdata = new FormData();
    formdata.append("productid", getProductid);
    const config = { header: { "content-type": "multipart/form-data" } };
    var result = await postDataAndImage("mobile/delete", formdata, config);

    handleClose();
    await fetchData();
  };

  //------------------------------------------------------------//

  const fetchData = async () => {
    var list = await getData("mobile/listmobiles");
    setlist(list.data);
  };

  //------------------------------------------------------------//

  const EditDelete = () => {
    return (
      <div>
        <Dialog
          fullScreen
          open={open}
          onClose={handleClose}
          TransitionComponent={Transition}
        >
          <AppBar className={classes.appBar}>
            <Toolbar>
              <IconButton
                edge="start"
                color="inherit"
                onClick={handleClose}
                aria-label="close"
              >
                <CloseIcon />
              </IconButton>
              <Typography variant="h6" className={classes.title}>
                Products Details
              </Typography>
              <Button autoFocus color="inherit" onClick={() => handleSubmit()}>
                Edit
              </Button>
              <Button autoFocus color="inherit" onClick={() => handleDelete()}>
                Delete
              </Button>
            </Toolbar>
          </AppBar>

          <div className={classes.root}>
            <div className={classes.subdiv}>
              <FormControl variant="outlined" className={classes.formControl}>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6}>
                  <TextField
                      fullWidth
                      label="Product Name"
                      variant="outlined"
                      value={getProductName}
                      onChange={(event) => setProductName(event.target.value)}
                    />
                  </Grid>

                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="Product Rate"
                      variant="outlined"
                      value={getProductRate}
                      onChange={(event) => setProductRate(event.target.value)}
                    />
                  </Grid>

                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="Description 1"
                      variant="outlined"
                      value={getDescription1}
                      onChange={(event) => setDescription1(event.target.value)}
                    />
                  </Grid>

                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="Description 2"
                      variant="outlined"
                      value={getDescription2}
                      onChange={(event) => setDescription2(event.target.value)}
                    />
                  </Grid>

                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="Description 3"
                      variant="outlined"
                      value={getDescription3}
                      onChange={(event) => setDescription3(event.target.value)}
                    />
                  </Grid>

                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="Offer Rate"
                      variant="outlined"
                      value={getOfferRate}
                      onChange={(event) => setOfferRate(event.target.value)}
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
                        onChange={(event) => setOfferType(event.target.value)}
                        label="Offer Type"
                        value={getOfferType}
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
                      value={getDeliveryAmt}
                      onChange={(event) => setDeliveryAmt(event.target.value)}
                    />
                  </Grid>

                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="Color"
                      variant="outlined"
                      value={getColor}
                      onChange={(event) => setColor(event.target.value)}
                    />
                  </Grid>

                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="Stock"
                      variant="outlined"
                      value={getStock}
                      onChange={(event) => setStock(event.target.value)}
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
                        value={getStatus}
                        onChange={(event) => setStatus(event.target.value)}
                      >
                        <MenuItem value={"Available"}>Available</MenuItem>
                        <MenuItem value={"Comming Soon"}>Comming Soon</MenuItem>
                        <MenuItem value={"Pre-booking"}>Pre-booking</MenuItem>
                        <MenuItem value={"Discontinue"}>Discontinue</MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>

                  

                  <Grid item xs={12} sm={6}>
            <div style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}>
              <img src={`${getImage.url}`} width='100' height='100' /> 
            </div>
            <input
              accept="image/*"
              className={classes.input}
              id="contained-button-file-icon"
              multiple
              onChange={(event) =>
                
                  handleImage(event)
                }
              type="file"
            />
             </Grid>
            <Grid item xs={12} sm={6}    >
            <label htmlFor="contained-button-file-icon">
              <Button variant="contained" color="primary" component="span"  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItem: "center",
                    width: 200,
                    marginTop: 40,
                  }}>
                Product Image
              </Button>
            </label>
          </Grid>
          </Grid>
              </FormControl>
            </div>
            <Snackbar
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              open={erroropen}
              autoHideDuration={10000}
              onClose={handleErrorClose}
              message={renderHTML(errorMessage)}
              action={
                <React.Fragment>
                  <Button
                    color="secondary"
                    size="small"
                    onClick={handleErrorClose}
                  >
                    UNDO
                  </Button>
                  <IconButton
                    size="small"
                    aria-label="close"
                    color="inherit"
                    onClick={handleErrorClose}
                  >
                    <CloseIcon fontSize="small" />
                  </IconButton>
                </React.Fragment>
              }
            />
          </div>
        </Dialog>
      </div>
    );
  };

  //-----------------------------------------------//
  function DisplayProductsList() {
    return (
      <div>
        <MaterialTable
          title="Productse List"
          columns={[
            {
              title: "Product Id",
              field: "productid",
            },
            { title: "Product Name", field: "productname" },
            { title: "Product Rate", field: "productrate" },
            { title: "Description 1", field: "description1" },
            { title: "Description 2", field: "description2" },
            { title: "Description 3", field: "description3" },

            {
              title: "Offer Rate & Type",
              field: "offerrate",
              render: (rowData) => (
                <div>
                  {rowData.offerrate}
                  <br />
                  {rowData.offertype}
                </div>
              ),
            },

            { title: "Delivery Amt", field: "deliveryamt" },
            { title: "Color", field: "color" },
            {
              title: "Stock & Status",
              field: "stock",
              render: (rowData) => (
                <div>
                  {rowData.stock}
                  <br />
                  {rowData.status}
                </div>
              ),
            },
            {
              title: "product ads",
              field: "picture",
              render: (rowData) => (
                <img
                  src={`${ServerURL}/images/${rowData.productimage}`}
                  style={{ width: 50 }}
                />
              ),
            },
           
          ]}
          data={getlist}
          actions={[
            (rowData) => ({
              icon: "edit",
              tooltip: "Edit",
              onClick: (event, rowData) => handleClickOpen(rowData),
            }),
          ]}
          options={{
            actionsColumnIndex: -1,
          }}
        />
      </div>
    );
  }
  return (
    <div>
      {DisplayProductsList()}
      {EditDelete()}
    </div>
  );
}
