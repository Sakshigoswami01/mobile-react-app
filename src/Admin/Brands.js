import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import swal from 'sweetalert';
import Button from "@material-ui/core/Button";
import { getData, postData, postDataAndImage } from "../FetchNodeServices";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: "#fff",
    height: window.screen.height * 0.6,
  },

  subdiv: {
    width: window.screen.width * 0.6,
    padding: 10,
    marginTop: window.screen.height * 0.05,
  },
  input: {
    display: "none",
  },
}));

export default function Brands(props) {
  const classes = useStyles();
  const [getbrandsimage, setbrandsimage] = useState({url:'noimg.png',bytes:""});
  const [getbrandsid, setbrandsid] = useState("");
  const [getbrandname, setbrandsname] = useState("");
  const [getstatus, setstatus] = useState("");



  const handleImage = (event) => {
    setbrandsimage({
      url: URL.createObjectURL(event.target.files[0]),
      bytes: event.target.files[0],
    });
  };

 

  const handleSubmit = () => {
    var formdata = new FormData();
    formdata.append("brandid", getbrandsid);
    formdata.append("brandname", getbrandname);
    formdata.append("brandstatus", getstatus);
    formdata.append("brandimage", getbrandsimage.bytes);
    const config = { header: { "content-type": "multipart/form-data" } };
    var result = postDataAndImage("brands/addbrand", formdata, config);
    if(result)
    {swal("Record Submitted..", "success");}
    else
    { swal("Fail to Submit Record..", "error");}
  
  };
 

  return (
    <div className={classes.root}>
      <div className={classes.subdiv}>
        <FormControl variant="outlined" className={classes.formControl}>
          <Grid container spacing={2}>
            

            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Brand Name"
                variant="outlined"
                onChange={(event) => setbrandsname(event.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
            <FormControl variant="outlined" className={classes.formControl}
                  fullWidth>
            <InputLabel id="demo-simple-select-outlined-label">
              Status
              </InputLabel>
              <Select
                labelId="demo-simple-select-outlined-label"
                id="demo-simple-select-outlined"
                //value={age}
                label="Status"
                onChange={(event) => setstatus(event.target.value)}
              >
              <MenuItem value={'Visible'}>Visible</MenuItem>
                <MenuItem value={'NotVisible'}>Not Visible</MenuItem>
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
                <img src={`${getbrandsimage.url}`} width="100" height="100"></img>
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
                className={classes.reset}
              >
                Reset
              </Button>
            </Grid>
          </Grid>
        </FormControl>
      </div>
    </div>
  );
}
