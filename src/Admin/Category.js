import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import Button from "@material-ui/core/Button";
import { getData,postData,postDataAndImage} from "../FetchNodeServices";
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import {isEmpty,isEmail,isName,isMobile,isNumeric} from "./Checks"
import renderHTML from 'react-render-html';
import swal from "sweetalert";



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
    background: "#f5f6fa",
  },
  input: {
    display: "none",
  },
}));



export default function Category(props) {

  const classes = useStyles();
  const [getImage , setImage] = useState({url: "noimg.png",bytes : " "});
  const [getCategoryName , setCategoryName] =useState('');
  const [open, setOpen] = React.useState(false);
  const [errorMessage, setErrorMessage]=useState( " ");
  const [openErr,setOpenErr]=useState("");

  const handleImage = (event) => {
    setImage({
      url: URL.createObjectURL(event.target.files[0]),
      bytes: event.target.files[0],
    });
  };
 
  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };
  const handleSubmit = async (event) => {

    //formData for pictures

      var error=false
      var msg= ""

      // category name
      if(isEmpty(getCategoryName))
    {
      error=true
      msg+="<b>Category Name : should not be null<b><br/>";
      
    }
    if(!isName(getCategoryName))
    {
      error=true
     msg+="<b>Category Name : Allow only Alphabets<b><br/>";
     
    }
    
    if(msg.length!=0){
      setErrorMessage(msg)
      
      setOpen(true)
    }
      if(!error)
      {
        var formdata = new FormData();
        formdata.append("categoryname", getCategoryName);
        formdata.append("icon", getImage.bytes);
        const config = { headers: { "content-type": "multipart/form-data" } };
        var result = postDataAndImage("category/addnewrecord", formdata, config);
      }
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
    };


  return(

    <div className={classes.root}>
     <div className={classes.subdiv}>
        <Grid container spacing={2}>
        <Grid item xs={12}>
          <h3><u><b><center>Category </center></b></u></h3>
        </Grid>
        <Grid item xs={12}>
            <TextField
              id="Category-name"
              fullWidth
              label="Category Name"
              variant="outlined"
              onChange={(event)=>setCategoryName(event.target.value)}
            />
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
            <Grid item xs={12} sm={6}   style={{
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  }} >
            <label htmlFor="contained-button-file-icon">
              <Button variant="contained" color="primary" component="span">
                Upload Icon
              </Button>
            </label>
          </Grid>
          


          
            {/*  Submit Button */}
          <Grid
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
            item
            xs={12}
            sm={6}
          >
            <Button variant="contained" color="primary" fullWidth onClick={()=>handleSubmit()}>
              Submit
            </Button>
          </Grid>

          <Grid
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
            item
            xs={12}
            sm={6}
          >
            <Button variant="contained" color="primary" fullWidth>
              Reset
            </Button>
          </Grid>

        </Grid>
      </div>
      <Snackbar
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        
        open={openErr}
        autoHideDuration={6000}
        onClose={handleClose}
        message={renderHTML(errorMessage)}
        action={
          <React.Fragment>
            <Button color="secondary" size="small" onClick={handleClose}>
              UNDO
            </Button>
            <IconButton size="small" aria-label="close" color="inherit" onClick={handleClose}>
              <CloseIcon fontSize="small" />
            </IconButton>
          </React.Fragment>
        }
      />
    </div>

  );


}