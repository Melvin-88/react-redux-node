import validator from 'validator';
import {
    isEmpty
} from './is-empty';

export const validateLoginInput = data =>{
    let errors = {};

    data.email = !isEmpty(data.email) ? data.email : '';
    data.password = !isEmpty(data.password) ? data.password : '';

    if(!validator.isEmail(data.email)){
        errors.email = 'Email is invalid';
    }

    if(!validator.isLength(data.password, {min:6, max: 30})){
        errors.password = 'Password mast be at least 6 characters';
    }

    if(validator.isEmpty(data.password)){
        errors.password = 'Password field is required';
    }

    if(validator.isEmpty(data.email)){
        errors.email = 'Email field is required';
    }

    return{
        errors,
        isValid: isEmpty(errors)
    }
};