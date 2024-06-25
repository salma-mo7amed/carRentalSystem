// import modules:
import {MongoClient} from 'mongodb';
// create connection:
const client = new MongoClient("mongodb://localhost:27017");
// check connection:
const connectDB = ()=>{
    client.connect().then(()=>{
      console.log('db connected successfully');
    }).catch((err)=>{
      console.log('failed to connect to db');
    })
};
// create db:
const db = client.db('carRentalSystem');

// export
export{
    connectDB,
    db
}