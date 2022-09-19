import ProductPrice from "product-price";

interface Product {
  productCode: string;
  productCategoryCode: string;
  productName: string;
  generallyAvailable: boolean;
  prices: ProductPrice[] | ProductPrice;
}

export default Product;
