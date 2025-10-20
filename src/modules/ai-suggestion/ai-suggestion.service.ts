import { Injectable } from "@nestjs/common";
import OpenAI from "openai";
import { TResponse } from "src/types/response.type";

@Injectable()
export class AiSuggestionService {
  async generateAISuggestion(): Promise<TResponse<Record<string, any>>> {
    const openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    });

    const taskNameResponse = await openai.responses.create({
      model: "gpt-4o-mini",
      input: `Generate Task Suggestion Name max 30 character without symbol in one line text`,
      store: true,
    });

    const taskDescResponse = await openai.responses.create({
      model: "gpt-4o-mini",
      input: `Generate Task Suggestion Description of ${taskNameResponse.output_text} in one line long text`,
      store: true,
    });

    return {
      data: {
        task_name: taskNameResponse.output_text.replace(/"/g, ""),
        task_desc: taskDescResponse.output_text.replace(/"/g, ""),
      },
    };
  }
}
