import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import MaterialTable from 'material-table';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import CloseIcon from '@material-ui/icons/Close';
import Slide from '@material-ui/core/Slide';
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import {ServerURL,getData,postData, postDataAndImage } from "../FetchNodeServices";
import {isEmpty,isEmail,isName,isMobile,isNumeric} from "./Checks";
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import renderHTML from 'react-render-html';


const useStyles = makeStyles((theme) => ({
    appBar: {
      position: 'relative',
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
        marginTop: window.screen.height * 0.05,
        background: "#f5f6fa",
      },
      input: {
        display: "none",
      },
  }));

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});
  

export default function ListCategory(props){

    const [getList, setList] = useState([])
    const classes = useStyles();
    const [getImage , setImage] = useState({url: "noimage.png",bytes : ""});
    const [getCategoryName , setCategoryName] =useState('');
    const [open, setOpen] = React.useState(false);
    const [getCategoryId, setCategoryId] = useState( "");
    const [errorMessage, setErrorMessage]=useState( " ");
    const [openErr, setOpenErr] = React.useState(false);



    const handleImage = (event) => {
      setImage({
        url: URL.createObjectURL(event.target.files[0]),
        bytes: event.target.files[0]
      });
    };
    
    
    const handleClose = (event, reason) => {
      if (reason === 'clickaway') {
        return;
      }
  setOpenErr(false)
      setOpen(false);
    };
    const fetchData=async()=>{
        // console.log(list);
        var list=await getData('category/listcategory');
        setList(list.data);
    };
   

    const handleClickOpen = (rowData) => {
        setCategoryId(rowData.categoryid)
        setCategoryName(rowData.categoryname)
        setImage({url: `${ServerURL}/images/${rowData.icon}`, bytes: "" });
        setOpen(true);
    };

    const handleEdit = async() => {
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
      
      setOpenErr(true)
    }
      if(!error)
      {
        var formdata = new FormData();
        formdata.append('categoryid',getCategoryId)  
        formdata.append("categoryname", getCategoryName);
        formdata.append("icon", getImage.bytes);
        const config = { headers: { "content-type": "multipart/form-data" } };
        var result =await postDataAndImage("category/editrecord", formdata, config);
      handleClose();
       fetchData();
      }
    };


useEffect(function(){
    fetchData();

},[]);

const editDeleteDialog = () =>{
    return (
        <div>
         
          <Dialog fullScreen open={open} onClose={handleClose} TransitionComponent={Transition}>
            <AppBar className={classes.appBar}>
              <Toolbar>
                <IconButton edge="start" color="inherit" onClick={handleClose} aria-label="close">
                  <CloseIcon />
                </IconButton>
                <Typography variant="h6" className={classes.title}>
                  Product Category
                </Typography>
                <Button autoFocus color="inherit" onClick={()=>handleEdit()}>
                  Edit
                </Button>
                <Button autoFocus color="inherit" onClick={handleClose}>
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
                  label="Category Id"
                  variant="outlined"
                  value={getCategoryId}
                 
                />
              </Grid>
                  {/* Category Name */}
                  <Grid item xs={12}>
                      <TextField
                        id="Category-name"
                        fullWidth
                        value={getCategoryName}
                        label="Category Name"
                        variant="outlined"
                        onChange={(event)=>setCategoryName(event.target.value)}
                      />
                    </Grid>

                     {/* Icon */}
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
          </Dialog>
        </div>
      );
}


    function MultipleActions() { 
        return (
        <MaterialTable
            title="Category List  "
            columns={[
              { title: 'Category Id', field: 'categoryid' },
            { title: 'Category Name', field: 'categoryname' },
            { title: 'Icon ', field: 'icon' ,
            render: rowData => <img src={`${ServerURL}/images/${rowData.icon}`} style={{width: 50, borderRadius: '50%'}}/>
            },       
        ]}
            data={getList }        
            actions={[
            {
                icon: 'save',
                tooltip: 'Save User',
                onClick: (event, rowData) => alert("You saved " + rowData.name)
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

    return(<div>
        {MultipleActions()}
        {editDeleteDialog()}

    </div>)

}