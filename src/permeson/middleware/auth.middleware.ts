import { Injectable, Module, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';
import * as jwt from 'jsonwebtoken';
import __SharingModel from '../__sharing/__sharing.model';

@Injectable()
@Module({
  providers: [AuthMiddleware],
  exports: [AuthMiddleware],
})
export class AuthMiddleware implements NestMiddleware {
  async use(req: Request, res: Response, next: NextFunction) {
    const bearerToken = req.headers.authorization ?? 'Bearer ';
    const token = bearerToken.split(' ')[1];

    if (!token) {
      return res.status(401).json({ message: 'Token must be provided' });
    }

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET ?? 'rapida_x');
      const { userId, ownerId } = decoded;
      req['userId'] = userId;
      req['ownerId'] = ownerId;

      if (userId === ownerId) return next();

      const sharing = await __SharingModel.findOne({ collaboratorId: userId, ownerId });
      if (!sharing) throw new Error('User does not have permission');

      if (sharing.permission === 'edit') return next();
      if ((sharing.permission === 'read') && (req.method === 'GET')) return next();

      throw new Error('User does not have permission');
    } catch (error) {
      return res.status(401).json({ message: 'Invalid token' });
    }
  }
}
