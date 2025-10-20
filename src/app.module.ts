import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { SupabaseModule } from "./common/supabase/supabase.module";
import { AuthModule } from "./modules/auth/auth.module";
import { TasksModule } from "./modules/tasks/tasks.module";
import { MailModule } from './common/mail/mail.module';
import { AiSuggestionModule } from './modules/ai-suggestion/ai-suggestion.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    SupabaseModule,
    AuthModule,
    TasksModule,
    MailModule,
    AiSuggestionModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
