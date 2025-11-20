import { CreateTodoDto } from '../dto/create-todo.dto';
import { UpdateTodoDto } from '../dto/update-todo.dto';
import { Todo } from '../entities/todo.entity';

export const TODO_REPOSITORY = 'TODO_REPOSITORY'; // DI token

export interface TodoRepository {
  create(todo: CreateTodoDto): Promise<Todo>;
  findById(id: string): Promise<Todo | null>;
  findAll(): Promise<Todo[]>;
  update(id: string, todo: UpdateTodoDto): Promise<Todo>;
  delete(id: string): Promise<void>;
}
