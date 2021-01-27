import React, { useState, useEffect } from "react";
import CartContext from "./util/cartContext.js";
import SearchContext from "./util/searchContext.js";
import UserContext from "./util/userContext.js";
import OrderContext from "./util/orderContext.js";
import API from "./util/API";
import { useCookies } from "react-cookie";

function StateController(props) {
    // Global variables to use
    Date.prototype.addDays = function (days) {
        var date = new Date(this.valueOf());
        date.setDate(date.getDate() + days);
        return date;
    };

    const daysToAdd = Math.floor(Math.random() * 9);
    const date = new Date().addDays(daysToAdd);
    const formatedDate = date.toLocaleDateString(undefined, {
        weekday: "long",
        month: "short",
        day: "numeric",
    });

    //setting up cookies to use for the non-logged in cart to save to
    const [cookies, setCookie, removeCookie] = useCookies(["cookieCart"]);

    //User States

    //used as a master user state to check against, once this changes it will run a save function
    const [userState, setUserState] = useState({
        loggedIn: false,
        _id: "",
        first_name: "",
        last_name: "",
        email: "",
    });

    //this is where you are able to make changes without affecting more components
    const [editableUserState, setEditableUserState] = useState();

    //setting an error state for login page to use
    const [loginErrorState, setLoginErrorState] = useState("");

    //setting an error state for signup page to use
    const [signupErrorState, setSignupErrorState] = useState("");

    //Cart States

    const [cartState, setCartState] = useState({
        cart_total: 0,
        cart_item_count: 0,
        cart_items: [],
        delivery_date: formatedDate,
    });

    //use to store the product_id, and quantity selected
    const [cartIdState, setCartIdState] = useState([]);

    //stores all of the cart items, using their full objects from the db
    const [savedCartItemsState, setSavedCartItemsState] = useState([]);

    //Search States

    //setting up the search state to use on the product search page
    const [searchState, setSearchState] = useState({
        search_query: "",
        search_category: "",
        search_results: [],
        filtered_results: [],
        product_result: {},
        product_categories: [],
    });

    //Order States

    const [ordersState, setOrdersState] = useState({
        orders: [],
        filtered_orders: [],
        order_query: "",
    });

    //////////////////////////////////////////////////////  End State Declaration //////////////////////////////////////////////////////////////

    //User State editing

    //function to load the user
    const loadUser = () => {
        //call to check user that is in session
        API.getUser().then((data) => {
            if (data.data) {
                //since the user session on the server could contain old data, it checks against the db and updates to the new
                //user configuration to reflect any changes

                API.checkUser(data.data.email).then(({ data }) => {
                    setUserState({
                        ...userState,
                        loggedIn: true,
                        ...data[0],
                    });
                    console.log({ ...data[0] });
                    //upon login and user saving it will load your user cart
                    loadCart();
                });
            }
        });
    };

    useEffect(() => {
        //when the user state changes it will save those changes into the editable user, for the user to further edit if they choose
        setEditableUserState(userState);
        //loads the cart again
        loadCart();
        //checks if the user is logged in, if they are they will update the user in the db to reflect any edited fields
        if (userState.loggedIn) {
            API.update(userState._id, userState);
        }
    }, [userState]);

    //handles any edited address and saves to database
    const handleAddressEdit = (editedAddress, index) => {
        let addressArray = editableUserState.address;
        addressArray[index] = editedAddress;
        //saves to the user state to update the server and current user state for the page
        setUserState({ ...userState, address: addressArray });
    };

    //handles any added address and saves to database
    const handleAddressAdd = (newAddress) => {
        let addressArray = editableUserState.address;
        addressArray.push(newAddress);
        //saves to the user state to update the server and current user state for the page
        setUserState({ ...userState, address: addressArray });
    };

    //handles any removed address and saves to database
    const handleAddressRemoval = (index) => {
        let addressArray = editableUserState.address;
        addressArray.splice(index, 1);
        //saves to the user state to update the server and current user state for the page
        setUserState({ ...userState, address: addressArray });
    };

    //handles any edited payment_card and saves to database
    const handleCardEdit = (editedCard, index) => {
        let cardArray = editableUserState.credit_cards;
        cardArray[index] = editedCard;
        //saves to the user state to update the server and current user state for the page
        setUserState({ ...userState, credit_cards: cardArray });
    };

    //handles any added payment_card and saves to database
    const handleCardAdd = (newCard) => {
        let cardArray = editableUserState.credit_cards;
        cardArray.push(newCard);
        //saves to the user state to update the server and current user state for the page
        setUserState({ ...userState, credit_cards: cardArray });
    };

    //handles any removed payment_card and saves to database
    const handleCardRemoval = (index) => {
        let cardArray = editableUserState.credit_cards;
        cardArray.splice(index, 1);
        //saves to the user state to update the server and current user state for the page
        setUserState({ ...userState, credit_cards: cardArray });
    };

    //function to save the user info into the current user state and updates the database
    const saveUserInfoChange = () => {
        //on success, change userState
        setUserState(editableUserState);
    };

    //sets the user state to the users changed info
    const handleUserInfoChange = (event) => {
        const { name, value } = event.target;
        setEditableUserState({ ...editableUserState, [name]: value });
    };

    //makes a call to register the user
    const registerUser = (user) => {
        return API.register(user);
    };

    //makes a call to login the user
    const loginUser = (user, history) => {
        API.login(user)
            .then(({ data }) => {
                //if you receive data from the database it will set your error state to blank and redirect
                setLoginErrorState("");
                loadUser();
                history.push("/");
            })
            .catch((err) => {
                //if anything happens in the process, like an invalid email or password it automatically errors out. We notify the user here
                setLoginErrorState("Invalid Username/password");
            });
    };

    //const history = useHistory();
    //calls the server and logs out the user, reloads to reflect a logout happening
    const logoutUser = () => {
        API.logout().then(({ status }) => {
            if (status === 200) {
                //window.location.href = "/";
                setUserState({
                    loggedIn: false,
                    _id: "",
                    first_name: "",
                    last_name: "",
                    email: "",
                });
                setCartIdState([]);
                setCartState({
                    ...cartState,
                    cart_total: 0,
                    cart_item_count: 0,
                    cart_items: [],
                });
            }
        });
    };

    //////////////////////////////////////////////////////  End User State Editing //////////////////////////////////////////////////////////////

    //Cart State editing

    //when the cart ID state changes (i.e. an item being added, removed or quantity being updated) it will save the cart to the db
    useEffect(() => {
        saveCurrentCart();
        //call to get multiple products
        //sections out the current cart array into a map for editing later on
        let map = new Map();
        let productIdArray = [];
        //runs through the cartID array and sets the map
        cartIdState.forEach(({ _id, qnty_selected }) => {
            map.set(_id, qnty_selected);
            productIdArray.push(_id);
        });
        //calls the db to get the products back
        API.getMultipleProducts(productIdArray).then(({ data }) => {
            let productArray = [];
            if (data) {
                productArray = data;
                //sets the quantity selected onto the specific product object using the map.get call
                productArray.forEach(({ _id }, index) => {
                    productArray[index].qnty_selected = map.get(_id);
                });
            }

            //sets the cartitemstate to the new array
            setSavedCartItemsState(productArray);
        });
        //set into saved cartitemstate
    }, [cartIdState]);

    useEffect(() => {
        let total = 0;
        let count = 0;
        //checks if the cartitemstate has anything in it
        if (savedCartItemsState[0]) {
            //if it does it will take each product and update the count and total accordingly
            savedCartItemsState.forEach(({ price, qnty_selected }) => {
                let productTotal = price * qnty_selected;
                total = total + productTotal;
                count = count + parseInt(qnty_selected);
            });
        }

        //sets the cart state accordingly
        setCartState({
            ...cartState,
            cart_total: total,
            cart_item_count: count,
            cart_items: savedCartItemsState,
        });
    }, [savedCartItemsState]);

    //will load the users cart when called
    const loadCart = () => {
        //call to get cart if someone is logged in
        if (userState.loggedIn) {
            //if the user is logged in it will grab the card data and save it to the db
            API.getCart(userState._id).then(({ data }) => {
                let cartArray = [];
                //if it received data back from the db
                if (data) {
                    //sets our temporary array to the cart_items it got back
                    cartArray = data.cart_items;
                    // if there is a cookie cart present (i.e. the user added an item while not logged in)
                    if (cookies.cookieCart) {
                        //adds the cookie cart to the user cart it received before
                        cartArray = cartArray.concat(cookies.cookieCart);
                        //removes the cookie cart since now it is added to the users saved cart
                        removeCookie(["cookieCart"], { path: "/" });
                    }
                    //if there wasn't data received, it will check for an existing cookie cart and add that to the array, and remove said cart
                } else if (cookies.cookieCart) {
                    cartArray = cartArray.concat(cookies.cookieCart);
                    removeCookie(["cookieCart"], { path: "/" });
                }

                //sets a unique array (only allows one of each item to be added)
                let uniqueArray = [...new Set(cartArray)];

                //sets this array to the cartidstate
                setCartIdState(uniqueArray);
            });
        } else {
            //call to get cart if someone is NOT logged in
            if (cookies.cookieCart) {
                console.log("grabbing cookies cart and setting to cartId");
                console.log(cookies.cookieCart);
                //if there is a cookie cart and they are not logged in it will set the cartidstate to that cookie cart
                setCartIdState(cookies.cookieCart);
            }
        }
    };

    //function for adding a product to the cart - takes in the productId and the quantity the user selected
    const addProductToCart = (productId, qntySelected) => {
        let productObj = { _id: productId, qnty_selected: qntySelected };
        let newCartArray;
        //if there is a cart already going, it will add the prduct to it
        if (cartIdState) {
            newCartArray = cartIdState;
            newCartArray.push(productObj);
        } else {
            newCartArray = [productObj];
        }
        let uniqueArray = [...new Set(newCartArray)];
        //sets the unique array and saved to the users cart if they are logged in
        if (userState.loggedIn) {
            API.saveCart(userState._id, uniqueArray).then((data) => {
                //redirects after a successful save
                //window.location.href = "/cart";
                loadCart();
            });
        } else {
            //if there is no user, it will first remove the cookie cart, and then re-add it with the updated data
            removeCookie(["cookieCart"], { path: "/" });
            setCookie("cookieCart", uniqueArray, { path: "/" });

            setCartIdState(uniqueArray);
        }
    };

    //function to save the current cart
    const saveCurrentCart = () => {
        //if the user is logged in it will save the cart
        if (userState.loggedIn) {
            API.saveCart(userState._id, cartIdState).then(({ data }) => {});
        } else {
            //removes and sets the cookie cart if user is not logged in
            removeCookie(["cookieCart"], { path: "/" });
            setCookie("cookieCart", cartIdState, { path: "/" });
        }
    };

    //handles deleting a product from the cart and saving it to the db
    const deleteProductFromCart = (index) => {
        let deletedArray = cartIdState;
        deletedArray.splice(parseInt(index), 1);
        setCartIdState([...deletedArray]);
    };

    //handles updating a product from the cart and saving it to the db
    const updateProductInCart = (index, newQnty) => {
        let updatedArray = cartIdState;
        updatedArray[index].qnty_selected = parseInt(newQnty);
        setCartIdState([...updatedArray]);
    };

    //////////////////////////////////////////////////////  End Cart State Editing //////////////////////////////////////////////////////////////

    //Order State Editing

    //function for loading the orders
    const loadOrders = (userId) => {
        //call to get orders by userId
        API.getOrders(userId)
            //set into ordersState
            .then(({ data }) => {
                //setting the orders state
                setOrdersState({
                    ...ordersState,
                    orders: [...data],
                    filtered_orders: [...data],
                });
            });
    };

    //checking if the user is searching for a specific order
    useEffect(() => {
        if (ordersState.order_query) {
            let filteredArray = [];
            //runs over each order and the containing items in the order and checks the title to see if it matches the users search
            ordersState.orders.forEach((order) => {
                order.items.forEach((item) => {
                    if (
                        item.title
                            .toUpperCase()
                            .includes(ordersState.order_query.toUpperCase())
                    ) {
                        filteredArray.push(order);
                    }
                });
            });

            //sets the order state to the users filtered array
            setOrdersState({ ...ordersState, filtered_orders: filteredArray });
        } else {
            //set orders array back to the original
            setOrdersState({
                ...ordersState,
                filtered_orders: ordersState.orders,
            });
        }
    }, [ordersState.order_query]);

    //handles the order query change
    const handleOrderSearchChange = (event) => {
        setOrdersState({ ...ordersState, order_query: event.target.value });
    };

    //////////////////////////////////////////////////////  End Order State Editing //////////////////////////////////////////////////////////////

    //Search State Editing

    //on page load it will load the user and call the database to update the categories for products
    useEffect(() => {
        loadUser();
        API.getDbCategories().then(({ data }) => {
            let categoryArray = data.map((item) => {
                return item.category;
            });
            let uniqueArray = [...new Set(categoryArray)];
            //sets the categories for the user to search by
            setSearchState({ ...searchState, product_categories: uniqueArray });
        });
    }, []);

    //function to lookup a product in the database, returns the product and sets to the product_result
    const lookupProduct = (productId) => {
        API.lookupProduct(productId).then(({ data }) => {
            setSearchState({ ...searchState, product_result: data[0] });
        });
    };

    //when the user types in a search it will save it to the search_query to be searched on a form submit
    const handleSearchChange = (event) => {
        setSearchState({ ...searchState, search_query: event.target.value });
    };

    //when the user changes the category it will save it here
    const handleCategoryChange = (event) => {
        setSearchState({ ...searchState, search_category: event.target.value });
    };

    //function for searching products
    const searchProducts = (category, query) => {
        //passes the API the category and query it is searching for and makes the call
        API.searchProducts(category, query).then(({ data }) => {
            //on return it sets the search state to the data it received
            setSearchState({
                ...searchState,
                search_results: data,
                filtered_results: data,
            });
        });
    };

    //////////////////////////////////////////////////////  End Search State Editing //////////////////////////////////////////////////////////////

    return (
        <CartContext.Provider
            value={{
                cartState,
                setCartState,
                addProductToCart,
                deleteProductFromCart,
                saveCurrentCart,
                cartIdState,
                setCartIdState,
                updateProductInCart,
            }}
        >
            <SearchContext.Provider
                value={{
                    searchState,
                    handleSearchChange,
                    handleCategoryChange,
                    searchProducts,
                    lookupProduct,
                }}
            >
                <UserContext.Provider
                    value={{
                        userState,
                        editableUserState,
                        handleUserInfoChange,
                        saveUserInfoChange,
                        registerUser,
                        loginUser,
                        logoutUser,
                        loginErrorState,
                        signupErrorState,
                        setSignupErrorState,
                        handleAddressAdd,
                        handleAddressRemoval,
                        handleAddressEdit,
                        handleCardAdd,
                        handleCardEdit,
                        handleCardRemoval,
                    }}
                >
                    <OrderContext.Provider
                        value={{
                            ordersState,
                            loadOrders,
                            handleOrderSearchChange,
                        }}
                    >
                        {props.children}
                    </OrderContext.Provider>
                </UserContext.Provider>
            </SearchContext.Provider>
        </CartContext.Provider>
    );
}

export default StateController;
