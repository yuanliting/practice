var express = require('express');
var router = express.Router();
const mongoose = require('mongoose');
require('./../util/util');
const User = require('../models/user');
const validator = require('validator');
var db = require('./../models/db');




module.exports = router;
