import { BadRequestException, Injectable } from "@nestjs/common";
import { SupabaseService } from "src/services/supabase.service";
import { TResponse } from "src/types/response.type";
import { LoginDto } from "./dto/login.dto";
import { RegisterDto } from "./dto/register.dto";
import { Login } from "./entities/login.entity";

@Injectable()
export class AuthService {
  constructor(private supabase: SupabaseService) {}

  async register(payload: RegisterDto): Promise<TResponse<null>> {
    const { error } = await this.supabase.client.auth.signUp({
      email: payload.email,
      password: payload.password,
      options: { data: { display_name: payload.name } },
    });

    if (error) throw new BadRequestException(error.message);

    return {
      message: "Success add new data",
      data: null,
    };
  }

  async login(payload: LoginDto): Promise<TResponse<Login>> {
    const { data, error } = await this.supabase.client.auth.signInWithPassword({
      email: payload.email,
      password: payload.password,
    });

    if (error) throw new BadRequestException(error.message);

    return {
      message: "Login success",
      data: {
        name: data.user.user_metadata?.display_name,
        email: data.user.email,
        token: data.session.access_token,
      },
    };
  }

  async getUsers(): Promise<TResponse<string[]>> {
    const { data, error } = await this.supabase.client.auth.admin.listUsers();

    if (error) throw new BadRequestException(error.message);

    return { data: data.users.map(user => user.email!) };
  }
}
