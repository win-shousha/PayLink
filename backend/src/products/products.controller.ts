import { Controller, Get, Post, Body, Param, Put, Query, UseGuards } from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto, UpdateProductDto, CreateProductVariantDto } from './dtos/product.dto';
import { ProductCategory } from './entities/product.entity';

@Controller('products')
export class ProductsController {
  constructor(private productsService: ProductsService) {}

  @Get()
  async getProducts(
    @Query('category') category?: ProductCategory,
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 20,
  ) {
    return this.productsService.findAll(category, page, limit);
  }

  @Get('search')
  async search(@Query('q') query: string, @Query('page') page: number = 1) {
    return this.productsService.search(query, page);
  }

  @Get(':id')
  async getProduct(@Param('id') id: string) {
    return this.productsService.findById(id);
  }

  @Get(':id/variants')
  async getVariants(@Param('id') id: string) {
    return this.productsService.getVariants(id);
  }

  @Post()
  async createProduct(@Body() createProductDto: CreateProductDto) {
    return this.productsService.create(createProductDto);
  }

  @Put(':id')
  async updateProduct(@Param('id') id: string, @Body() updateProductDto: UpdateProductDto) {
    return this.productsService.update(id, updateProductDto);
  }

  @Post(':id/variants')
  async createVariant(@Param('id') id: string, @Body() createVariantDto: CreateProductVariantDto) {
    return this.productsService.createVariant(id, createVariantDto);
  }
}
