import { Injectable, NotFoundException } from "@nestjs/common";
import { Product } from "./product.model";

const { v1: uuidv1 } = require("uuid");

@Injectable()
export class ProductsService {
  private products: Product[] = [];

  findProduct(prodId: string): [Product, number] {
    const prodIndex = this.products.findIndex((prod) => prod.id === prodId);
    const product = this.products[prodIndex];
    if (!product) throw new NotFoundException("Could not find product");
    return [product, prodIndex];
  }

  addProduct(title: string, description: string, price: number) {
    const prodId = uuidv1();
    const newProduct = new Product(prodId, title, description, price);
    this.products.push(newProduct);
    return prodId;
  }

  getProducts() {
    return [...this.products];
  }

  getProduct(prodId: string): Product {
    const [product, prodIndex] = this.findProduct(prodId);
    return { ...product };
  }

  updateProduct(prodId: string, title: string, desc: string, price: number) {
    const [product, prodIndex] = this.findProduct(prodId);

    if (title) product.title = title;
    if (desc) product.description = desc;
    if (price) product.price = price;

    this.products[prodId] = { ...product };

    return { ...this.products[prodId] };
  }

  deleteProduct(prodId: string) {
    const [product, prodIndex] = this.findProduct(prodId);
    this.products.splice(prodIndex, 1);
    return prodId;
  }
}
