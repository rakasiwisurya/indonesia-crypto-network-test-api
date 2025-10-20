import { IsDateString, IsNotEmpty, IsString } from "class-validator";

export class CreateTaskDto {
  @IsString()
  @IsNotEmpty()
  task_name: string;

  @IsString()
  task_desc: string | null;

  @IsString()
  @IsDateString()
  @IsNotEmpty()
  due_date: string;

  @IsString()
  @IsNotEmpty()
  status: string;
}
