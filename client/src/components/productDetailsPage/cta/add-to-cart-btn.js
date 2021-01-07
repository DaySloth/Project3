import React, { useState } from "react";
import { Button, Icon, Label } from "semantic-ui-react";

function AddToCartBtn() {
    const [buttonLoading, setButtonLoading] = useState(false);

    const callToAdd = (event) => {
        event.preventDefault();
        setButtonLoading(true);

        setTimeout(() => {
            setButtonLoading(false);
        }, 5000);
    };

    return (
        <Button
            animated="vertical"
            className="addToCartBtn green"
            loading={buttonLoading}
            onClick={callToAdd}
        >
            <Button.Content hidden>
                <Icon name="shop" />
            </Button.Content>
            <Button.Content visible>Add to Cart</Button.Content>
        </Button>
    );
}

export default AddToCartBtn;