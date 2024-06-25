import { ObjectId } from "mongodb";
import { db } from "../../../db/connection.js";


//  add car:
export const addCar = async (req, res, next)=>{
// get data from req
const { name, model, rentalStatus} = req.body;
// prepare car:
const car ={
    name, 
    model,
    rentalStatus
}
// add to db
 await db.collection('cars').insertOne(car);
//  response
return res.status(201).json({success:true, message:'car created successfully'})
}
// get a specific car:
export const getSpecificCar = async (req, res, next) => {
  const car = await db.collection("cars").findOne({ _id: new ObjectId(req.params.carId) });
    return res.status(200).json({ success: true, data: car });
};
// get all cars:
export const getAllCars = async (req, res, next)=>{
    const cars = await db.collection("cars").find().toArray();
    return res.status(200).json({ success: true, data: cars });
};
// update car:
export const updateCar = async (req, res, next) => {
  const updatedCar = await db.collection("cars").updateOne({ _id: new ObjectId(req.params.carId) },  { $set: req.body });
  return res.status(200).json({success: true, message: "car updated successfully",   data: updatedCar, });
};
// delete car:
export const deleteCar = async (req, res, next)=>{
    await db.collection("cars").deleteOne({ _id: new ObjectId(req.params.carId) });
    return res.status(200).json({ success: true, message: "car deleted successfully" });
}
// car model:
export const getCarModel = async(req, res, next)=>{
  // let {model} = req.query
 const thisCar = await db.collection('cars').find({model:{$in:['honda', 'toyota']}}).toArray()
 return res.status(200).json({success:true, data:thisCar})
}
// get available car of a specific model:
export const getAvailableCar = async (req, res, next)=>{
const availableCar = await db.collection('cars').findOne( {rentalStatus:'available', _id:new ObjectId(req.params.thisId)})
res.status(200).json({success:true, data:availableCar})
}
// get rented car of a specific model:
export const getRentedCar = async (req, res, next)=>{
 const rentedCar = await db.collection("cars").findOne({  rentalStatus: "rented", _id: new ObjectId(req.params.myId)});
  res.status(200).json({ success: true, data: rentedCar });
}
// get rented cars:
export const getAllRentedCars = async (req, res, next)=>{
  const rentedCars = await db.collection('cars').find({rentalStatus:"rented"}).toArray()
  res.status(200).json({success:true, data:rentedCars})
}
// get available cars:
export const getAllAvailableCars = async(req, res, next)=>{
  const availableCars = await db.collection("cars").find({ rentalStatus: "available" }).toArray();
  res.status(200).json({ success: true, data: availableCars });
}

//  ******************** end ************************ //