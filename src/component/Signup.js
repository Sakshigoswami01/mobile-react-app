import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core";
import Header from "./Header";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import InputAdornment from "@material-ui/core/InputAdornment";
import OutlinedInput from "@material-ui/core/OutlinedInput";
import Button from "@material-ui/core/Button";
import Footer from "./Footer";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import WhatsAppIcon from "@material-ui/icons/WhatsApp";
import IconButton from "@material-ui/core/IconButton";
import { useSelector, useDispatch } from "react-redux";
import InputLabel from "@material-ui/core/InputLabel";

import FormControl from "@material-ui/core/FormControl";

import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";

import { postData } from "../FetchNodeServices";
var otpGenerator = require('otp-generator')

const useStyles = makeStyles((theme) => ({
  grow: {
    flexGrow: 1,
  },
  root: {
    width: "100%",
    maxWidth: "36ch",
    backgroundColor: theme.palette.background.paper,
  },
  inline: {
    display: "inline",
  },
  sectionDesktop: {
    display: "none",
    [theme.breakpoints.up("sm")]: {
      display: "flex",
    },
  },
  sectionMobile: {
    display: "flex",

    [theme.breakpoints.up("sm")]: {
      display: "none",
    },
  },
  root: {
    "& > *": {
      margin: theme.spacing(1),
      width: "25ch",
    },
  },
  margin: {
    margin: theme.spacing(1),
  },
}));

