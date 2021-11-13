require("dotenv").config();
const Express = require("express");
const app = Express();
const dbConnection = require("./db");

const controllers = require("./controllers");

app.use(Express.json());

app.use("/user", controllers.userController);

// app.use(require("./middleware/validate-jwt"));
app.use("/workoutlog", controllers.workoutlogcontroller);

dbConnection.authenticate()
.then(() => dbConnection.sync())
.then(() => {
    app.listen(3002, () => {
        console.log(`[Server]: App is listening on 3002.`);
    });
})
.catch((err) => {
    console.log(`[Server]: Server crashed. Error = ${err}`);
});

