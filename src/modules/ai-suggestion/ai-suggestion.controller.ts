import { Controller, Post, UseGuards } from "@nestjs/common";
import { AiSuggestionService } from "./ai-suggestion.service";
import { AuthGuard } from "src/guards/auth.guard";

@Controller("ai-suggestion")
export class AiSuggestionController {
  constructor(private readonly aiSuggestionService: AiSuggestionService) {}

  @UseGuards(AuthGuard)
  @Post()
  generateAISuggestion() {
    return this.aiSuggestionService.generateAISuggestion();
  }
}
