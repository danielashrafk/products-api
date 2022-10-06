import { Body, Controller, Get, Param, Post } from "@nestjs/common";
import { Product } from "./product.model";
import { ProductsService } from "./products.service";

@Controller("/products")
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}
  @Post()
  addProduct(
    @Body("title") prodTitle: string,
    @Body("description") prodDesc: string,
    @Body("price") prodPrice: number
  ): { id: string } {
    const generatedId = this.productsService.addProduct(
      prodTitle,
      prodDesc,
      prodPrice
    );

    return { id: generatedId };
  }

  @Get()
  getProducts(): { products: Product[] } {
    return { products: this.productsService.getProducts() };
  }

  @Get(":id")
  getProduct(@Param("id") prodId: string): { product: Product } {
    return { product: this.productsService.getProduct() };
  }
}
