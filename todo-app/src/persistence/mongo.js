const mongoose = require('mongoose');
require('dotenv').config();

const {
    MONGO_URI = process.env.MONGO_URI
} = process.env;

let db;

// Define Schema
const todoItemSchema = new mongoose.Schema({
    id: { type: String, required: true, unique: true },
    name: String,
    completed: Boolean,
});

// Create Model
const TodoItem = mongoose.model('TodoItem', todoItemSchema);

async function init() {
    db = await mongoose.connect(MONGO_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });
    console.log(`Connected to MongoDB at ${MONGO_URI}`);
}

async function teardown() {
    await mongoose.disconnect();
}

async function getItems() {
    return await TodoItem.find({});
}

async function getItem(id) {
    return await TodoItem.findOne({ id });
}

async function storeItem(item) {
    const newItem = new TodoItem(item);
    await newItem.save();
}

async function updateItem(id, item) {
    await TodoItem.updateOne({ id }, { $set: item });
}

async function removeItem(id) {
    await TodoItem.deleteOne({ id });
}

module.exports = {
    init,
    teardown,
    getItems,
    getItem,
    storeItem,
    updateItem,
    removeItem,
};
