import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { createClient, SupabaseClient } from "@supabase/supabase-js";

@Injectable()
export class SupabaseService {
  private readonly supabase: SupabaseClient;

  constructor(private readonly config: ConfigService) {
    const url = this.config.get<string>("SUPABASE_URL");
    const anonKey = this.config.get<string>("SUPABASE_ANON_KEY"); //unused for conditional role key
    const serviceRoleKey = this.config.get<string>("SUPABASE_SERVICE_ROLE_KEY");

    if (!url || !anonKey || !serviceRoleKey) {
      throw new Error("Missing Supabase configuration values");
    }

    this.supabase = createClient(url, serviceRoleKey);
  }

  get client(): SupabaseClient {
    return this.supabase;
  }
}
