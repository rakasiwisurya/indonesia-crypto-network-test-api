import { Injectable } from "@nestjs/common";
import { createClient, SupabaseClient } from "@supabase/supabase-js";

@Injectable()
export class SupabaseService {
  private readonly serviceClient: SupabaseClient;
  private readonly publicClient: SupabaseClient;

  constructor() {
    const url = process.env.SUPABASE_URL!;
    const anonKey = process.env.SUPABASE_ANON_KEY!;
    const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

    this.serviceClient = createClient(url, serviceKey);
    this.publicClient = createClient(url, anonKey);
  }

  get client(): SupabaseClient {
    return this.serviceClient;
  }

  get authClient(): SupabaseClient {
    return this.publicClient;
  }
}
