import { promises as fs } from "fs";
import path from "path";
import { find, isEmpty } from "lodash";
import Product from "../model/product";

async function getProducts(): Promise<Product[]> {
  const filepath = path.resolve(
    __dirname,
    "../../data/products-service-a.json",
  );
  const data = await fs.readFile(filepath, "utf8");
  return JSON.parse(data).products;
}

async function getProductByProductCode(
  productCode: string,
): Promise<Product | undefined> {
  const products = await getProducts();

  if (isEmpty(products)) {
    return undefined;
  }

  return find(products, (product: Product) => {
    return product.productCode === productCode;
  });
}

async function getGenerallyAvailableProducts(): Promise<Product[]> {
  const products = await getProducts();
  return products.filter((product) => product.generallyAvailable);
}

export { getProductByProductCode, getGenerallyAvailableProducts };
