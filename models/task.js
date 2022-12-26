const mongoose = require("mongoose");

const TaskSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "must provide name"], // custom message in response when you don't send this propery like validation
        trim: true, // to trim "  hello  "
        maxlength: [20, "name can't be more than 20 char"],
    },
    completed: {
        type: Boolean,
        default: false,
    },
});

module.exports = mongoose.model("Task", TaskSchema);
