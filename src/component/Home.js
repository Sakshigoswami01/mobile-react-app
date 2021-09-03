import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import React, { useState, useEffect } from "react";
import { fade, makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Slider from "react-slick";
import Header from "./Header";
import Footer from "./Footer";
import Divider from '@material-ui/core/Divider';
import { getData, ServerURL } from "../FetchNodeServices";
import { Button, GridListTile } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: "#fff",
  },
}));
var settings = {
  dots: false,
  infinite: true,
  speed: 1000,
  slidesToShow: 1,
  arrows: false,
  slidesToScroll: 1,
  autoplay: true,
  autoplaySpeed: 2000,
};

var set = {
  dots: true,
  infinite: true,
  slidesToShow: 3,
  slidesToScroll: 1,
  autoplay: true,
  autoplaySpeed: 2000,
  nextArrow: <SampleNextArrow />,
  prevArrow: <SamplePrevArrow />
};

var met = {
  dots: false,
  infinite: true,
  slidesToShow: 5,
  slidesToScroll: 1,
  autoplay: true,
  autoplaySpeed: 2000,
  nextArrow: <SampleNextArrow />,
  prevArrow: <SamplePrevArrow />
};

function SampleNextArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{ ...style, display:"block",  background: "black" }}
      onClick={onClick}
    />
  );
}

function SamplePrevArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{ ...style, display:"block",background: "black" }}
      onClick={onClick}
    />
  );
}

export default function Home(props) {
  const classes = useStyles();
  const [list, setList] = useState([]);
  const [ads, setAds] = useState([]);
  const [topbrands, setTopBrands] = useState([]);
  const [categoryList, setCategoryList] = useState([]);
  const [productList, setProductList] = useState([]);



  const fetchBanners = async () => {
    var result = await getData("banner/listbanner");

    setList(result.data);
  };

  const fetchAds = async () => {
    var result = await getData("ads/listads");

   await setAds(result.data);
  };


  const fetchBrands = async () => {
    var result = await getData("brands/listbrand");

   await setTopBrands(result.data);
  };

  const fetchAllCategories = async () => {
    var result = await getData("category/listcategory");
    
    setCategoryList(result.data);
  };

  const fetchAllProducts = async () => {
    var result = await getData("product/listproducts");
    
    setProductList(result.data);
  };

  const sslider = () => {
    return list.map((item, index) => {
      return (
        <div >
          <img src={`${ServerURL}/images/${item.bannerimage}`} width="100%" height="500" />
        </div>
      );
    });
  };

  const ss = () => {
    return ads.map((item, index) => {
      return (
        <div >
          <img src={`${ServerURL}/images/${item.adsimage}`} width="90%" height="100%"  />
        </div>
      );
    });
  };

  const se = () => {
    return topbrands.map((item, index) => {
      return (
        <div style={{width:'30%',height:'30%'}}>
        <div >
          <img src={`${ServerURL}/images/${item.brandimage}`} width="60%" height="20%"  />
        </div>
        </div>
      );
    });
  };



  useEffect(function () {
    fetchBanners();
    fetchAds();
    fetchBrands();
   fetchAllCategories();
   fetchAllProducts();

  }, []);


const showAllCategories = () => {
  return categoryList.map((item, index) => {
    return (
      <div
        style={{
          padding: 60,
        }}
      >
        <div
          style={{
            flexDirection: "col",
            alignItems: "center",
            justifyContent: "center",
           
          }}
        >
          <Button style={{ width:130, height:120,borderRadius:80}}>

          <img
            src={`${ServerURL}/images/${item.icon}`}
            width="130"
            height="120"
            onClick={() => props.history.push({ pathname: "/mobile" })}
          />
          </Button>
          
          <div
            style={{
              textTransform: "uppercase",

              maxHeight: "5em",
              fontWeight: "500",
              fontSize: "1.1em",
              letterSpacing: ".15em",
              color: "#3e4152",
              textAlign: "center",
              width: 130,
            }}
          >
            {item.categoryname}
          </div>
        </div>
      </div>
    );
  });
};

const showAllProducts = () => {
  return productList.map((item, index) => {
    return (
      <Grid item sm={4} style={{display:'flex',padding:2}}>

          <Button>
    <img
            src={`${ServerURL}/images/${item.picture}`}
            width="100%"
            height="100%"
            onClick={()=>props.history.replace({"pathname":"/productview"},{"product":item})}         
          />
          </Button>
          </Grid>
      );
    });
  };

  return (
    <div className={classes.root}>
      <div style={{ width: "100%", flexDirection: "column" }}>
        <Header history={props.history}  / >
        <Grid style={{marginTop:75}}>
        <Slider style={{marginLeft:10,marginRight:10,margin:10}}  {...settings}>{sslider()}</Slider>
        </Grid>
          <div
          style={{
            display: "flex",
            flexDirection: "row",
            padding: 3,
            margin: 10,
           marginLeft: 40,
           fontWeight: "bold",
           fontSize: "20px",
          }}
        >
            Shop from Top Categories

        </div>
        <div style={{marginLeft:40,marginRight:40}}>
        <Divider />
        </div>
        <div style={{display: "flex",flexDirection: "row",alignItems: "center",justifyContent: "center",}}>

        {showAllCategories()}
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "row",
            padding: 3,
            margin: 10,
           marginLeft: 40,
           fontWeight: "bold",
           fontSize: "20px",
          }}
        >
            Deals of the Day

        </div>
        <div style={{marginLeft:40,marginRight:40}}>
        <Divider /><br/>
        <div style={{marginLeft:50,marginRight:50}}>
        <Slider {...set}>
         {ss()}
          
        </Slider>
      </div>
        </div>
        
        <div style={{margin:40}}> 
        <Grid container spacing={1}>
         
        {showAllProducts()}
        </Grid>
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            padding: 3,
            margin: 10,
           marginLeft: 40,
           fontWeight: "bold",
           fontSize: "20px",
          }}
        >
            Top Brands

        </div>
        <div style={{marginLeft:40,marginRight:40}}>
        <Divider />
        <br/>
        <div style={{marginLeft:50,marginRight:50}}>
        <Slider  {...met}>
         
         {se()}
          
        </Slider>
      </div>
        </div>
        
    <Footer />
      </div>
    </div>
  );
}
