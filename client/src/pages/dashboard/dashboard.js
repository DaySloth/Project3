import React, { useContext } from "react";
import "./dashboard.css";
import Footer from "../../components/footer/footer";
import Wrapper from "../../components/wrapper/wrapper";
import AccountInfo from "../../components/userAccountPage/account-info/account-info.js";
import SavedAddress from "../../components/userAccountPage/saved-address/saved-address.js";
import SavedPayment from "../../components/userAccountPage/saved-payment/saved-payment.js";
import UserContext from "../../util/userContext.js";
import CartContext from "../../util/cartContext.js";

function UserDashboard() {
    const { logoutUser } = useContext(UserContext);
    const { saveCurrentCart } = useContext(CartContext);
    return (
        <>
            <Wrapper>
                <div className="dashboard-div">
                    <button onClick={(saveCurrentCart, logoutUser)}>
                        Logout
                    </button>
                    <AccountInfo />
                    <SavedAddress />
                    <SavedPayment />
                </div>
            </Wrapper>
            <Footer />
        </>
    );
}

export default UserDashboard;
