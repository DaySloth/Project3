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
                API.checkUser(data.email).then(({ data }) => {
                    setUserState({
                        ...userState,
                        loggedIn: true,
                        ...data[0],
                    });

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

    const saveUserInfoChange = () => {
        //on success, change userState
        setUserState(editableUserState);
    };

    const registerUser = (user) => {
        console.log("reg");
        return API.register(user);
    };

    const loginUser = (user) => {
        API.login(user)
            .then(({ data }) => {
                setLoginErrorState("");
                //setUserState({ ...userState, loggedIn: true, ...data });
                window.location.href = "/";
            })
            .catch((err) => {
                setLoginErrorState("Invalid Username/password");
            });
    };

    const logoutUser = () => {
        API.logout().then(({ status }) => {
            if (status === 200) {
                window.location.href = "/";
            }
        });
    };

    //////////////////////////////////////////////////////  End User State Editing //////////////////////////////////////////////////////////////

    //Cart State editing

    useEffect(() => {
        saveCurrentCart();
        //call to get multiple products
        let map = new Map();
        let productIdArray = [];
        cartIdState.forEach(({ _id, qnty_selected }) => {
            map.set(_id, qnty_selected);
            productIdArray.push(_id);
        });
        API.getMultipleProducts(productIdArray).then(({ data }) => {
            let productArray = data;
            productArray.forEach(({ _id }, index) => {
                productArray[index].qnty_selected = map.get(_id);
            });

            setSavedCartItemsState(productArray);
        });
        //set into saved cartitemstate
    }, [cartIdState]);

    useEffect(() => {
        let total = 0;
        let count = 0;
        if (savedCartItemsState[0]) {
            savedCartItemsState.forEach(({ price, qnty_selected }) => {
                let productTotal = price * qnty_selected;
                total = total + productTotal;
                count = count + parseInt(qnty_selected);
            });
        }

        setCartState({
            ...cartState,
            cart_total: total,
            cart_item_count: count,
            cart_items: savedCartItemsState,
        });
    }, [savedCartItemsState]);

    const loadCart = () => {
        //call to get cart if someone is logged in
        if (userState.loggedIn) {
            API.getCart(userState._id).then(({ data }) => {
                let cartArray = [];
                if (data) {
                    cartArray = data.cart_items;
                    if (cookies.cookieCart) {
                        cartArray = cartArray.concat(cookies.cookieCart);
                        removeCookie(["cookieCart"], { path: "/" });
                    }
                } else if (cookies.cookieCart) {
                    cartArray = cartArray.concat(cookies.cookieCart);
                    removeCookie(["cookieCart"], { path: "/" });
                }

                let uniqueArray = [...new Set(cartArray)];
                setCartIdState(uniqueArray);
            });
        } else {
            //call to get cart if someone is NOT logged in
            if (cookies.cookieCart) {
                setCartIdState(cookies.cookieCart);
            }
        }
    };

    const addProductToCart = (productId, qntySelected) => {
        let productObj = { _id: productId, qnty_selected: qntySelected };
        let newCartArray;
        if (cartIdState) {
            newCartArray = cartIdState;
            newCartArray.push(productObj);
        } else {
            newCartArray = [productObj];
        }
        let uniqueArray = [...new Set(newCartArray)];
        if (userState.loggedIn) {
            API.saveCart(userState._id, uniqueArray).then((data) => {
                window.location.href = "/cart";
            });
        } else {
            removeCookie(["cookieCart"], { path: "/" });
            setCookie("cookieCart", uniqueArray, { path: "/" });
            window.location.href = "/cart";
        }
    };

    const saveCurrentCart = () => {
        if (userState.loggedIn) {
            API.saveCart(userState._id, cartIdState).then(({ data }) => {});
        } else {
            removeCookie(["cookieCart"], { path: "/" });
            setCookie("cookieCart", cartIdState, { path: "/" });
        }
    };

    const deleteProductFromCart = (index) => {
        let deletedArray = cartIdState;
        deletedArray.splice(parseInt(index), 1);
        setCartIdState([...deletedArray]);
    };

    const updateProductInCart = (index, newQnty) => {
        let updatedArray = cartIdState;
        updatedArray[index].qnty_selected = parseInt(newQnty);
        setCartIdState([...updatedArray]);
    };

    //////////////////////////////////////////////////////  End Cart State Editing //////////////////////////////////////////////////////////////

    //Order State Editing

    const loadOrders = (userId) => {
        //call to get orders by userId
        API.getOrders(userId)
            //set into ordersState
            .then(({ data }) => {
                setOrdersState({
                    ...ordersState,
                    orders: [...data],
                    filtered_orders: [...data],
                });
            });
    };

    useEffect(() => {
        if (ordersState.order_query) {
            let filteredArray = [];
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

            setOrdersState({ ...ordersState, filtered_orders: filteredArray });
        } else {
            //set orders array
            setOrdersState({
                ...ordersState,
                filtered_orders: ordersState.orders,
            });
        }
    }, [ordersState.order_query]);

    //////////////////////////////////////////////////////  End Order State Editing //////////////////////////////////////////////////////////////

    //Search State Editing

    useEffect(() => {
        loadUser();
        API.getDbCategories().then(({ data }) => {
            let categoryArray = data.map((item) => {
                return item.category;
            });
            let uniqueArray = [...new Set(categoryArray)];
            setSearchState({ ...searchState, product_categories: uniqueArray });
        });
    }, []);

    const handleOrderSearchChange = (event) => {
        setOrdersState({ ...ordersState, order_query: event.target.value });
    };

    const lookupProduct = (productId) => {
        API.lookupProduct(productId).then(({ data }) => {
            setSearchState({ ...searchState, product_result: data[0] });
        });
    };

    const handleSearchChange = (event) => {
        setSearchState({ ...searchState, search_query: event.target.value });
    };

    const handleCategoryChange = (event) => {
        setSearchState({ ...searchState, search_category: event.target.value });
    };

    const handleUserInfoChange = (event) => {
        const { name, value } = event.target;
        setEditableUserState({ ...editableUserState, [name]: value });
    };

    const searchProducts = (category, query) => {
        API.searchProducts(category, query).then(({ data }) => {
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
