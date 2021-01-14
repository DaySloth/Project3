const router = require("express").Router();
const usersController = require("../../controllers/usersController");
const resetPasswordController = require("../../controllers/resetPasswordController.js");
const passport = require("../../config/passport.js");
const randomize = require("randomatic");

// Matches with "/api/user/"
router.route("/").get((req, res) => {
    res.json(req.user);
});

router.route("/check").post(usersController.findByEmail);

// Matches with "/api/user/register"
router.route("/register").post(usersController.create);

// Matches with "/api/user/login"
router.route("/login").post(passport.authenticate("local"), (req, res) => {
    res.json(req.user);
});

router.route("/logout").get((req, res) => {
    console.log("logging out");
    req.logout();
    res.sendStatus(200);
});

router.route("/update/:id").put(usersController.update);

router.route("/forgot-password/create").post((req, res) => {
    req.body.verification_code = randomize("0", 6);
    resetPasswordController.create(req.body).then((data) => {
        //send this to generate the email
        console.log(data.verification_code);
        res.sendStatus(200);
    });
});

router.route("/forgot-password/:id").get(resetPasswordController.findUserResetAndDelete);

module.exports = router;
