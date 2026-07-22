import { Controller, Get, Post, Body, Param, Put, Delete, Query } from '@nestjs/common';
import { FaqService } from './faq.service';
import { CreateFaqDto, UpdateFaqDto } from './dtos/faq.dto';
import { FaqCategory } from './entities/faq.entity';

@Controller('faq')
export class FaqController {
  constructor(private faqService: FaqService) {}

  @Get()
  async getFaqs(@Query('category') category?: FaqCategory, @Query('page') page: number = 1) {
    return this.faqService.findAll(category, page);
  }

  @Get('search')
  async searchFaqs(@Query('q') query: string, @Query('page') page: number = 1) {
    if (!query) {
      return this.faqService.findAll(undefined, page);
    }
    return this.faqService.search(query, page);
  }

  @Get('popular')
  async getPopularFaqs(@Query('limit') limit: number = 10) {
    return this.faqService.getPopularFaqs(limit);
  }

  @Get('helpful')
  async getMostHelpfulFaqs(@Query('limit') limit: number = 10) {
    return this.faqService.getMostHelpfulFaqs(limit);
  }

  @Get(':id')
  async getFaq(@Param('id') id: string) {
    await this.faqService.incrementViewCount(id);
    return this.faqService.findById(id);
  }

  @Post()
  async createFaq(@Body() createFaqDto: CreateFaqDto) {
    return this.faqService.create(createFaqDto);
  }

  @Put(':id')
  async updateFaq(@Param('id') id: string, @Body() updateFaqDto: UpdateFaqDto) {
    return this.faqService.update(id, updateFaqDto);
  }

  @Delete(':id')
  async deleteFaq(@Param('id') id: string) {
    return this.faqService.delete(id);
  }

  @Post(':id/helpful')
  async markAsHelpful(@Param('id') id: string) {
    await this.faqService.markAsHelpful(id);
    return { success: true, message: 'Marked as helpful' };
  }

  @Post(':id/unhelpful')
  async markAsUnhelpful(@Param('id') id: string) {
    await this.faqService.markAsUnhelpful(id);
    return { success: true, message: 'Marked as unhelpful' };
  }
}
