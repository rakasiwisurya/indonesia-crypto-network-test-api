import { Injectable } from "@nestjs/common";
import { createClient, SupabaseClient } from "@supabase/supabase-js";

@Injectable()
export class SupabaseService {
  private readonly supabase: SupabaseClient;

  constructor() {
    const url = process.env.SUPABASE_URL;
    const anonKey = process.env.SUPABASE_ANON_KEY; //unused for conditional role key
    const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

    if (!url || !anonKey || !serviceRoleKey) {
      throw new Error("Missing Supabase configuration values");
    }

    this.supabase = createClient(url, serviceRoleKey);
  }

  get client(): SupabaseClient {
    return this.supabase;
  }
}
