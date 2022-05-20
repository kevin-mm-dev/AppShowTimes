import {Schema, model} from "mongoose";
const movieSchema=new Schema({
    title: {
        type: String,
        required: true,
        trim: true,
    },
    description: {
        type: String,
        required: true,
        trim: true,
    },
    imgPath: {
        type: String,
        required: true,
    },
    done: {
        type: Boolean,
        default:false
    }
},
{
    versionKey:false,
}
)

export default model("Movie",movieSchema)
