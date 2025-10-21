import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
import { SupabaseService } from "src/common/supabase/supabase.service";
import { TRequest } from "src/types/request.type";

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private supabase: SupabaseService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const authHeader = request.headers.authorization;

    if (!authHeader) throw new UnauthorizedException("Missing Authorization header");

    const token = authHeader.replace("Bearer ", "").trim();

    const { data, error } = await this.supabase.authClient.auth.getUser(token);

    if (error || !data?.user) throw new UnauthorizedException("Invalid or expired token");

    request.user = {
      id: data.user.id,
      name: data.user.user_metadata.display_name,
      email: data.user.email!,
    } as TRequest["user"];

    return true;
  }
}
