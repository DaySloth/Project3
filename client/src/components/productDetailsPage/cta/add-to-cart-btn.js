import React, { useContext, useState } from "react";
import { Button, Icon, Label } from "semantic-ui-react";
import CartContext from "../../../util/cartContext";

function AddToCartBtn({ id }) {
    const {addProductToCart} = useContext(CartContext);
    const [buttonLoading, setButtonLoading] = useState(false);

    const callToAdd = (event, _id) => {
        event.preventDefault();
        setButtonLoading(true);
        addProductToCart(_id);
    };

    return (
        <Button
            animated="vertical"
            className="addToCartBtn green"
            loading={buttonLoading}
            onClick={(e) => {
                callToAdd(e, id);
            }}
        >
            <Button.Content hidden>
                <Icon name="add to cart" />
            </Button.Content>
            <Button.Content visible>Add to Cart</Button.Content>
        </Button>
    );
}

export default AddToCartBtn;
