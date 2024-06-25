// import modules:
import {Router} from 'express';
import { deleteCustomer, getAllCustomers, getSpecificUser, signIn, signUp, updateCustomer } from './customer.controller.js';
// create Router:
const customerRouter = Router();
// signup:
customerRouter.post("/signup", signUp);
// login:
customerRouter.post("/login", signIn);
// get all customers:
customerRouter.get("/", getAllCustomers);
// get a specific customer:
customerRouter.get("/:customerId", getSpecificUser);
// update customer
customerRouter.put("/:customerId", updateCustomer);
// delete customer
customerRouter.delete('/:customerId', deleteCustomer)


// export
export default customerRouter