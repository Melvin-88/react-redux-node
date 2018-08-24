import mongoose from 'mongoose';
const Schema = mongoose.Schema;

//Create Schema
const ProfileSchema = new Schema({
    user:{
        type: Schema.Types.ObjectId,
        ref: 'user'
    },
    handle:{
        type: String,
        require: true,
        max: 40
    },
    company:{
        type: String
    },
    website:{
        type: String
    },
    location:{
        type: String
    },
    status:{
        type: String,
        require: true
    },
    skills:{
        type: [String],
        require: true
    },
    bio:{
        type: String
    },
    gitHubUserName:{
        type: String
    },
    experience:[
        {
            title:{
                type: String,
                require: true
            },
            company:{
                type: String,
                require: true
            },
            location:{
                type: String
            },
            from:{
                type: Date,
                require: true
            },
            to:{
                type: Date,
                require: true
            },
            current:{
                type: Boolean,
                default: false
            },
            description:{
                type: String
            },
        }
    ],
    date: {
        type: Date,
        default: Date.now
    }
});

export default mongoose.model('profile', ProfileSchema)