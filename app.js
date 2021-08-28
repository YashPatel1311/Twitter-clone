const express=require('express');
const router= express.Router();
const mongoose=require('mongoose');
const employee=require('./Models/employee')
const employeeAPI=require('./Routes/employeeAPI');
require('dotenv/config');
