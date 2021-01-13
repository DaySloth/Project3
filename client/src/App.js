import React, { useContext } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Header from "./components/header/header.js";
import Home from "./pages/home/home.js";
import Search from "./pages/search/search.js";
import Dashboard from "./pages/dashboard/dashboard.js";
import Checkout from "./pages/checkout/checkout.js";
import Cart from "./pages/cart/cart.js";
import Login from "./pages/login/login.js";
import Orders from "./pages/orders/orders.js";
import Signup from "./pages/signup/signup.js";
import ProductDetails from "./pages/product-details/product-details.js";
import "./app.css";
import UserContext from "./util/userContext";
import { Check } from "bootstrap-icons-react";

function App() {
    const { userState } = useContext(UserContext);
    return (
        <Router>
            <Header />
            <Switch>
                <Route exact path="/" component={Home} />

                <Route
                    path="/search/C=:category?&Q=:query?"
                    component={Search}
                />

                <Route
                    path="/user/dashboard/:id"
                    component={userState.loggedIn ? Dashboard : Login}
                />

                <Route
                    path="/product/details/:productId"
                    component={ProductDetails}
                />

                <Route
                    path="/checkout"
                    component={userState.loggedIn ? Checkout : Login}
                />

                <Route path="/cart" component={Cart} />

                <Route path="/login" component={Login} />

                <Route path="/signup" component={Signup} />

                <Route path="/orders" component={Orders} />
            </Switch>
        </Router>
    );
}

export default App;
