import express from 'express';
import mongoose from 'mongoose';
import CONFIG_DB from './config/keys';
const app = express();

//DB config
const db = CONFIG_DB;

// respond with "hello world" when a GET request is made to the homepage
app.get('/', function (req, res) {
  res.send('hello world!!!')
});

app.listen(3000, () => console.log('Example app listening on port 3000!'));