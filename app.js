const express = require("express");
require("dotenv").config();
const app = express();
const routes = require("./routers/tasks");
const connectDB = require("./db/connect");
const notFound = require("./middleware/not-found");
const port = process.env.PORT || 3000;

app.use(express.static("./public"));
app.use(express.json());

app.use("/api/v1/tasks", routes);
// if route not found then this route will be executed
app.use(notFound);

const start = async () => {
    try {
        await connectDB(process.env.MONGO_URI);
        app.listen(port, () =>
            console.log(
                `API is setup on✅... http://localhost:${port}/api/v1/tasks`
            )
        );
        console.log("connected to db🔥...");
    } catch (err) {
        console.log("error with db❌ =>", err);
    }
};

start();
/*

goals
get : to get task
post : create new task
put : to update task
delete task : to delete task

app.get('/api/v1/tasks')         - get all the tasks
app.post('/api/v1/tasks')        - create a new task
app.get('/api/v1/tasks/:id')     - get single task
app.put('/api/v1/tasks/:id')     - update task
app.delete('/api/v1/tasks/:id')  - delete task

routes.route("/").get().post();
routes.route("/:id").get().put().delete();

1) create one routes
2) try to check working with app.js
3) create one controller
4) try to check working
5) create multiple controller = with some send in them
6) create multiple route = routes.route("/").get(getAllTasks).post(createTask);
7) check all routes
8) to check post route : send req json in body recieve res as same json
9) database (db) setUP with mongoose
10) Schema (schema) setUP with mongoose
11) Direct import schema in controllers/tasks.js and use
12) * IMP = even if we send extra property in body of post: only schema property is being used extra ingnored
13) start server tand test on frontEnd

Patch = will update only the property which we pass to it
ex. if (we pass name) will only change name rest will remain same
Put   = will replace the entire item if (one property pass) rest property will be removed
ex. if (we pass name) will change name rest will be deleted
*/
