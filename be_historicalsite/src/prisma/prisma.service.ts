import { Injectable, OnModuleInit, OnModuleDestroy, Logger } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit, OnModuleDestroy {
  private readonly logger = new Logger(PrismaService.name);
  private readonly MAX_RETRIES = 5;
  private readonly RETRY_DELAY_MS = 3000;

  constructor() {
    super({
      log: ['error', 'warn'],
      errorFormat: 'pretty',
    });
  }

  async onModuleInit() {
    await this.connectWithRetry();
  }

  private async connectWithRetry(retryCount = 0): Promise<void> {
    try {
      this.logger.log('Attempting to connect to database...');
      await this.$connect();
      this.logger.log('Successfully connected to database');
    } catch (error) {
      if (retryCount < this.MAX_RETRIES) {
        this.logger.warn(
          `Failed to connect to database. Retrying in ${this.RETRY_DELAY_MS / 1000} seconds... (Attempt ${retryCount + 1}/${this.MAX_RETRIES})`,
        );
        this.logger.warn(`Error details: ${error.message}`);
        
        // Wait before retrying
        await new Promise(resolve => setTimeout(resolve, this.RETRY_DELAY_MS));
        
        // Retry connection
        return this.connectWithRetry(retryCount + 1);
      } else {
        this.logger.error(`Failed to connect to database after ${this.MAX_RETRIES} attempts`);
        this.logger.error(`Error details: ${error.message}`);
        throw error;
      }
    }
  }

  async onModuleDestroy() {
    this.logger.log('Disconnecting from database');
    await this.$disconnect();
  }
}
