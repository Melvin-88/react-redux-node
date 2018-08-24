import express from 'express';
import ProfileModel from '../../models/Profile';
import UserModel from '../../models/User';
import mongoose from 'mongoose';
import {key} from '../../config/keys';
import passport from 'passport';
const router = express.Router();

// @route   GET api/profile
// @desc    Get current users profile
// @access  Privet
router.get('/', passport.authenticate('jwt', {session: false}), (req, res)=>{
    const errors = {};
    ProfileModel.findOne({user: req.user.id})
        .then(profile=>{
            if(!profile){
                errors.noprofile = 'There is no profile for this user';
                return res.status(404).json(errors)
            }
            res.json(profile)
        })
        .catch(err=>res.status(404).json(err))
});


// @route   Post api/profile
// @desc    Get current users profile
// @access  Privet
router.post('/',
    passport.authenticate('jwt', {session: false}),
    (req, res)=>{
        //get fields
        const profileFields = {};
        profileFields.user = req.user.id;
        if(req.body.handle) profileFields.handle = req.body.handle;
        if(req.body.handle) profileFields.handle = req.body.handle;
        if(req.body.handle) profileFields.handle = req.body.handle;
        if(req.body.handle) profileFields.handle = req.body.handle;
        if(req.body.handle) profileFields.handle = req.body.handle;
        if(req.body.handle) profileFields.handle = req.body.handle;
        if(req.body.handle) profileFields.handle = req.body.handle;
        if(req.body.handle) profileFields.handle = req.body.handle;
        if(req.body.handle) profileFields.handle = req.body.handle;
        if(req.body.handle) profileFields.handle = req.body.handle;
        if(req.body.handle) profileFields.handle = req.body.handle;


        const errors = {};
        ProfileModel.findOne({user: req.user.id})
            .then(profile=>{
                if(!profile){
                    errors.noprofile = 'There is no profile for this user';
                    return res.status(404).json(errors)
                }
                res.json(profile)
            })
            .catch(err=>res.status(404).json(err))
    });

export default router;