import React, { useState } from "react";
import { Button, Icon, Label } from "semantic-ui-react";
import { Form, Row, Col } from "react-bootstrap";
import AddToCartBtn from "./add-to-cart-btn.js";

function ProductCta({ id, price, quantity }) {
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

    function generateOptions(count) {
        let i;
        let genQty = [];
        for (i = 0; i < count; i++) {
            genQty.push(i + 1);
        }
        return (
            <>
                {genQty.map((num, index) => (
                    <option key={index}>{num}</option>
                ))}
            </>
        );
    }

    return (
        <div className="cart-cta-div">
            <div className="cta-divs">
                <Label tag className="ui label massive red">
                    ${price}
                </Label>
            </div>
            <div className="cta-divs">
                <p>
                    Delivery: <span>{formatedDate}</span>
                </p>
            </div>
            <div className="cta-divs">
                <h3 className="inStock">In Stock.</h3>
            </div>
            <div className="clearfix cta-divs">
                <label className="float-left">Qty:</label>
                <Form.Control
                    as="select"
                    size="sm"
                    className="select float-left"
                >
                    {generateOptions(quantity)}
                </Form.Control>
            </div>
            <div className="cta-divs addtocart">
                <AddToCartBtn id={id} />
                <Icon name="lock" /> Secure transaction
            </div>
        </div>
    );
}

export default ProductCta;