export default function Signup(props) {
  var mobileno = props.history.location.state.mobileno;
  const classes = useStyles();
  const [firstname, setFirstname] = useState();
  const [lastname, setLastname] = useState();
  const [emailid, setEmailid] = useState();
  const [otp,setOtp]=useState()
  const [gotp,setGOtp]=useState()
  var dispatch = useDispatch();

  const [values, setValues] = React.useState({
    password: "",
    confirmPassword: "",
    showPassword: false,
    showCPassword: false,
  });

  const Generator=()=>{
    var temp=otpGenerator.generate(4, { upperCase: false, specialChars: false,alphabets:false,digits:true });
    alert(temp)
    setGOtp(temp)
  }

  useEffect(function(){
  Generator()
  },[])

  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  const handleClickShowPassword = () => {
    setValues({ ...values, showPassword: !values.showPassword });
  };
  const handleClickShowCPassword = () => {
    setValues({ ...values, showCPassword: !values.showCPassword });
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
  const handleSubmit = async () => {
    if(otp==gotp)
    {
    if (values.password == values.confirmPassword) {
      var body = {
        mobileno: mobileno,
        emailid: emailid,
        firstname: firstname,
        lastname: lastname,
        password: values.password,
      };
     
      var result = await postData("userdetails/insertuserdetails", body);
     if(result.result)
     {
      alert("Registration Successfull...");
      
        var body = { mobileno: mobileno };
        var record = await postData("userdetails/chkuserbymobileno", body);
        if (record.result) {
        
  
         dispatch({ type: "ADD_CUSTOMER", payload: [record.data.mobileno, record.data] });
         props.history.push({ pathname: "/showcart" });

        }
    }
    
     else{
       alert("Registration Unsuccessfull")
     }
    }
     else {
      alert("Confirm Password not Matched...");
    }
  }
  else
  {
    alert('Pls Check Otp....')
  }
  };

  return (
    <div>
      <Header history={props.history} />

      <div>
        <container
          style={{
            border: "0.5px solid #dfe6e9",
            borderRadius: 50,
            display: "flex",
            marginTop: 30,
            marginLeft: 90,
            marginRight: 90,
            alignItems: "center",
            flexDirection: "column",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              marginTop: 10,
              width: "100%",
            }}
          >
            <Grid container spacing={1} style={{marginTop:100}}>
              <Grid item xs="12" sm={6}>
                <div style={{ marginTop: 1, marginLeft: 10, paddingLeft: 40 }}>
                  <img src="https://ak.picdn.net/shutterstock/videos/1061810044/thumb/12.jpg?ip=x480" width="550" height="450" />
                </div>
              </Grid>
              <Grid item xs="12" sm={6}>
                <div>
                  <h2>Sign up</h2>
                  <p>Please enter your details. </p>
                  <Grid item xs={12} style={{ padding: 10 }}>
                    <TextField
                      id="outlined-basic"
                      fullWidth
                      label="Your First Name"
                      variant="outlined"
                      onChange={(event) => setFirstname(event.target.value)}
                    />
                  </Grid>

                  <Grid item xs={12} style={{ padding: 10 }}>
                    <TextField
                      id="outlined-basic"
                      fullWidth
                      label="Your Last Name"
                      variant="outlined"
                      onChange={(event) => setLastname(event.target.value)}
                    />
                  </Grid>

                  <Grid item xs={12} style={{ padding: 10 }}>
                    <TextField
                      id="outlined-basic"
                      fullWidth
                      label="Enter Your Email id"
                      variant="outlined"
                      onChange={(event) => setEmailid(event.target.value)}
                    />
                  </Grid>

                  <Grid item xs={12} style={{ padding: 10 }}>
                    <FormControl fullWidth variant="outlined">
                      <InputLabel htmlFor="outlined-adornment-password">
                        Password
                      </InputLabel>
                      <OutlinedInput
                        id="outlined-adornment-password"
                        type={values.showPassword ? "text" : "password"}
                        value={values.password}
                        fullWidth={true}
                        onChange={handleChange("password")}
                        endAdornment={
                          <InputAdornment position="end">
                            <IconButton
                              aria-label="toggle password visibility"
                              onClick={handleClickShowPassword}
                              onMouseDown={handleMouseDownPassword}
                              edge="end"
                            >
                              {values.showPassword ? (
                                <Visibility />
                              ) : (
                                <VisibilityOff />
                              )}
                            </IconButton>
                          </InputAdornment>
                        }
                        labelWidth={70}
                      />
                    </FormControl>
                  </Grid>

                  <Grid item xs={12} style={{ padding: 10 }}>
                    <FormControl fullWidth variant="outlined">
                      <InputLabel htmlFor="outlined-adornment-confirmPassword">
                        Confirm Password
                      </InputLabel>
                      <OutlinedInput
                        id="outlined-adornment-confirmPassword"
                        type={values.showCPassword ? "text" : "password"}
                        value={values.confirmPassword}
                        fullWidth={true}
                        onChange={handleChange("confirmPassword")}
                        endAdornment={
                          <InputAdornment position="end">
                            <IconButton
                              aria-label="toggle password visibility"
                              onClick={handleClickShowCPassword}
                              onMouseDown={handleMouseDownPassword}
                              edge="end"
                            >
                              {values.showCPassword ? (
                                <Visibility />
                              ) : (
                                <VisibilityOff />
                              )}
                            </IconButton>
                          </InputAdornment>
                        }
                        labelWidth={130}
                      />
                    </FormControl>
                  </Grid>

                  <Grid
                    style={{
                      border: "0.5px solid #dfe6e9",
                      borderRadius: 30,
                      padding: 10,
                      display: "flex",
                      flexDirection: "row",
                      fontSize: 16,
                    }}
                  >
                    <div>
                      <FormControlLabel
                        control={<Checkbox name="checkedC" />}
                      />
                      Enable order updates and important information on{" "}
                      <WhatsAppIcon style={{ color: "#009432" }} /> Whatsapp
                    </div>
                  </Grid>

                  <Grid item xs={12} style={{ padding: 10 }}>
                    <h2>Verify</h2>
                    <p>
                      We have sent 6 digit otp on <b>+91-{mobileno}</b>
                    </p>
                    <TextField
                      id="outlined-basic"
                      label="Enter Your OTP"
                      variant="outlined"
                      onChange={(event) => setOtp(event.target.value)}
                      fullWidth
                    />
                  </Grid>

                  <div>
                      <center>
                    <Button
                      onClick={() => handleSubmit()}
                      variant="contained"
                      color="primary"
                      fullwidth
                    >
                      Verify
                    </Button>
                    </center>
                  </div>
                </div>
              </Grid>
            </Grid>
          </div>
        </container>
      </div>
      <Footer />
    </div>
  );
}
