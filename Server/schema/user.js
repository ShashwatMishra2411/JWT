const express = require('express');
const mongoose = require('mongoose');

const app = express();

const user = new mongoose.Schema({
    username: String,
    password: String
})

module.exports = mongoose.model("userData", user)