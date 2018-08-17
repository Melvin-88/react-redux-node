import passportjwt from 'passport-jwt';
import mongoose from 'mongoose';
import {key} from './keys';


const Jwtstrategy   = passportjwt.Strategy;
const ExtractJwt    = passportjwt.ExtractJwt;
const UserModel     = mongoose.user;

const opts = {};
opts.jwtFormRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = key.secretOrKey;

export default (passport)=>{
    passport.use(
        new Jwtstrategy(opts, (jwt_payload, done)=>{
            console.log(jwt_payload)
        })
    )
}