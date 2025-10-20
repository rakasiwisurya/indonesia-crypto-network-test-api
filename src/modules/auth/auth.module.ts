import { Module } from "@nestjs/common";
import { SupabaseService } from "src/services/supabase.service";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";

@Module({
  controllers: [AuthController],
  providers: [AuthService, SupabaseService],
})
export class AuthModule {}
