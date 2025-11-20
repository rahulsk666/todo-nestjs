import { DatabaseService } from 'src/database/database.service';
import { Todo } from '../entities/todo.entity';
import { TodoRepository } from './todo.repository.interface';
import { plainToInstance } from 'class-transformer';
import { error } from 'console';
import { CreateTodoDto } from '../dto/create-todo.dto';
import { UpdateTodoDto } from '../dto/update-todo.dto';
import { Injectable } from '@nestjs/common';

@Injectable()
export class TodoPgRepository implements TodoRepository {
  constructor(private readonly db: DatabaseService) {}
  async create(todo: CreateTodoDto): Promise<Todo> {
    const query = `INSERT INTO todos(title,description) VALUES ($1,$2) RETURNING id,
      title,
      description,
      completed,
      created_at AS "createdAt",
      updated_at AS "updatedAt"
      `;
    const result = await this.db.runQuery(query, [
      todo.title,
      todo.description,
    ]);
    console.log(result.rows[0], result.rows.length);

    if (result.rows.length <= 0) {
      throw new error('Cannot create todo');
    }
    return plainToInstance(Todo, result.rows[0]);
  }

  async findById(id: string): Promise<Todo | null> {
    const query = `SELECT * FROM todos WHERE id=$1`;
    const result = await this.db.runQuery(query, [id]);
    if (result.rows.length <= 0) {
      throw new error('Cannot find todo');
    }
    return plainToInstance(Todo, result.rows[0]);
  }

  async findAll(): Promise<Todo[]> {
    const query = `SELECT * FROM todos`;
    const result = await this.db.runQuery(query);
    console.log(result);
    if (result.rows.length <= 0) {
      throw new error('Cannot find todo');
    }
    return plainToInstance(Todo, result.rows);
  }

  async update(id: string, todo: UpdateTodoDto): Promise<Todo> {
    const setParts: string[] = [];
    const values: string[] = [];
    let idx = 1;

    if (todo.title !== undefined) {
      setParts.push(`title = $${idx++}`);
      values.push(todo.title);
    }
    if (todo.description !== undefined) {
      setParts.push(`description = $${idx++}`);
      values.push(todo.description);
    }
    if (todo.completed !== undefined) {
      setParts.push(`completed = $${idx++}`);
      values.push(todo.completed.toString());
    }

    setParts.push(`updated_at = NOW()`);

    const query = `
    UPDATE todos
    SET ${setParts.join(', ')}
    WHERE id = $${idx}
    RETURNING id,
      title,
      description,
      completed,
      created_at AS "createdAt",
      updated_at AS "updatedAt"
  `;

    values.push(id);

    const result = await this.db.runQuery(query, values);
    if (result.rows.length <= 0) {
      throw new error('Cannot update todo');
    }
    return plainToInstance(Todo, result.rows[0]);
  }

  async delete(id: string): Promise<void> {
    const query = `DELETE FROM todos WHERE id=$1`;
    const result = await this.db.runQuery(query, [id]);
    if (result.rowCount === 0) {
      throw new Error('Todo not found');
    }
  }
}
