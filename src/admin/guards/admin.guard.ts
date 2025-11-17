import {
  Injectable,
  CanActivate,
  ExecutionContext,
  ForbiddenException,
} from '@nestjs/common';
import type { User } from '@prisma/client';

@Injectable()
export class AdminGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest<{ user: User }>();
    const user = request.user;

    // Guard ini berjalan SETELAH JwtAuthGuard (global),
    // jadi request.user dijamin ada.
    if (user && user.role === 'ADMIN') {
      return true;
    }

    throw new ForbiddenException('Akses ditolak. Hanya untuk administrator.');
  }
}
