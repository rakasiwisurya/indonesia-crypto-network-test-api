export class Task {
  id: number;
  task_name: string;
  task_desc: string | null;
  due_date: string;
  status: string;
  created_at?: string;
  updated_at?: string | null;
}
