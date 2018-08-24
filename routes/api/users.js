import express from 'express';
import mongoose from 'mongoose';
import gravatar from 'gravatar';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import UserModel from '../../models/User';
import {key} from '../../config/keys';
import passport from 'passport';

const router = express.Router();

//Load input Validation
import {validateRegisterInput} from '../../validation/register';
import {validateLoginInput} from '../../validation/login';


// @route   GET api/users/test
// @desc    Test user route
// @access  Public
router.get('/test', (req, res)=> res.json({message: 'Users Works!'}));

// @route   GET api/users/register
// @desc    Test user route
// @access  Public
router.post('/register', (req, res)=> {
    const {errors, isValid } = validateRegisterInput(req.body);
    // Check Validation
    if(!isValid){
        return res.status(400).json(errors)
    }

    UserModel.findOne({ email: req.body.email })
        .then(user=>{
            if(user){
                errors.email = "Email already exists";
                return res.status(400).json(errors)
            }else{
                const avatar = gravatar.url(req.body.email, {
                    s: '200',
                    r: 'pg',
                    d: 'mm'
                });

                const newUser = new UserModel({
                    name: req.body.name,
                    email: req.body.email,
                    avatar,
                    password: req.body.password,
                });

                bcrypt.genSalt(10, (err, salt)=>{
                    bcrypt.hash(newUser.password, salt, (err, hash)=>{
                        if(err) throw err;
                        newUser.password = hash;
                        newUser
                            .save()
                            .then(user => res.json(user))
                            .catch(err => console.log(err));
                    })
                })
            }
        })
});

// @route   GET api/users/login
// @desc    Login user route / returning JWT Token
// @access  Public
router.post('/login', (req, res)=>{
    const {errors, isValid } = validateLoginInput(req.body);
    // Check Validation
    if(!isValid){
        return res.status(400).json(errors)
    }

    const email = req.body.email;
    const password = req.body.password;

    //Find user by email
    UserModel.findOne({ email })
        .then((user) => {
            errors.email = "User not found";
            if(!user) return res.status(400).json(errors);

            //Check Password
            bcrypt.compare(password, user.password)
                .then(isMatch => {
                    if(isMatch){
                        //User Matched
                        const payload = {
                            id: user.id,
                            name: user.name,
                            avatar: user.avatar
                        };
                        //Sign Token
                        jwt.sign(payload, key.secretOrKey, { expiresIn: 3600}, (err, token)=>{
                            res.json({
                                success: true,
                                token: 'bearer '+token,
                                id: user.id
                            })
                        });
                    }else{
                        errors.password = 'Password incorrect';
                        return res.status(400).json(errors)
                    }
                })
        })
});

// @route   GET api/users/current
// @desc    Return current user
// @access  Public
router.get('/current', passport.authenticate('jwt', {session: false}), (req, res)=>{
    res.json({
        msg: 'Success',
        user: req.user
    })
});


export default router;