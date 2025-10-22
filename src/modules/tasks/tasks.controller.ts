import { Body, Controller, Delete, Get, Param, Post, Put, Req, UseGuards } from "@nestjs/common";
import { AuthGuard } from "src/guards/auth.guard";
import type { TRequest } from "src/types/request.type";
import { CreateTaskDto } from "./dto/create-task.dto";
import { UpdateTaskDto } from "./dto/update-task.dto";
import { TasksService } from "./tasks.service";

@Controller("tasks")
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @UseGuards(AuthGuard)
  @Post()
  create(@Body() createTaskDto: CreateTaskDto, @Req() req: TRequest) {
    return this.tasksService.create(createTaskDto, req.user);
  }

  @UseGuards(AuthGuard)
  @Get()
  findAll(@Req() req: TRequest) {
    return this.tasksService.findAll(req.user);
  }

  @Get("summaries")
  findSummaries() {
    return this.tasksService.findSummaries();
  }

  @UseGuards(AuthGuard)
  @Get(":id")
  findOne(@Param("id") id: string, @Req() req: TRequest) {
    return this.tasksService.findOne(+id, req.user);
  }

  @UseGuards(AuthGuard)
  @Put(":id")
  update(@Param("id") id: string, @Body() updateTaskDto: UpdateTaskDto, @Req() req: TRequest) {
    return this.tasksService.update(+id, updateTaskDto, req.user);
  }

  @UseGuards(AuthGuard)
  @Delete(":id")
  remove(@Param("id") id: string, @Req() req: TRequest) {
    return this.tasksService.remove(+id, req.user);
  }
}
