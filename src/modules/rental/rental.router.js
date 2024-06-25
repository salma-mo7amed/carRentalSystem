// import modules:
import { Router } from "express";
import { addRental, deleteRental, getAllRentals, getRentalWithCustomers, getSpecificRental, updateRental } from "./rental.controller.js";
// create router:
const rentalRouter = Router();
// add rental:
rentalRouter.post('/', addRental);
// get rental with customers:
rentalRouter.get('/rentalCustomers', getRentalWithCustomers)
// get a specific rental:
rentalRouter.get('/:rentalId', getSpecificRental);
// get all rentals:
rentalRouter.get('/', getAllRentals);
// update rental:
rentalRouter.put('/:rentalId',updateRental);
// delete rental:
rentalRouter.delete("/:rentalId", deleteRental);

// export:
export default rentalRouter;
