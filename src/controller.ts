import { Request, Response } from "express";
import log from "./logger";
import { getCustomer } from "./service/customer";
import { getAvailabilitiesForCustomer } from "./service/product-availability";
import {
  getProductByProductCode,
  getGenerallyAvailableProducts,
} from "./service/product";
import { isEmpty, uniqBy, find } from "lodash";

async function getProductsForCustomer(
  req: Request,
  res: Response,
): Promise<any> {
  try {
    const customerId: string = req.body.customerId;
    const isBusinessCustomer: string = req.body.isBusinessCustomer;

    log.info(
      `getProductsForCustomer(customerId="${customerId}",isBusinessCustomer="${isBusinessCustomer}")`,
    );

    const customer = await getCustomer(customerId);
    const generallyAvailableProducts = await getGenerallyAvailableProducts();

    let products = generallyAvailableProducts;
    let isExistingCustomer = false;

    if (customer !== undefined) {
      const availableProductsForCustomer = await getAvailabilitiesForCustomer(
        customer,
      );
      isExistingCustomer = true;

      if (!isEmpty(availableProductsForCustomer)) {
        for (const availableProduct of availableProductsForCustomer) {
          const product = await getProductByProductCode(availableProduct);
          if (product !== undefined) {
            products.push(product);
          }
        }
      }
    }

    products = uniqBy(products, (product) => product.productCode);

    const formatedProducts = [];

    for (const product of products) {
      let price = product.prices;

      if (Array.isArray(product.prices)) {
        price = find(product.prices, (price) => {
          return price.isExistingCustomer === isExistingCustomer;
        });
      }

      formatedProducts.push({
        productCode: product.productCode,
        productCateogryCode: product.productCategoryCode,
        productName: product.productName,
        price: price.bruttoPrice,
      });
    }
    return res.send(formatedProducts);
  } catch (e: any) {
    return res.status(500).json({
      status: false,
      error: e,
    });
  }
}

export { getProductsForCustomer };
