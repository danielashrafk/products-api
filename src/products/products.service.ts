import { Injectable } from "@nestjs/common";
import { Product } from "./product.model";

const { v1: uuidv1 } = require("uuid");

@Injectable()
export class ProductsService {
  private products: Product[] = [];

  addProduct(title: string, description: string, price: number) {
    const prodId = uuidv1();
    const newProduct = new Product(prodId, title, description, price);
    this.products.push(newProduct);
    return prodId;
  }

  getProducts() {
    return [...this.products];
  }

  getProduct(prodId: string) {}
}
    