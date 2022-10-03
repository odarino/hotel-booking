import { dbContext } from "config/database-context";
import { CustomersCreateDto } from "./customers.dto";

export const createCustomerService = (customer: CustomersCreateDto) => {
  return new Promise((resolve, reject) => {
    dbContext.customers
      .create({
        first_name: customer.first_name,
        last_name: customer.last_name,
        email: customer.email,
        phone_number: customer.phone_number,
        address: customer.address,
        city: customer.city,
        country: customer.country,
        post_code: customer.post_code,
      })
      .then((value) => {
        resolve(value);
      })
      .catch((err) => {
        reject(err);
      });
  });
};
