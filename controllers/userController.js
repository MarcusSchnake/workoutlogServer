const router = require("express").Router();
const { UserModel } = require("../models");
const { UniqueConstraintError } = require("sequelize/lib/errors");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

router.post("/register", async (req, res) => {

    let { user, password } = req.body.user;
    try {
        const User = await UserModel.create({
            user,//needs to match user.js file User and password
            password: bcrypt.hashSync(password,13),
        });

        let token = jwt.sign({id: User.id}, process.env.JWT_SECRET, {expiresIn: 60 * 60 * 24});
        res.status(201).json({
            message: "User successfully registered",
            user: User,
            sessionToken: token
        });
    } catch (err) {
        if (err instanceof UniqueConstraintError) {
            res.status(409).json({
                message: "User name already in use"
            })
        } else {
            res.status(500).json({
                message: "Failed to register user",
            });
        }
    }
});
router.post("/login", async (req, res) => {
    let { user, password } = req.body.user;

    try {
        const loginUser = await UserModel.findOne({
            where: {
                user: user,
            },
        });
        if (loginUser) {

            let passwordComparison = await bcrypt.compare(password, loginUser.password);

            if (passwordComparison) {

            
            let token = jwt.sign({id: loginUser.id}, process.env.JWT_SECRET, {expiresIn: 60 * 60 * 24});
            res.status(200).json({
                user: loginUser,
                message: "User successfully logged in!",
                sessionToken: token
            });
        } else {
            res.status(401).json({
                message: "Incorrect user name or password"
            })
        }
        } else {
            res.status(401).json({
                message: "Incorrect user name or password"
            });
        }

    } catch (error) {
        res.status(500).json({
            message: "Failed to log user in"
        })
    }
});
module.exports = router;
