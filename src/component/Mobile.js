import React, { useState, useEffect } from "react";
import { fade, makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import { Divider } from "@material-ui/core";
import DeleteOutline from "@material-ui/icons/DeleteOutline";
import { useSelector, useDispatch } from "react-redux";
import Button from "@material-ui/core/Button";
import Header from "./Header";
import Footer from "./Footer";
import QtySpinner from "./QtySpinner";
import "../Admin/style.css";
import { getData, ServerURL } from "../FetchNodeServices";


const useStyles = makeStyles((theme) => ({
    root: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      background: "#F6F6F7",
      
    },

    superRoot: {
        display: "flex",
        flexDirection: "row",
        background: "#F6F6F7",
        marginTop:100

      },

      container: {
        display: "flex",
        flexDirection: "row",
        background: "#fff",
       
      },
  }));

  export default function Mobile(props) {
    const classes = useStyles();
    const [mobile,setmobile]=useState([])

    const fetchAllMobiles = async () => {
        var result = await getData("mobile/listmobiles");
        
        setmobile(result.data);
      };

      useEffect(function () {
       
       fetchAllMobiles();
    
      }, []);

    const showAllMobiles = () => {
        return mobile.map((item, index) => {
          return (
            
            <Grid item sm={3} style={{display:'flex',padding:2}}>

            <div className="jss102">
              <div style={{position:'absolute', zindex: 1, opacity: 1}}></div>
              <div  className="jss103">
                <div style={{opacity: 1, position: 'relative', width: '150px', height: '150px'}}>
                  <div className="zoom">
<center>
                <img
            src={`${ServerURL}/images/${item.productimage}`}
            width="70px"
            height="150px"
                  
          />
          </center>
          </div>
          </div>
    </div>
                <div
                  style={{fontWeight: "bold",fontSize:15}}>
                  {item.productname.substring(0,21)+"..."}
                </div>
                <div style={{fontSize:15}}>
                <small> M.R.P  </small>   <s>&#8377;{item.productrate}</s>&nbsp; <b>&#8377;{item.offerrate}</b>
                </div>
                <div style={{fontSize:15}}>
                <b><small><font color="green">Save {item.productrate-item.offerrate}</font></small></b>
                </div>
                <div style={{padding: '5px 0px', display: 'flex', alignItems: 'center', justifyContent:'center'}}>
                <Button
             onClick={()=>props.history.replace({"pathname":"/productview"},{"product":item})}  
            style={{ color: "#FFF", width: 200, background: "#880808" }}
          >
            Add to cart
          </Button>
                </div>
              </div>
              </Grid>
              
          );
        });
      };

    return (
        <div className={classes.root} style={{marginLeft:200}}>
                <div style={{ width: "100%", flexDirection: "column" }}>
          
            <Header history={props.history}  / >
                <Grid className={classes.superRoot}>
                <Grid container spacing={1}>

                <div className="jss104" style={{background:"#fff"}} > 
                <div className="jss101" >

          
         
        {showAllMobiles()}
        </div>
        </div>
        </Grid>
                </Grid>
            
    
           
           
           
            
           
           
            
            
        <Footer />
          </div>
        </div>
      );


  }
