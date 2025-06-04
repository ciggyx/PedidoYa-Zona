import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import axios from 'axios';
import { Reflector } from '@nestjs/core';
import { Permissions } from './decorators/permissions.decorator';
import { Request } from 'express';
@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request: Request = context.switchToHttp().getRequest();
    const authHeader = request.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      throw new UnauthorizedException('Token no proporcionado');
    }

    const token = authHeader.replace('Bearer ', '');
    const permissions = this.reflector.get(Permissions, context.getHandler());

    try {
      const response = await axios.post(
        'http://localhost:3001/auth/validate-permissions',
        {
          requiredPermissions: permissions,
        },
        {
          headers: {
            Authorization: token,
          },
        },
      );
      request['user'] = response.data.user;

      return true;
    } catch (error) {
      throw new UnauthorizedException(
        error.response?.data?.message || 'No autorizado',
      );
    }
  }
}
