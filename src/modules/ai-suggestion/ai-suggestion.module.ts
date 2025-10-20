import { Module } from '@nestjs/common';
import { AiSuggestionService } from './ai-suggestion.service';
import { AiSuggestionController } from './ai-suggestion.controller';

@Module({
  providers: [AiSuggestionService],
  controllers: [AiSuggestionController]
})
export class AiSuggestionModule {}
