import React from 'react';
import { fade, makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import InputBase from '@material-ui/core/InputBase';
import Badge from '@material-ui/core/Badge';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import Grid from "@material-ui/core/Grid";
import Divider from '@material-ui/core/Divider';
import DeleteOutline from '@material-ui/icons/DeleteOutline';
import QtySpinner from './QtySpinner'
import {
  ServerURL,
  getData,
  postData,
  postDataAndImage,
} from "../FetchNodeServices";

import Paper from '@material-ui/core/Paper';
import clsx from 'clsx';
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';
import Button from "@material-ui/core/Button";
import AccountCircle from '@material-ui/icons/AccountCircle';
import Drawer from '@material-ui/core/Drawer';
import ShoppingCartSharpIcon from '@material-ui/icons/ShoppingCartSharp';

import MoreIcon from '@material-ui/icons/MoreVert';


import {useSelector,useDispatch} from "react-redux"


const useStyles = makeStyles((theme) => ({
  grow: {
    flexGrow: 1,

  },
  list: {
    width: 350,
    padding:3,
  },
  fullList: {
    width: 'auto',
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'block',
    },
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(3),
      width: 'auto',
    },
    
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: 'inherit',
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
  sectionDesktop: {
    display: 'none',
    [theme.breakpoints.up('md')]: {
      display: 'flex',
    },
  },
  sectionMobile: {
    display: 'flex',
    [theme.breakpoints.up('md')]: {
      display: 'none',
    },
  },
}));

export default function PrimarySearchAppBar(props) {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);
  const [refresh,setRefresh]=React.useState(false)

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);
  var cart=useSelector((state)=>state.cart)
  var dispatch=useDispatch()  
  var keys=Object.keys(cart)
  var values=Object.values(cart)
  var totalsaving = values.reduce(calculatesaving, 0);
  var totalrate = values.reduce(calculaterate, 0);
  var total=totalrate-totalsaving
  function calculate(a, b) {
    var price =
      b.offerrate == 0 ? b.productrate * b.qtydemand : b.offerrate * b.qtydemand;
    return a + price;
  }

  function calculatesaving(a, b) {
    var price =b.qtydemand*(b.productrate-b.offerrate)
    return a + price;
  }
  function calculaterate(a, b) {
    var price =b.qtydemand*b.productrate
    return a + price;
  }

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleSignIn=()=>{
    props.history.push({pathname:'/signin'})
 
   }

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

/////Drawer/////

const [state, setState] = React.useState({
  top: false,
  left: false,
  bottom: false,
  right: false,
});

const toggleDrawer = (anchor, open) => (event) => {
  if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
    return;
  }

  setState({ ...state, [anchor]: open });
};

const handleQtyChange=(value,item)=>{
  if(value==0)
  {
   dispatch({type:'REMOVE_ITEM',payload:[item.productid]})
   setRefresh(!refresh)
 
 
  }
  else{
  item['qtydemand']=value
  dispatch({type:'ADD_ITEM',payload:[item.productid,item]})
  setRefresh(!refresh)
  }}

