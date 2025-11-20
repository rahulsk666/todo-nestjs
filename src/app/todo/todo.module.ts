import { Module } from '@nestjs/common';
import { TodoService } from './todo.service';
import { TodoController } from './todo.controller';
import { TODO_REPOSITORY } from './repository/todo.repository.interface';
import { TodoPgRepository } from './repository/todo.repository';
import { DatabaseModule } from 'src/database/database.module';

@Module({
  imports: [DatabaseModule],
  controllers: [TodoController],
  providers: [
    TodoService,
    { provide: TODO_REPOSITORY, useClass: TodoPgRepository },
    TodoPgRepository,
  ],
})
export class TodoModule {}
