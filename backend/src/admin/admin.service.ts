import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AdminLog, ActivityType } from './entities/admin-log.entity';
import { Setting, SettingKey } from './entities/setting.entity';
import { User } from '../users/entities/user.entity';

@Injectable()
export class AdminService {
  constructor(
    @InjectRepository(AdminLog)
    private adminLogRepository: Repository<AdminLog>,
    @InjectRepository(Setting)
    private settingRepository: Repository<Setting>,
  ) {}

  // Logs
  async logActivity(user: User | null, type: ActivityType, description?: string, ipAddress?: string, metadata?: any) {
    const log = this.adminLogRepository.create({
      user,
      type,
      description,
      ipAddress,
      metadata,
    });
    return this.adminLogRepository.save(log);
  }

  async getLogs(page: number = 1, limit: number = 50) {
    const [logs, total] = await this.adminLogRepository.findAndCount({
      relations: ['user'],
      order: { createdAt: 'DESC' },
      skip: (page - 1) * limit,
      take: limit,
    });
    return { logs, total, page };
  }

  // Settings
  async getSetting(key: SettingKey | string) {
    return this.settingRepository.findOne({ where: { key } });
  }

  async getAllSettings() {
    return this.settingRepository.find();
  }

  async updateSetting(key: SettingKey | string, value: string) {
    let setting = await this.getSetting(key);
    if (!setting) {
      setting = this.settingRepository.create({ key, value });
    } else {
      setting.value = value;
    }
    return this.settingRepository.save(setting);
  }

  async getCommissionRate() {
    const setting = await this.getSetting(SettingKey.COMMISSION_RATE);
    return setting ? parseFloat(setting.value) : 0.05;
  }

  async getFeeRate() {
    const setting = await this.getSetting(SettingKey.FEE_RATE);
    return setting ? parseFloat(setting.value) : 0.01;
  }
}
