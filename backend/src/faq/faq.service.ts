import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Faq, FaqCategory } from './entities/faq.entity';
import { CreateFaqDto, UpdateFaqDto } from './dtos/faq.dto';

@Injectable()
export class FaqService {
  constructor(
    @InjectRepository(Faq)
    private faqRepository: Repository<Faq>,
  ) {}

  async create(createFaqDto: CreateFaqDto): Promise<Faq> {
    const faq = this.faqRepository.create(createFaqDto);
    return this.faqRepository.save(faq);
  }

  async findAll(category?: FaqCategory, page: number = 1, limit: number = 20) {
    const query = this.faqRepository.createQueryBuilder('faq').where('faq.isActive = true');

    if (category) {
      query.andWhere('faq.category = :category', { category });
    }

    const [faqs, total] = await query
      .orderBy('faq.order', 'ASC')
      .addOrderBy('faq.createdAt', 'DESC')
      .skip((page - 1) * limit)
      .take(limit)
      .getManyAndCount();

    return { faqs, total, page, pages: Math.ceil(total / limit) };
  }

  async findById(id: string): Promise<Faq> {
    const faq = await this.faqRepository.findOne({ where: { id } });
    if (!faq) {
      throw new NotFoundException('FAQ not found');
    }
    return faq;
  }

  async search(query: string, page: number = 1, limit: number = 20) {
    const faqs = await this.faqRepository
      .createQueryBuilder('faq')
      .where('faq.isActive = true')
      .andWhere(
        '(faq.question ILIKE :query OR faq.answer ILIKE :query OR faq.keywords::text ILIKE :query)',
        { query: `%${query}%` },
      )
      .orderBy('faq.order', 'ASC')
      .skip((page - 1) * limit)
      .take(limit)
      .getManyAndCount();

    return { faqs: faqs[0], total: faqs[1], page };
  }

  async update(id: string, updateFaqDto: UpdateFaqDto): Promise<Faq> {
    await this.faqRepository.update(id, updateFaqDto);
    return this.findById(id);
  }

  async delete(id: string): Promise<void> {
    const faq = await this.findById(id);
    await this.faqRepository.remove(faq);
  }

  async incrementViewCount(id: string): Promise<void> {
    await this.faqRepository.increment({ id }, 'viewCount', 1);
  }

  async markAsHelpful(id: string): Promise<void> {
    await this.faqRepository.increment({ id }, 'helpfulCount', 1);
  }

  async markAsUnhelpful(id: string): Promise<void> {
    await this.faqRepository.increment({ id }, 'unhelpfulCount', 1);
  }

  async getPopularFaqs(limit: number = 10) {
    return this.faqRepository
      .createQueryBuilder('faq')
      .where('faq.isActive = true')
      .orderBy('faq.viewCount', 'DESC')
      .limit(limit)
      .getMany();
  }

  async getMostHelpfulFaqs(limit: number = 10) {
    return this.faqRepository
      .createQueryBuilder('faq')
      .where('faq.isActive = true')
      .orderBy('faq.helpfulCount', 'DESC')
      .limit(limit)
      .getMany();
  }
}
