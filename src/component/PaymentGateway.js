import React, { Component, useEffect, useState } from "react";
import { Button } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import { useDispatch, useSelector } from "react-redux";
import { postData, ServerURL } from "../FetchNodeServices";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import swal from 'sweetalert';
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Header from "./Header";

const useStyles = makeStyles({
  root: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  subdiv: {
    width: 550,
    padding: 20,
    marginTop: 20,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  card: {
    border: "1px solid #bdc3c7",
    width: 250,
  },
  cardactionarea: {
    borderBottom: "1px solid #bdc3c7",
    borderTop: "2px solid #bdc3c7",
  },
  cardmedia: {
    borderBottom: "1px solid #bdc3c7",
  },
});

const styles = (theme) => ({
  root: {
    width: "100%",
    marginTop: theme.spacing.unit * 3,
    overflowX: "auto",
  },
  table: {
    minWidth: 700,
  },
  icon: {
    margin: theme.spacing.unit,
    fontSize: 32,
  },
  margin: {
    marginRight: "80%",
    paddingLeft: "",
  },
  button: {
    margin: theme.spacing.unit,
  },

  rightIcon: {
    marginLeft: theme.spacing.unit,
  },
});

const PaymentGateway = (props) => {
  var dispatch = useDispatch();
  var cart = useSelector((state) => state.cart);
  var customer = useSelector((state) => state.customer);
  var user = Object.values(customer)[0];
  var keys = Object.keys(cart);
  var values = Object.values(cart);
  var totalsaving = values.reduce(calculatesaving, 0);
  var totalrate = values.reduce(calculaterate, 0);
  var totalamt = totalrate - totalsaving;

  function calculatesaving(a, b) {
    var price = b.qtydemand * (b.productrate - b.offerrate);
    return a + price;
  }
  function calculaterate(a, b) {
    var price = b.qtydemand * b.productrate;
    return a + price;
  }

  const [getUserData, setUserData] = useState(user);
  const handleCashOnDelivery = () => {
    handleSubmitOrder("Cash On Delivery", "none");
  };

  const handleOnLinePayment = () => {
    customer[user.mobileno]["PaymentMode"] = "Online Payment";
    openPayModal();
  };
  const handleSubmitOrder = async (paymentmode, transactionid) => {
    var d = new Date();
    var cd = d.getFullYear() + "/" + (d.getMonth() + 1) + "/" + d.getDate();
    var ct = d.getHours() + ":" + d.getMinutes() + ":" + d.getSeconds();

    var body = {
      orderdate: cd,
      ordertime: ct,
      totalamt: totalamt,
      emailid: user.emailid,
      mobileno: user.mobileno,
      paymentmode: paymentmode,
      transactionid: transactionid,
    };
    var result = await postData("orders/generateorderno", body);
    
    if (result.result) {
      var bdy = {
        orderid: result.orderid,
        orderdate: cd,
        ordertime: ct,
        mobileno: user.mobileno,
        emailid: user.emailid,
        username: user.firstname + " " + user.lastname,
        addressone: user.address1,
        addresstwo: user.address2,
        state: user.state,
        city: user.city,
        cart: values,
        paymentmode: paymentmode,
        totalamount: totalamt,
        deliverystatus: "pending",
        transactionid: transactionid,
      };
      var res = await postData("orders/addorder", bdy);
      swal({
        title: "Order Placed", 
        text: "Thanks For Ordering",
        icon: "success",
      });
    }
  };

  const options = {
    key: "rzp_test_GQ6XaPC6gMPNwH",
    amount: totalamt*100, //  = INR 1
    name: "MOBILE STORE",
    description: "some description",
    image: 'https://image.freepik.com/free-vector/mobile-store-logo_8050-35.jpg',
    handler: function (response) {
      alert(response.razorpay_payment_id);
    },
    prefill: {
      name: getUserData.firstname + " " + getUserData.lastname,
      contact: getUserData.mobileno,
      email: getUserData.emailid,
    },
    notes: {
      address: "some address",
    },
    theme: {
      color: "blue",
      hide_topbar: false,
    },
  };

  const openPayModal = () => {
    var rzp1 = new window.Razorpay(options);
    rzp1.open();
  };
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;
    document.body.appendChild(script);
  }, []);
  const classes = useStyles();

  return (
    <div>
      <Header history={props.history} />

      <div className={classes.root} style={{marginTop:100}}>
        <div className={classes.subdiv}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <Card className={classes.card}>
                <CardActionArea className={classes.cardactionarea}>
                  <CardMedia
                    className={classes.cardmedia}
                    component="img"
                    alt="Cash on Delivery"
                    image="https://thumbs.dreamstime.com/b/cash-delivery-cod-service-vector-red-tag-payment-fast-door-to-door-e-commerce-flat-illustration-64321954.jpg"
                    title="Cash on Delivery"
                  />
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="h2">
                      Cash on Delivery
                    </Typography>
                    <Typography
                      variant="body2"
                      color="textSecondary"
                      component="p"
                    >
                      Lizards are a widespread group of squamate reptiles, with
                      over 6,000 species, ranging across all continents except
                      Antarctica
                    </Typography>
                  </CardContent>
                </CardActionArea>
                <CardActions>
                  <Button
                    variant="contained"
                    color="primary"
                    fullWidth
                    onClick={() => handleCashOnDelivery()}
                  >
                    Cash on Delivery
                  </Button>
                </CardActions>
              </Card>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Card className={classes.card}>
                <CardActionArea className={classes.cardactionarea}>
                  <CardMedia
                    className={classes.cardmedia}
                    component="img"
                    alt="Online Payment"
                    image="https://www.swipez.in/blog/media/posts/23/2933578.jpg"
                    title="Online Payment"
                  />
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="h2">
                      Online Payment
                    </Typography>
                    <Typography
                      variant="body2"
                      color="textSecondary"
                      component="p"
                    >
                      Lizards are a widespread group of squamate reptiles, with
                      over 6,000 species, ranging across all continents except
                      Antarctica
                    </Typography>
                  </CardContent>
                </CardActionArea>
                <CardActions>
                  <Button
                    variant="contained"
                    color="primary"
                    fullWidth
                    onClick={() => handleOnLinePayment()}
                  >
                    Online Payment
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          </Grid>
        </div>
      </div>
    </div>
  );
};
export default withStyles(styles)(PaymentGateway);
