import PassportJwt from 'passport-jwt';
import mongoose from 'mongoose';
import {key} from './keys';


const JwtStrategy   = PassportJwt.Strategy;
const ExtractJwt    = PassportJwt.ExtractJwt;
const UserModel     = mongoose.user;

const opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = key.secretOrKey;

module.exports = passport =>{
    passport.use(new JwtStrategy(opts, (jwt_payload, done)=> {
        UserModel.findById(jwt_payload.id)
            .then(user=>{
                console.log(user, jwt_payload.id);
                if(user){
                    return done(null, user);
                }
                return done(null, false);
            })
            .catch(err=>{
                console.log(err)
            })
    }));
};