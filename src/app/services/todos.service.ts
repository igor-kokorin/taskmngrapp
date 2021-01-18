import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Todo } from '../entities/todo';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { plainToClass } from 'class-transformer';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';

@Injectable({
  providedIn: 'root',
})
export class TodosService {
  constructor (private http: HttpClient) {}

  public createTodo (createTodo: CreateTodoDto): Observable<Todo> {
    return this.http.post<CreateTodoDto>(`${environment.apiEndpoint}/todos`, createTodo).pipe(map(data => plainToClass(Todo, data)))
  }

  public updateTodo (updateTodo: UpdateTodoDto): Observable<Todo> {
    const body = { isCompleted: updateTodo.isCompleted }

    return this.http.patch<Todo>(`${environment.apiEndpoint}/projects/${updateTodo.projectId}/todo/${updateTodo.todoId}`, body).pipe(map(data => plainToClass(Todo, data)))
  }
}
