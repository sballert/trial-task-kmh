import { promises as fs } from "fs";
import path from "path";
import { find, isEmpty } from "lodash";
import Customer from "../model/customer";

async function getCustomers(): Promise<Customer[]> {
  const filepath = path.resolve(__dirname, "../../data/customer-database.json");
  const data = await fs.readFile(filepath, "utf8");
  return JSON.parse(data);
}

async function getCustomer(id: string): Promise<Customer | undefined> {
  const customers = await getCustomers();

  if (isEmpty(customers)) {
    return undefined;
  }

  return find(customers, (customer: Customer) => {
    return customer.customerId === id;
  });
}

export { getCustomer };
