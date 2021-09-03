import React from 'react';
import { fade, makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Divider from '@material-ui/core/Divider';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import InputBase from '@material-ui/core/InputBase';
import Badge from '@material-ui/core/Badge';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import MenuList from '@material-ui/core/MenuList';
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';
import AccountCircle from '@material-ui/icons/AccountCircle';
import MailIcon from '@material-ui/icons/Mail';
import ShoppingCartSharpIcon from '@material-ui/icons/ShoppingCartSharp';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import NotificationsIcon from '@material-ui/icons/Notifications';
import MoreIcon from '@material-ui/icons/MoreVert';
import Button from '@material-ui/core/Button';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Grow from '@material-ui/core/Grow';
import Paper from '@material-ui/core/Paper';
import Popper from '@material-ui/core/Popper';

const useStyles = makeStyles((theme) => ({
 
  root: {
    display: 'flex',
  },
  paper: {
    marginRight: theme.spacing(2),
  },
}));

export default function SubHeader() {
    const classes = useStyles();
    const [open, setOpen] = React.useState(false);
    
    const anchorRef = React.useRef(null);
    const anchorRef2 = React.useRef(null);

  
    const handleToggle = () => {
      setOpen((prevOpen) => !prevOpen);
    };
  
    const handleClose = (event) => {
      if (anchorRef.current && anchorRef.current.contains(event.target)) {
        return;
      }
      
  
      setOpen(false);
    };
  
    function handleListKeyDown(event) {
      if (event.key === 'Tab') {
        event.preventDefault();
        setOpen(false);
      }
    }

    
  
    // return focus to the button when we transitioned from !open -> open
    const prevOpen = React.useRef(open);
    React.useEffect(() => {
      if (prevOpen.current === true && open === false) {
        anchorRef2.current.focus();
      }

     
  
      prevOpen.current = open;
    }, [open]);
  
 

 

 


  return (
    <div className={classes.grow}>
      <AppBar  color="primary" position="sticky" >
        <Toolbar>
        <div className={classes.root}>
     
      <div style={{marginLeft:200}}>
        <Button
          ref={anchorRef}
          aria-controls={open ? 'menu-list-grow' : undefined}
          aria-haspopup="true"
          onClick={handleToggle}
        >
          Mobile
        </Button>
        <Popper open={open} anchorEl={anchorRef.current} role={undefined} transition disablePortal>
          {({ TransitionProps, placement }) => (
            <Grow
              {...TransitionProps}
              style={{ transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom' }}
            >
              <Paper style={{width:400}}>
                <ClickAwayListener onClickAway={handleClose}>
                  <MenuList autoFocusItem={open} id="menu-list-grow" onKeyDown={handleListKeyDown}>
                      <tr>
                          <td>
                    <MenuItem style={{width:200}} onClick={handleClose}><img src='/samsung.jpg' width='40' height='40'/>{""} Samsung</MenuItem>
                    </td>
                    <td>
                    <MenuItem style={{width:200}}  onClick={handleClose}><img src='/nokia.jpg' width='40' height='40'/> Nokia</MenuItem>
                    </td>
                    </tr>
                    <Divider />
                    <tr>
                     <td>
                    <MenuItem style={{width:200}}  onClick={handleClose}><img src='/apple.jpg' width='40' height='40' /> Apple</MenuItem>
                    </td>
                    <td>
                    <MenuItem  style={{width:200}} onClick={handleClose}><img src='/realme.jpg' width='40' height='40'/>Realme</MenuItem>
                    </td>
                    </tr>
                    <Divider />
                    <tr>
                    <td>
                    <MenuItem style={{width:200}}  onClick={handleClose}><img src='/mi.jpg' width='40' height='40'/>Mi</MenuItem>
                    </td>
                    <td>
                    <MenuItem style={{width:200}}  onClick={handleClose}><img src='/oppo.jpg' width='40' height='40'/>Oppo</MenuItem>
                    </td>
                    </tr>
                    <Divider />
                    <tr>
                    <td>
                    <MenuItem style={{width:200}}  onClick={handleClose}><img src='/vivo.jpg' width='40' height='40'/>Vivo</MenuItem>
                    </td>
                    <td>
                    <MenuItem style={{width:200}}  onClick={handleClose}><img src='/oneplus.jpg' width='40' height='40'/>OnePlus</MenuItem>
                    </td>
                    </tr>
                  </MenuList>
                </ClickAwayListener>
              </Paper>
            </Grow>
          )}
        </Popper>
      </div>

      <div style={{marginLeft:50}}>
        <Button
          ref={anchorRef2}
          aria-controls={open ? 'menu-list-grow' : undefined}
          aria-haspopup="true"
          onClick={handleToggle}
        >
          TV
        </Button>
        <Popper open={open} anchorEl={anchorRef2.current} role={undefined} transition disablePortal>
          {({ TransitionProps, placement }) => (
            <Grow
              {...TransitionProps}
              style={{ transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom' }}
            >
              <Paper style={{width:200}}>
                <ClickAwayListener onClickAway={handleClose}>
                  <MenuList autoFocusItem={open} id="menu-list-grow" onKeyDown={handleListKeyDown}>
                  <MenuItem style={{width:200}}  onClick={handleClose}><img src='/mi.jpg' width='40' height='40'/>Mi</MenuItem>
                  <Divider />
                  <MenuItem style={{width:200}}  onClick={handleClose}><img src='/mi.jpg' width='40' height='40'/>Mi</MenuItem>
                  <Divider />
                  <MenuItem style={{width:200}}  onClick={handleClose}><img src='/mi.jpg' width='40' height='40'/>Mi</MenuItem>

                  </MenuList>
                </ClickAwayListener>
              </Paper>
            </Grow>
          )}
        </Popper>
      </div>

      <div style={{marginLeft:50}}>
        <Button
          ref={anchorRef}
          aria-controls={open ? 'menu-list-grow' : undefined}
          aria-haspopup="true"
          onClick={handleToggle}
        >
          smart watch's
        </Button>
        <Popper open={open} anchorE0={anchorRef.current} role={undefined} transition disablePortal>
          {({ TransitionProps, placement }) => (
            <Grow
              {...TransitionProps}
              style={{ transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom' }}
            >
              <Paper style={{width:400}}>
                <ClickAwayListener onClickAway={handleClose}>
                  <MenuList autoFocusItem={open} id="menu-list-grow" onKeyDown={handleListKeyDown}>
                      <tr>
                          <td>
                    <MenuItem style={{width:200}} onClick={handleClose}><img src='/samsung.jpg' width='40' height='40'/>{""} Samsung</MenuItem>
                    </td>
                    <td>
                    <MenuItem style={{width:200}}  onClick={handleClose}><img src='/noise.jpg' width='40' height='40'/> Noise</MenuItem>
                    </td>
                    </tr>
                    <Divider />
                    <tr>
                     <td>
                    <MenuItem style={{width:200}}  onClick={handleClose}><img src='/apple.jpg' width='40' height='40' /> Apple</MenuItem>
                    </td>
                    <td>
                    <MenuItem  style={{width:200}} onClick={handleClose}><img src='/realme.jpg' width='40' height='40'/>Realme</MenuItem>
                    </td>
                    </tr>
                    <Divider />
                    <tr>
                    <td>
                    <MenuItem style={{width:200}}  onClick={handleClose}><img src='/mi.jpg' width='40' height='40'/>Mi</MenuItem>
                    </td>
                    <td>
                    <MenuItem style={{width:200}}  onClick={handleClose}><img src='/oppo.jpg' width='40' height='40'/>Oppo</MenuItem>
                    </td>
                    </tr>
                    <Divider />
                    <tr>
                    <td>
                    <MenuItem style={{width:200}}  onClick={handleClose}><img src='/vivo.jpg' width='40' height='40'/>Vivo</MenuItem>
                    </td>
                    <td>
                    <MenuItem style={{width:200}}  onClick={handleClose}><img src='/oneplus.jpg' width='40' height='40'/>OnePlus</MenuItem>
                    </td>
                    </tr>
                  </MenuList>
                </ClickAwayListener>
              </Paper>
            </Grow>
          )}
        </Popper>
      </div>
    </div>
          
        </Toolbar>
      </AppBar>
      
      
    </div>
  );
}
