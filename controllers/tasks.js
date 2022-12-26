const Task = require("../models/task");

const getAllTasks = async (req, res) => {
    try {
        const tasks = await Task.find({});
        res.send({ tasks });
    } catch (err) {
        res.status(501).json({ msg: err });
    }
};
const createTask = async (req, res) => {
    try {
        const db_res = await Task.create(req.body);
        res.send(db_res);
    } catch (err) {
        res.status(501).json({ msg: err });
    }
};
const getTask = async (req, res) => {
    try {
        const { id: taskID } = req.params;
        const task = await Task.findOne({ _id: taskID });
        if (!task) {
            return res.status(404).json({ msg: `no task with id ${taskID}` });
        }
        res.status(200).json({ task });
    } catch (err) {
        res.status(501).json({ msg: err });
    }
};
const updateTask = async (req, res) => {
    try {
        const { id: taskID } = req.params;
        const task = await Task.findOneAndUpdate({ _id: taskID }, req.body, {
            new: true, // to get updated task
            runValidators: true, // validaters must be true or you can add "" in name
        });
        if (!task) {
            return res.status(404).json({ msg: `no task with id ${taskID}` });
        }
        res.status(200).json({ task });
    } catch (err) {
        res.status(501).json({ msg: err });
    }
};
const deleteTask = async (req, res) => {
    try {
        const { id: taskID } = req.params;
        const db_res = await Task.findByIdAndDelete({ _id: taskID });
        if (!db_res) {
            return res.status(404).json({ msg: `no task with id ${taskID}` });
        }
        res.status(200).json({ db_res });
    } catch (err) {
        res.status(501).json({ msg: err });
    }
};

module.exports = {
    getAllTasks,
    createTask,
    getTask,
    updateTask,
    deleteTask,
};
