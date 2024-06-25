// import modules:
import { Router} from 'express';
import { addCar, deleteCar, getAllAvailableCars, getAllCars,  getAllRentedCars,  getAvailableCar,  getCarModel,  getRentedCar,  getSpecificCar, updateCar } from './car.controller.js';
// create router:
const carRouter = Router();
// add a car
carRouter.post('/', addCar);
// get car model
carRouter.get("/car?",getCarModel)
// get rented cars
carRouter.get('/rented_cars', getAllRentedCars)
// get available cars
carRouter.get('/available_cars', getAllAvailableCars)
// get available car of a specific model
carRouter.get('/available/:thisId', getAvailableCar)
// GET Rented car of a specific model:
carRouter.get('/rented/:myId', getRentedCar)

// get a specific car:
carRouter.get('/:carId', getSpecificCar);
// get all cars:
carRouter.get('/', getAllCars);
// update car:
carRouter.put("/:carId", updateCar);
// delete car:
carRouter.delete("/:carId", deleteCar);


// export
export default carRouter