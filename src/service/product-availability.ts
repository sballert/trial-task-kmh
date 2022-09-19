import { promises as fs } from "fs";
import path from "path";
import { find, isEmpty } from "lodash";
import Customer from "../model/customer";

interface ProductAvailability {
  customerId: string;
  availableProducts: [
    {
      productCode: string;
    },
  ];
}

async function getProductAvailabilities(): Promise<ProductAvailability[]> {
  const filepath = path.resolve(
    __dirname,
    "../../data/product-availability-service.json",
  );
  const data = await fs.readFile(filepath, "utf8");
  return JSON.parse(data);
}

async function getAvailabilitiesForCustomer(
  customer: Customer,
): Promise<string[]> {
  const productAvailabilities = await getProductAvailabilities();

  if (isEmpty(productAvailabilities)) {
    return [];
  }

  const productAvailability = find(
    productAvailabilities,
    (productAvailability: ProductAvailability) => {
      return productAvailability.customerId === customer.customerId;
    },
  );

  if (productAvailability === undefined) {
    return [];
  }

  return productAvailability.availableProducts.map(
    (entry) => entry.productCode,
  );
}

export { getAvailabilitiesForCustomer };
