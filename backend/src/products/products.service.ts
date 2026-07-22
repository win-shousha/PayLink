import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product, ProductCategory } from './entities/product.entity';
import { ProductVariant } from './entities/product-variant.entity';
import { CreateProductDto, UpdateProductDto, CreateProductVariantDto } from './dtos/product.dto';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private productsRepository: Repository<Product>,
    @InjectRepository(ProductVariant)
    private variantsRepository: Repository<ProductVariant>,
  ) {}

  async create(createProductDto: CreateProductDto): Promise<Product> {
    const product = this.productsRepository.create(createProductDto);
    return this.productsRepository.save(product);
  }

  async findAll(category?: ProductCategory, page: number = 1, limit: number = 20) {
    const query = this.productsRepository.createQueryBuilder('product');
    
    if (category) {
      query.where('product.category = :category', { category });
    }
    
    query.where('product.status = :status', { status: 'active' });
    
    const [products, total] = await query
      .skip((page - 1) * limit)
      .take(limit)
      .getManyAndCount();

    return { products, total, page, pages: Math.ceil(total / limit) };
  }

  async findById(id: string): Promise<Product> {
    const product = await this.productsRepository.findOne({ where: { id } });
    if (!product) {
      throw new NotFoundException('Product not found');
    }
    return product;
  }

  async update(id: string, updateProductDto: UpdateProductDto): Promise<Product> {
    await this.productsRepository.update(id, updateProductDto);
    return this.findById(id);
  }

  async search(query: string, page: number = 1, limit: number = 20) {
    const products = await this.productsRepository
      .createQueryBuilder('product')
      .where('product.name ILIKE :query OR product.description ILIKE :query', { query: `%${query}%` })
      .andWhere('product.status = :status', { status: 'active' })
      .skip((page - 1) * limit)
      .take(limit)
      .getManyAndCount();

    return { products: products[0], total: products[1] };
  }

  async createVariant(productId: string, createVariantDto: CreateProductVariantDto): Promise<ProductVariant> {
    const product = await this.findById(productId);
    const variant = this.variantsRepository.create({
      ...createVariantDto,
      product,
    });
    return this.variantsRepository.save(variant);
  }

  async getVariants(productId: string): Promise<ProductVariant[]> {
    await this.findById(productId);
    return this.variantsRepository.find({
      where: { product: { id: productId }, isActive: true },
    });
  }
}
