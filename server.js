import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import passport from 'passport';
import {key} from './config/keys';
import PassportConfig from './config/passport';

import users from './routes/api/users';
import profile from './routes/api/profile';
import posts from './routes/api/posts';

const app = express();

//Body Parser middleware
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

//DB config
const db = key;

//Connect to MongoDB
mongoose
    .connect(db.mongoURI, { useNewUrlParser: true })
    .then(()=> console.log('MongoDB connected'))
    .catch (err=>console.log(err));

//Passport middleware
app.use(passport.initialize());

//Passport config
// PassportConfig(passport);
require('./config/passport')(passport);

//User Routes
app.use('/api/users', users);
app.use('/api/profile', profile);
app.use('/api/posts', posts);

app.listen(3000, () => console.log('Example app listening on port 3000!'));