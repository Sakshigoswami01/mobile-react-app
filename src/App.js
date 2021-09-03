import logo from './logo.svg';
import './App.css';
import { Route, BrowserRouter as Router } from "react-router-dom";

import Header from "./component/Header"
import Home from "./component/Home"
import Signin from "./component/Signin"
import Signup from "./component/Signup"
import ShowCart from "./component/ShowCart"
import ProductView from "./component/ProductView"
import MakePayment from './component/MakePayment';
import PaymentGateway from './component/PaymentGateway';
import Mobile from './component/Mobile';




import AdminLogin from "./Admin/AdminLogin"
import Category from "./Admin/Category"
import Dashboard from "./Admin/Dashboard"
import Banner from "./Admin/Banner"
import Ads from "./Admin/Ads"
import Brands from "./Admin/Brands"
import Products from "./Admin/Products"
import ProductMultipleImage from './Admin/ProductMultipleImage';
import Addmobile from './Admin/Addmobile';





function App(props) {
  return (
    <div>
      <Router>
        <Route strict  exact  component={AdminLogin}  path="/adminlogin"  history={props.history}></Route>
        <Route strict  exact  component={Dashboard}  path="/dashboard"  history={props.history}></Route>
        <Route strict  exact  component={Category}  path="/category"  history={props.history}></Route>
        <Route strict  exact  component={Banner}  path="/banner"  history={props.history}></Route>
        <Route strict  exact  component={Ads}  path="/ads"  history={props.history}></Route>
        <Route strict  exact  component={Header}  path="/header"  history={props.history}></Route>
        <Route strict  exact  component={Home}  path="/home"  history={props.history}></Route>
        <Route strict  exact  component={ProductView}  path="/productview"  history={props.history}></Route>
        <Route strict  exact  component={Addmobile}  path="/addmobile"  history={props.history}></Route>

        <Route strict  exact  component={Products}  path="/products"  history={props.history}></Route>
        <Route strict  exact  component={Brands}  path="/brands"  history={props.history}></Route>
        <Route strict  exact  component={Signin}  path="/signin"  history={props.history}></Route>
        <Route strict  exact  component={Signup}  path="/signup"  history={props.history}></Route>
        <Route strict  exact  component={ShowCart}  path="/showcart"  history={props.history}></Route>
        <Route strict  exact  component={MakePayment}  path="/makepayment"  history={props.history}></Route>
        <Route strict  exact  component={ProductMultipleImage}  path="/productmultipleimage"  history={props.history}></Route>
        <Route strict  exact  component={PaymentGateway}  path="/paymentgateway"  history={props.history}></Route>
        <Route strict  exact  component={Mobile}  path="/mobile"  history={props.history}></Route>







      </Router>
      </div>
  );
}

export default App;


