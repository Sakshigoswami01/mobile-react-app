import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import MaterialTable from "material-table";
import Dialog from "@material-ui/core/Dialog";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import MenuItem from "@material-ui/core/MenuItem";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import renderHTML from "react-render-html";
import Button from "@material-ui/core/Button";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import CloseIcon from "@material-ui/icons/Close";
import Slide from "@material-ui/core/Slide";
import Snackbar from "@material-ui/core/Snackbar";
import { isEmpty, isMobile, isName, isEmail } from "./Checks";
import {
  ServerURL,
  getData,
  postData,
  postDataAndImage,
} from "../FetchNodeServices";

const useStyles = makeStyles((theme) => ({
  appBar: {
    position: "relative",
  },
  title: {
    marginLeft: theme.spacing(2),
    flex: 1,
  },
  root: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  subdiv: {
    width: window.screen.width * 0.6,
    padding: 10,
    marginTop: window.screen.height * 0.1,
    background: "#f5f6fa",
  },
  input: {
    display: "none",
  },
}));

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function ListFranchise(props) {
  const classes = useStyles();
  const[getList,setList]=useState([]);
  const [getbannerimage, setbannerimage] = useState({url:'noimage.url',bytes:""});
  const [getbannerid, setbannerid] = useState("");
  const [getbannertype, setbannertype] = useState("");
  const [getstatus, setstatus] = useState("");
 
    
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = (rowData) => {
      setbannerid(rowData.bannerid)
      setbannerimage({url:`${ServerURL}/images/${rowData.bannerimage}`,bytes:''})
      setbannertype(rowData.bannertype)
      setstatus(rowData.bannerstatus)
   setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const handleImage = (event) => {
    setbannerimage({
      url: URL.createObjectURL(event.target.files[0]),
      bytes: event.target.files[0],
    });
  };

  const handleSubmit = async() => {
    var formdata = new FormData();
    formdata.append("bannerid", getbannerid);
    formdata.append("bannertype", getbannertype);
    formdata.append("status", getstatus);
    formdata.append("bannerimage", getbannerimage.bytes);
    const config = { header: { "content-type": "multipart/form-data" } };
    var result =await postDataAndImage("banner/editrecord", formdata, config);
    handleClose()

   };

const handleDelete=async()=>{

  var result=postData('banner/deletebanner',{bannerid:getbannerid})
  if(result.status){
    setOpen(false)
      fetchData()
  }
}


  useEffect(function () {
    fetchData();
  }, []);

  const fetchData=async()=>{
    var list=await getData('banner/listbanner')
    setList(list.data)
    //setOpen(false)
   }

  

  const editDeleteDialog = (rowData) => {
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
            <IconButton edge="start" color="inherit" aria-label="close">
              <CloseIcon onClick={() => handleClose()} />
            </IconButton>
            <Typography variant="h6" className={classes.title}>
             Banner Details
            </Typography>
            <Button autoFocus color="inherit"  onClick={()=>handleSubmit()}>
              Edit
            </Button>
            <Button autoFocus color="inherit" onClick={()=>handleDelete()}>
              Delete
            </Button>
          </Toolbar>
        </AppBar>
        <div className={classes.root}>
          <div className={classes.subdiv}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  id="bannerid"
                  fullWidth
                  label="Banner Id"
                  variant="outlined"
                  value={getbannerid}
                 
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  
                  fullWidth
                  label="Banner Name"
                  variant="outlined"
                  value={getbannertype}
               
                  onChange={(event) => setbannertype(event.target.value)}
                />
              </Grid>

              <Grid item xs={12} sm={6}>
              <FormControl variant="outlined" fullWidth>
                <InputLabel id="demo-simple-select-outlined-label">
                  Status
                </InputLabel>
                <Select
                 
                  label="Status"
                  value={getstatus}
                  onChange={(event) => setstatus(event.target.value)}
                >
                  <MenuItem value=""></MenuItem>
                  <MenuItem value={"Visible"}>Visible</MenuItem>
                  <MenuItem value={"Not-Visible"}>Not-Visible</MenuItem>
                </Select>
              </FormControl>
              </Grid>  
              <Grid items xs={12} sm={6}>
                <input
                  accept="image/*"
                  className={classes.input}
                  id="contained-button-file"
                  multiple
                  type="file"
                 onChange={(event) => handleImage(event)}
                />
                <label
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                  htmlFor="contained-button-file"
                >
                  <Button
                    variant="contained"
                    color="primary"
                    component="span"
                  >
                    Upload Banner
                  </Button>
                </label>
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
                <img alt="" src={`${getbannerimage.url}`} width="50" height="50" />
              </Grid>
            </Grid>
          </div>
        </div>
      </Dialog>
    </div>
      );

  };

  

  function MultipleActions() {
    return (
      <MaterialTable
        title="Banners List"
        columns={[
            { title: 'Banner Type',field: 'bannertype' },
            { title: 'Status', field: 'bannerstatus' },
            { title: 'Banner Image', field: 'bannerimage',
             render: rowData => <img src={`${ServerURL}/images/${rowData.bannerimage}`} style={{width: 50, borderRadius: '40%'}}/>
           }
        ]}
        data={
getList
        }        
        actions={[
          {
            icon: 'save',
            tooltip: 'save user',
            onClick: (event, rowData) => alert("Hello")
          },
          {
            icon: 'delete',
            tooltip: 'Delete User',
            onClick: (event, rowData) => handleClickOpen(rowData)
          }
        ]}
      />
    )
  }
  return (
    <div>
      {MultipleActions()}
      {editDeleteDialog()}
    </div>
  );
}
