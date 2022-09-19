import { Request, Response } from "express";
import log from "./logger";
import {
  getCustomer,
  getCustomerByIsBusinessCustomer,
} from "./service/customer";
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
    const isBusinessCustomer: boolean = req.body.isBusinessCustomer;
    const isBusinessCustomerAsString: string = req.body.isBusinessCustomer;

    log.info(
      `getProductsForCustomer(customerId="${customerId}",isBusinessCustomer="${isBusinessCustomerAsString}")`,
    );

    let customer;

    if (customerId !== undefined && customerId !== null) {
      customer = await getCustomer(customerId);
    }

    if (isBusinessCustomer !== undefined) {
      customer = await getCustomerByIsBusinessCustomer(isBusinessCustomer);
    }

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

    if (customer !== undefined) {
      return res.send({
        isExistingCustomer: true,
        customer: {
          customerId: customer.customerId,
          gender: customer.gender,
          givenName: customer.givenName,
          surName: customer.surName,
          birthDate: customer.birthDate,
          isBusinessCustomer: customer.isBusinessCustomer,
        },
        products: formatedProducts,
      });
    }

    return res.send({
      isExistingCustomer: false,
      customer: {
        customerId,
      },
      products: formatedProducts,
    });
  } catch (e: any) {
    return res.status(500).json({
      status: false,
      error: e,
    });
  }
}

export { getProductsForCustomer };
