import { ObjectId } from "mongodb";
import { db } from "../../../db/connection.js";
import bcrypt from 'bcrypt';


// sign up:
 export const signUp = async (req, res, next)=>{
 // get data from request:
 const { name, email, password, phone, owner } = req.body;
 console.log({name, email, password, phone});
// check existence:
 const isEmail = await db.collection('customers').findOne({email});
 if(isEmail){
    return res.status(409).json({message:'customer already exists', success:false})
 }
 const hashPassword = bcrypt.hashSync('password', 8);
//  prepare customer:
const customer={
    name, 
    email,
    password:hashPassword, 
    phone, 
    owner
}
// add to db
 db.collection('customers').insertOne(customer);
// send response
return res.status(201).json({message:'customer created successfully', success:true})

}
//  login
export const signIn = async(req, res, next)=>{
    // get data from request
    const {email, password} = req.body;
    // check existence
     const isUserExist = await db.collection("customers").findOne({ email });
     if (!isUserExist || !bcrypt.compareSync('password', isUserExist.password)) {
       return res.json({ message: "invalid credential" });
     }
     return res.status(200).json({ message: `welcome to your profile` });

}
// get all customers:
export const getAllCustomers = async (req, res, next)=>{
const customers = await db.collection('customers').find().toArray()
 return res.status(200).json({ success:true,data:customers});
}
// get a specific customer:
export const getSpecificUser = async (req, res, next)=>{
    const customer = await db.collection("customers").find({_id:new ObjectId(req.params.customerId)}).toArray()
    res.status(200).json({success:true, data:customer})
}
// update a customer(owner):
export const updateCustomer= async (req, res, next)=>{
 const updatedCustomer = await db.collection("customers").updateOne(   { _id: new ObjectId(req.params.customerId)}, { $set: req.body }  );
 return res.status(200).json({success:true, message:'customer updated successfully',data:updatedCustomer})
}
// delete a customer (owner):
export const deleteCustomer = async (req, res, next) => {
  await db .collection("customers").deleteOne(  { _id: new ObjectId(req.params.customerId)});
  return res.status(200).json({ success: true, message: "customer deleted successfully" });
};

//  ********************* end ****************************** //