import PassportJwt from 'passport-jwt';
import UserModel from '../models/User';
import {key} from './keys';


const JwtStrategy   = PassportJwt.Strategy;
const ExtractJwt    = PassportJwt.ExtractJwt;

const opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = key.secretOrKey;

module.exports = passport =>{
    passport.use(new JwtStrategy(opts, (jwt_payload, done)=> {
        UserModel.findById(jwt_payload.id)
            .then(user=>{
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