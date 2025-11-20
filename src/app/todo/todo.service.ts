import { Injectable } from '@nestjs/common';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { TodoPgRepository } from './repository/todo.repository';

@Injectable()
export class TodoService {
  constructor(private readonly todorepo: TodoPgRepository) {}
  create(createTodoDto: CreateTodoDto) {
    return this.todorepo.create(createTodoDto);
  }

  findAll() {
    return this.todorepo.findAll();
  }

  findOne(id: string) {
    return this.todorepo.findById(id);
  }

  update(id: string, updateTodoDto: UpdateTodoDto) {
    return this.todorepo.update(id, updateTodoDto);
  }

  remove(id: string) {
    return this.todorepo.delete(id);
  }
}
