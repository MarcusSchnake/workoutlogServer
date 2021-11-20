require("dotenv").config();
const Express = require("express");
const app = Express();
const dbConnection = require("./db");
const cors = require('cors'); 

app.use(require('./middleware/headers'));

const controllers = require("./controllers");

// app.use(require('./middleware/headers'));

app.use(Express.json());


app.use(cors({
    origin: '*'
})); 

app.use("/user", controllers.userController);

 app.use(require("./middleware/validate-jwt"));
app.use("/workoutlog/", controllers.workoutlogcontroller);

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

