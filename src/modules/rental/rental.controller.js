import { ObjectId } from "mongodb";
import { db } from "../../../db/connection.js";

// add rental:
export const addRental = async (req, res, next) => {
  // get data from body
  const { carId, customerId, rentalDate, returnDate } = req.body;
  // console.log({carId, customerId, rentalDate, returnDate});
  // prepare rental:
  const rental = {
    carId: new ObjectId(carId),
    customerId: new ObjectId(customerId),
    rentalDate,
    returnDate,
  };
  // add to db:
  await db.collection("rental").insertOne(rental);
  // response:
  res.status(201).json({ success: true, message: "rental added successfully" });
};
// get a specific rental:
export const getSpecificRental = async (req, res, next) => {
  const rental = await db
    .collection("rental")
    .find({ _id: new ObjectId(req.params.rentalId) })
    .toArray();
  return res.status(200).json({ success: true, data: rental });
};
// get all rentals:
export const getAllRentals = async (req, res, next) => {
  const rentals = await db.collection("rental").find().toArray();
  return res.status(200).json({ success: true, data: rentals });
};
// update rental:
export const updateRental = async (req, res, next) => {
  const updatedRental = await db
    .collection("rental")
    .updateOne({ _id: new ObjectId(req.params.rentalId) }, { $set: req.body });
  return res
    .status(200)
    .json({
      success: true,
      message: "rental updated successfully",
      data: updatedRental,
    });
};

// delete rental:
export const deleteRental = async (req, res, next) => {
  await db
    .collection("rental")
    .deleteOne({ _id: new ObjectId(req.params.rentalId) });
  return res
    .status(200)
    .json({ success: true, message: "rental deleted successfully" });
};
// get all rentals with customers and cars:
export const getRentalWithCustomers = async (req, res, next) => {
  const rentalWithCustomers = await db
    .collection("rental")
    .aggregate([
      {
        $lookup: {
          from: "customers",
          localField: "customerId",
          foreignField: "_id",
          as: "customerData",
        },
      },
      {
        $unwind: "$customerData",
      },
      {
        $lookup: {
          from: "cars",
          localField: "carId",
          foreignField: "_id",
          as: "carData",
        },
      },
      {
        $unwind: "$carData",
      },
    ]).toArray();
  return res.status(200).json({ success: true, data: rentalWithCustomers });
};

// *************************  end ************************ //