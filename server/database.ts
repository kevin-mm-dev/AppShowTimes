import {connect} from 'mongoose';

export const startConnection = async ()=>{
    try {
        const MONGODB_UIR=`mongodb+srv://kevinAdmin:kevinAdmin@cluster0.anreo.mongodb.net/showtimes`;
        // const db=await connect('mongodb://localhost/showtimes')
        const db=await connect(MONGODB_UIR)
        console.log(db.connection.name);
    } catch (error) {
        console.log(error);
    }
}