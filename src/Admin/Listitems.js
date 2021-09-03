import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import TreeView from "@material-ui/lab/TreeView";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import TreeItem from "@material-ui/lab/TreeItem";

import Banner from "./Banner";
import ListBanner from "./ListBanner";
import Ads from "./Ads";
import ListAds from "./ListAds";
import Brands from "./Brands";
import ListBrands from "./ListBrands";
import Category from "./Category";
import ListCategory from "./ListCategory";
import Products from "./Products";
import ListProducts from "./ListProducts";
import Addmobile from "./Addmobile";
import Listmobiles from "./Listmobiles"



const useStyles = makeStyles({
  root: {
    height: 216,
    flexGrow: 1,
    maxWidth: 400,
  },
});

export default function ListItems(props) {
  const classes = useStyles();
  const handleClick = (value) => {
    props.showView(value);
  };
  return (
    <div>
      <TreeView
        className={classes.root}
        defaultCollapseIcon={<ExpandMoreIcon />}
        defaultExpandIcon={<ChevronRightIcon />}
        multiSelect
      >

          <TreeItem nodeId="1 " label="Banners">
          <TreeItem nodeId="2" label="New Banner"onClick={()=>handleClick(<Banner/>)} />
          <TreeItem nodeId="3" label="Show Banner"onClick={()=>handleClick(<ListBanner/>)} />
          </TreeItem>

          <TreeItem nodeId="4 " label="Ads">
          <TreeItem nodeId="5" label="New Ads"onClick={()=>handleClick(<Ads/>)} />
          <TreeItem nodeId="6" label="Show Ads"onClick={()=>handleClick(<ListAds/>)} />
          </TreeItem>

          <TreeItem nodeId="7 " label="Category">
          <TreeItem nodeId="8" label="New Category"onClick={()=>handleClick(<Category/>)} />
          <TreeItem nodeId="9" label="Show Category"onClick={()=>handleClick(<ListCategory/>)} />
          </TreeItem>

          <TreeItem nodeId="10 " label="Product">
          <TreeItem nodeId="11" label="New Product"onClick={()=>handleClick(<Products/>)} />
          <TreeItem nodeId="12" label="Show Product"onClick={()=>handleClick(<ListProducts/>)} />
          </TreeItem>

          <TreeItem nodeId="13 " label="Brands">
          <TreeItem nodeId="14" label="New Brands" onClick={()=>handleClick(<Brands/>)} />
          <TreeItem nodeId="15" label="Show Brands" onClick={()=>handleClick(<ListBrands/>)} />
          </TreeItem>

          <TreeItem nodeId="16 " label="Mobile">
          <TreeItem nodeId="17" label="New Mobile" onClick={()=>handleClick(<Addmobile/>)} />
          <TreeItem nodeId="18" label="Show Mobile" onClick={()=>handleClick(<Listmobiles/>)} />
          </TreeItem>


      </TreeView>


    </div>
  );
}
