import React, { useState, useEffect } from "react";
import { fade, makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid"
import {ServerURL} from "../FetchNodeServices"
import {useSelector,useDispatch} from "react-redux"
import Divider from '@material-ui/core/Divider';
import Header from "./Header";
import Footer from "./Footer";
import QtySpinner from './QtySpinner'


const useStyles = makeStyles((theme) => ({
    root: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      background: "#fff",
    },
  }));

  export default function ProductView(props) {
    const classes = useStyles();
   const [refresh,setRefresh]=useState(false)
    var product=props.history.location.state.product

   var dispatch=useDispatch()

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

  return(
     <div>
        <Header history={props.history} />
        <Grid container spacing={1} style={{marginTop:100}} >
            <Grid item xs={12} sm={6}>
             <div style={{width:800,display:'flex',padding:10,justifyContent:'center',alignItem:'center',margin:20 }}>
             <img src={`${ServerURL}/images/${product.productimage}`} width="100"/>
             </div>   
            </Grid>
            <Grid item xs={12} sm={6}>
              <div style={{display:'flex',flexDirection:'column'}} >
              <h1 style={{
    fontWeight: 'bold',
    marginBottom: 0,
    fontSize: 20}}>{product.productname}</h1>
             
             
             <div style={{display:'flex',flexDirection:'row'}}>

              <div  style={{margin:20, marginBottom: 0}}>
                <span>M.R.P : </span>{" "}
                <b><s>&#8377;{product.productrate}</s></b>
              </div>
              
             </div>
             <div   style={{margin:20,flexDirection:'row',display:'flex',marginBottom:0}}>
             <span>Price :&nbsp; </span>{" "}
             {product.offerrate>0?(<div><span><b>&#8377;{product.offerrate}</b></span></div>):(<div><span><b>&#8377;{product.productrate}</b></span></div>)}

              </div>
             { product.offerrate>0?(
             <div style={{fontWeight:700,margin:20,color:'green', marginBottom: 0}}>
              You save <span>&#8377;</span> {product.productrate-product.offerrate}
               </div> ):(<></>)}

               <div  style={{margin:20, marginBottom: 0}}>
                <span> Inclusive of all taxes</span>{" "}
              </div>

            
             {product.stock>=1 && product.stock<=3?(<div style={{fontSize:20,fontWeight:700,margin:20,color:'red'}}>Hurry Only {product.stock} Quantity left</div>):product.stock>=4?(<div style={{fontSize:20,fontWeight:700,margin:20,color:'green'}}>Stock Avalaible</div>):(<div style={{fontSize:14,fontWeight:800,margin:20,color:'red'}}>Out of Stock</div>)}

             {product.stock>=1?(<div style={{margin:20}}>
             <QtySpinner  value={0} onChange={(value)=>handleQtyChange(value,product)}/></div>):(<></>)}
              </div>
              <div style={{fontSize:14,fontWeight:800,margin:20}}>
              <span style={{fontWeight:400}}>Inaugural Offer</span> Free Shipping
              </div>

            </Grid>
            
        </Grid>
        <div style={{marginLeft:50,marginRight:50}}>
        <Divider /><br/>
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
           marginLeft: 50,
           fontWeight: "bold",
           fontSize: "20px",
          }}
        >
        Description
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
           marginLeft: 50,
           fontWeight: "bold",
           fontSize: "18px",
          }}
        >
        <ul>{product.productname}</ul>
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
           marginLeft: 100,
           fontSize: "15px",
          }}
        >
          <li>{product.description1}</li>
          </div>

          <div
          style={{
            display: "flex",
            flexDirection: "row",
           marginLeft: 100,
           fontSize: "15px",
          }}
        >
          <li>{product.description2}</li>
          </div>
          <div
          style={{
            display: "flex",
            flexDirection: "row",
           marginLeft: 100,
           fontSize: "15px",
          }}
        >
          <li>{product.description3}</li>
          </div>
         
       <br/>


        <Footer/>
     </div>

  )
  

}  