const list = (anchor) => (
  <div
    className={clsx(classes.list, {
      [classes.fullList]: anchor === 'top' || anchor === 'bottom',
    })}
    role="presentation"
    onKeyDown={toggleDrawer(anchor, false)}
  >
    <Paper style={{textAlign:'center',padding:10,fontSize:16,fontWeight:600,letterSpacing:2,marginBottom:5}}>
     Shopping Bag({keys.length})
    </Paper>
    <div style={{padding:5,marginBottom:5}}>
      <Grid container spacing={1}>
       {showCartItems()}

      </Grid>
      <Paper style={{background:'#f5f6fa',textAlign:'center',padding:10,fontSize:16,fontWeight:600,letterSpacing:2,marginBottom:5}}>
     Payment Details({keys.length})
    </Paper>

    </div>
    <div style={{padding:5}}>
      <Grid container spacing={1}>
        <Grid item xs={6} style={{display:'flex',padding:2}}>
         Total Amount:
        </Grid>
        <Grid item xs={6} style={{padding:2,textAlign:'right'}}>
        &#8377; {totalrate}
        </Grid>
        <Grid item xs={6} style={{display:'flex',padding:2}} >
         Total Saving:
        </Grid>
        <Grid item xs={6} style={{padding:2,textAlign:'right'}}>
        &#8377; {totalsaving}
        </Grid>
        <Grid item xs={6} style={{display:'flex',padding:2}}>
         Delivery Charges:
        </Grid>
        <Grid item xs={6} style={{padding:2,textAlign:'right'}}>
        &#8377; {0}
        </Grid>
        <Grid item xs={12}>
         <Divider style={{height:2}} />
        </Grid>

        <Grid item xs={6} style={{display:'flex',padding:2}}>
         Net Amount:
        </Grid>
        <Grid item xs={6} style={{padding:2,textAlign:'right'}}>
        &#8377; {total}
        </Grid>
     
        <Grid item xs={12} style={{padding:2,marginTop:8}}>
        <Button variant="contained" color="secondary" fullWidth onClick={()=>handleSignIn()} >Proceed</Button>
        </Grid>
     

      </Grid>
      
      </div> 
    </div>
    );


    const showCartItems=()=>{
  return values.map((items)=>{
   return(
   <>
   <Grid item xs={12} sm={3} style={{alignItems:'center',display:'flex'}} >
     <img src={`${ServerURL}/images/${items.productimage}`} width="60" />
   </Grid>
   <Grid item xs={12} sm={6} style={{justifyContent:'center',display:'flex',flexDirection:'column'}} >
     <div>
     {items.productname}
     </div>
     <div>
       <span>{items.qtydemand} X <b>&#8377;{items.offerrate}</b> MRP <s>&#8377;{items.productrate}</s></span>
     </div>
     <div>
     <QtySpinner value={items.qtydemand} onChange={(value)=>handleQtyChange(value,items)} /> 
     </div> 
     </Grid>
     <Grid item xs={12} sm={3} style={{justifyContent:'space-around'
      ,alignItems:'flex-end', display:'flex',flexDirection:'column'}} >
       <DeleteOutline  />
       <div>
       {items.offerrate>0?(<div><span> &#8377;</span>{items.qtydemand*items.offerrate}</div>):(<div><span>&#8377;</span>{items.qtydemand*items.productrate}</div>)}
       </div>

       </Grid>

       <Grid item xs={12}>
         <Divider />
        </Grid>
   </>
 )})

}
    


////Appbar///
  const menuId = 'primary-search-account-menu';
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      id={menuId}
      keepMounted
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
      <MenuItem onClick={handleMenuClose}>My account</MenuItem>
    </Menu>
  );


  return (
    <div className={classes.grow}>
      <AppBar  color="inherit"  position="fixed">
        <Toolbar>
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="open drawer"
          >
            <MenuIcon />
          </IconButton>
          <Typography className={classes.title} variant="h6" noWrap  onClick={() => props.history.push({ pathname: "/home" })}>
          Mobile Store
          </Typography>
          <div className={classes.search}>
            <div className={classes.searchIcon} color="secondary">
              
              <SearchIcon />
            </div>
            <div style={{
            border: ".5px solid #b2bec3",
            
          }}>
            <InputBase
              placeholder="Find Product Here.."
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput,
              }}
              inputProps={{ 'aria-label': 'search' }}
            />
            </div>

          </div>
          <div className={classes.grow} />
          <div className={classes.sectionDesktop}>
          <IconButton onClick={toggleDrawer("right", true)} aria-label="show 17 new notifications" color="inherit">
            <Badge badgeContent={keys.length} color="secondary">
              <ShoppingCartSharpIcon style={{ fontSize: 27 }} />
            </Badge>
          </IconButton>
              
          <IconButton
            edge="end"
            aria-label="account of current user"
            aria-controls={menuId}
            aria-haspopup="true"
            onClick={handleProfileMenuOpen}
            color="inherit"
          >
            <AccountCircle style={{ fontSize: 27 }} />
          </IconButton>
          </div>
          <div className={classes.sectionMobile}>
            <IconButton
              aria-label="show more"
              //aria-controls={mobileMenuId}
              aria-haspopup="true"
              onClick={handleMobileMenuOpen}
              color="inherit"
            >
              <MoreIcon />
            </IconButton>
          </div>
        </Toolbar>
        {renderMenu}

        <div>
     
     <React.Fragment key={"right"}>
       
       <Drawer anchor={"right"} open={state["right"]} onClose={toggleDrawer("right", false)}>
         {list("right")}
       </Drawer>
     </React.Fragment>
   
 </div>

      </AppBar>
      
    </div>
  );
}
