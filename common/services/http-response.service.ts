import { Injectable } from '@nestjs/common';
  import { LoggerService } from './logger.service';

  export interface IApiResponse<T = any> {
    statusCode: number;
    data?: T | null;
    message?: string;
  }

  @Injectable()
  export class ResponseService {
    logger = new LoggerService();

    private createResponse<T>(statusCode: number, data?: T, message?: string): IApiResponse<T> {
      return {
        statusCode,
        data: data || null,
        message: message || '',
      };
    }

    ok<T>(data?: T, message?: string, endpoint?: string): IApiResponse<T> {
      this.logger.log(`[${endpoint}] ${message}`);
      return this.createResponse(200, data, message);
    }

    created<T>(data?: T, message?: string, endpoint?: string): IApiResponse<T> {
      this.logger.log(`[${endpoint}] ${message}`);
      return this.createResponse(201, data, message);
    }

    badRequest<T>(data?: T, message?: string, endpoint?: string): IApiResponse<T> {
      this.logger.error(`[${endpoint}] ${message}`);
      return this.createResponse(400, data, message);
    }

    unauthorized<T>(data?: T, message?: string, endpoint?: string): IApiResponse<T> {
      this.logger.error(`[${endpoint}] ${message}`);
      return this.createResponse(401, data, message);
    }

    internalServerError<T>(data?: T, message?: string, endpoint?: string): IApiResponse<T> {
      this.logger.fatal(`[${endpoint}] ${message}`);
      return this.createResponse(500, data, message);
    }
  }
  