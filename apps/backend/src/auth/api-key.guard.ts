import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';

@Injectable()
export class ApiKeyGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    const headerKey: string | undefined = request.headers['x-api-key'];
    const expected = process.env.API_KEY;

    if (!expected) {
      // If no API_KEY is set, deny for safety.
      throw new UnauthorizedException('API key not configured');
    }

    if (!headerKey || headerKey !== expected) {
      throw new UnauthorizedException('Invalid API key');
    }

    return true;
  }
}