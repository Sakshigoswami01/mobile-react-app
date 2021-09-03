import React, { useState, useEffect } from "react";
import { RMIUploader } from "react-multiple-image-uploader";
import { postDataAndImage, getData, postData } from "../FetchNodeServices";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import Button from "@material-ui/core/Button";

import swal from "sweetalert";

import { isEmpty, isName, isMobile, isEmail, isNumeric } from "./Checks";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },

  subdiv: {
    width: window.screen.width * 0.8,
    padding: 10,
    marginTop: window.screen.height * 0.05,
    backgroundColor: "white",
  },
  input: {
    display: "none",
  },
}));

export default function ProductPicture(props) {
  const classes = useStyles();
  const [visible, setVisible] = useState(true);
  const [dataSources, setDataSources] = useState([]);

  const [getCategoryid, setCategoryid] = useState([]);
  const [getSubCategoryid, setSubCategoryid] = useState([]);
  const [getProductList, setProductList] = useState([]);
  const [getSelectedCategoryid, setSelectedCategoryid] = useState("");
  const [getSelectedSubCategoryid, setSelectedSubCategoryid] = useState();
  const [getSelectedProductid, setSelectedProductid] = useState();

  //------------Fetch CategoryID-------------//

  const fetchCategoryid = async () => {
    var list = await getData("productcategory/fetchallcategoryid");
    console.log(list);
    setCategoryid(list.data);
  };

  const fillCategoryidItems = () => {
    return getCategoryid.map((item) => {
      return <MenuItem value={item.categoryid}>{item.categoryname}</MenuItem>;
    });
  };

  //------------Fetch Subcategory Id-------------//

  const fetchSubCategoryid = async (cid) => {
    var body = { categoryid: cid };
    var list = await postData(
      "productsubcategory/listsubcategorybycategory",
      body
    );
    setSubCategoryid(list.data);
  };

  const fillSubCategoryidItems = () => {
    return getSubCategoryid.map((item) => {
      return (
        <MenuItem value={item.subcategoryid}>{item.subcategoryname}</MenuItem>
      );
    });
  };

  //----------------------FillProduct...............//

  const fetchProductList = async (sid) => {
    var body = { subcategoryid: sid };
    var list = await postData("products/listproductsbysubcatid", body);

    setProductList(list.data);
  };

  const fillProductItems = () => {
    return getProductList.map((item) => {
      return <MenuItem value={item.productid}>{item.productname}</MenuItem>;
    });
  };

  const handleChangeSubCategory = (event) => {
    fetchProductList(event.target.value);
    setSelectedSubCategoryid(event.target.value);
  };

  const handleChange = (event) => {
    fetchSubCategoryid(event.target.value);
    setSelectedCategoryid(event.target.value);
  };

  //---------------CONSTRUCTOR--------------------//
  useEffect(function () {
    fetchCategoryid();
    fetchSubCategoryid();
  }, []);

  const handleSetVisible = () => {
    alert("1");
    setVisible(true);
  };
  const hideModal = () => {
    alert(2);
    setVisible(false);
  };
  const onUpload = (data) => {
    setDataSources(data);

    console.log("Upload files", data);
  };

  const onSelect = async (data) => {
    var formData = new FormData();
    formData.append("categoryid", getSelectedCategoryid);
    formData.append("subcategoryid", getSelectedSubCategoryid);
    formData.append("productid", getSelectedProductid);
    dataSources.map((item, index) => {
      formData.append("pictures" + index, item.file);
    });
    const config = { headers: { "content-type": "multipart/form-data" } };
    var result = await postDataAndImage(
      "products/addproductpicture",
      formData,
      config
    );

    console.log("Select files", data);
  };
  const onRemove = (id) => {
    alert(5);

    console.log("Remove image id", id);
  };

  return (
    <div className={classes.root}>
      <div className={classes.subdiv}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={4}>
            <FormControl
              variant="outlined"
              className={classes.formControl}
              fullWidth
            >
              <InputLabel id="categoryid">Category Name</InputLabel>
              <Select
                labelId="demo-state"
                id="demo-simple-select-outlined"
                onChange={(event) => handleChange(event)}
                label="Category Name"
                name="categoryname"
              >
                {fillCategoryidItems()}
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={12} sm={4}>
            <FormControl
              variant="outlined"
              className={classes.formControl}
              fullWidth
            >
              <InputLabel id="subcategoryid">Sub Category Name</InputLabel>
              <Select
                labelId="demo-state"
                id="demo-simple-select-outlined"
                onChange={(event) => handleChangeSubCategory(event)}
                label="Sub Category Name"
                name="subcategoryname"
              >
                {fillSubCategoryidItems()}
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={12} sm={4}>
            <FormControl
              variant="outlined"
              className={classes.formControl}
              fullWidth
            >
              <InputLabel id="Productid">Products</InputLabel>
              <Select
                labelId="demo-state"
                id="demo-simple-select-outlined"
                label="Products"
                onChange={(event) => setSelectedProductid(event.target.value)}
              >
                {fillProductItems()}
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={12}>
            <RMIUploader
              isOpen={visible}
              hideModal={hideModal}
              onSelect={onSelect}
              onUpload={onUpload}
              onRemove={onRemove}
              dataSources={dataSources}
            />
          </Grid>
        </Grid>
      </div>
    </div>
  );
}
