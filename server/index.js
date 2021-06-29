var express = require('express');
var mongoose = require('mongoose');
var cors = require('cors');

const app = express();

app.use(express.json({ limit: "30mb", extended: true }));
app.use(express.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());

