import { BadRequestException, Injectable } from "@nestjs/common";
import dayjs from "dayjs";
import { addNewTaskMail } from "src/common/constants/mail/add-new-task.mail";
import { MailService } from "src/common/mail/mail.service";
import { SupabaseService } from "src/common/supabase/supabase.service";
import { TRequest } from "src/types/request.type";
import { TResponse } from "src/types/response.type";
import { CreateTaskDto } from "./dto/create-task.dto";
import { UpdateTaskDto } from "./dto/update-task.dto";
import { Task } from "./entities/task.entity";

@Injectable()
export class TasksService {
  constructor(
    private supabase: SupabaseService,
    private mail: MailService
  ) {}

  async create(createTaskDto: CreateTaskDto, user: TRequest["user"]): Promise<TResponse<null>> {
    const payload = { ...createTaskDto, user_id: user.id };

    const { error } = await this.supabase.client.from("tasks").insert(payload);

    if (error) throw new BadRequestException(error.message);

    await this.mail.sendMail({
      to: user.email,
      subject: "ICN Test Add New Task",
      html: addNewTaskMail({
        user_name: user.name,
        task_name: createTaskDto.task_name,
        task_desc: createTaskDto.task_desc,
        due_date: dayjs(createTaskDto.due_date).format("DD MMM YYYY"),
        status: createTaskDto.status,
      }),
    });

    return {
      message: "Success add new data",
      data: null,
    };
  }

  async findAll(user: TRequest["user"]): Promise<TResponse<Task[] | null>> {
    const { data, error } = await this.supabase.client
      .from("tasks")
      .select("id, task_name, task_desc, due_date, status, created_at")
      .order("created_at", { ascending: false })
      .eq("user_id", user.id);

    if (error) throw new BadRequestException(error.message);

    return {
      message: "Success get all data",
      data,
    };
  }

  async findOne(id: number, user: TRequest["user"]): Promise<TResponse<Task | null>> {
    const { data, error } = await this.supabase.client
      .from("tasks")
      .select("id, task_name, task_desc, due_date, status, created_at")
      .eq("id", id)
      .eq("user_id", user.id);

    if (error) throw new BadRequestException(error.message);

    return {
      message: "Success get detail data",
      data: data?.[0] ?? null,
    };
  }

  async update(
    id: number,
    updateTaskDto: UpdateTaskDto,
    user: TRequest["user"]
  ): Promise<TResponse<null>> {
    const payload = { ...updateTaskDto, updated_at: new Date() };

    const { error } = await this.supabase.client
      .from("tasks")
      .update(payload)
      .eq("id", id)
      .eq("user_id", user.id);

    if (error) throw new BadRequestException(error.message);

    return {
      message: "Success update data",
      data: null,
    };
  }

  async remove(id: number, user: TRequest["user"]): Promise<TResponse<null>> {
    const { error } = await this.supabase.client
      .from("tasks")
      .delete()
      .eq("id", id)
      .eq("user_id", user.id);

    if (error) throw new BadRequestException(error.message);

    return {
      message: "Success delete data",
      data: null,
    };
  }
}
