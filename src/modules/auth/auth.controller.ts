import { Body, Controller, Get, Post, UseGuards } from "@nestjs/common";
import { AuthGuard } from "src/guards/auth.guard";
import { AuthService } from "./auth.service";
import { LoginDto } from "./dto/login.dto";
import { RegisterDto } from "./dto/register.dto";

@Controller("auth")
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post("register")
  async register(@Body() body: RegisterDto) {
    return await this.authService.register(body);
  }

  @Post("login")
  async login(@Body() body: LoginDto) {
    return await this.authService.login(body);
  }

  @UseGuards(AuthGuard)
  @Get("users")
  async getUsers() {
    return await this.authService.getUsers();
  }
}
