const db = require("../models");
const orderid = require("order-id")("supersecret");
const Emailer = require("../config/email.js");

// Defining methods for the ordersController
module.exports = {
    findAll: function (req, res) {
        db.Order.find(req.query)
            .sort({ order_id: -1 })
            .then((dbModel) => res.json(dbModel))
            .catch((err) => res.status(422).json(err));
    },
    findById: function (req, res) {
        db.Order.find({ user_id: req.params.id })
            .sort({ order_date: -1 })
            .then((dbModel) => res.json(dbModel))
            .catch((err) => res.status(422).json(err));
    },
    create: function (req, res) {
        req.body.order_num = orderid.generate();
        //send email here
        Emailer.generateOrderConfirmEmail(
            req.body.email,
            req.body.order_num,
            req.body.item_count,
            req.body.preTax.toFixed(2),
            req.body.shippingHandling.toFixed(2),
            req.body.tax.toFixed(2),
            req.body.total.toFixed(2),
            req.body.ship_address,
            req.body.delivery_date
        );
        db.Order.create(req.body)
            .then((dbModel) => res.json(dbModel))
            .catch((err) => res.status(422).json(err));
    },
    update: function (req, res) {
        db.Order.findOneAndUpdate({ _id: req.params.id }, req.body)
            .then((dbModel) => res.json(dbModel))
            .catch((err) => res.status(422).json(err));
    },
    remove: function (req, res) {
        db.Order.findById({ _id: req.params.id })
            .then((dbModel) => dbModel.remove())
            .then((dbModel) => res.json(dbModel))
            .catch((err) => res.status(422).json(err));
    },
};
