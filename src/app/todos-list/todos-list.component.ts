import { Component, Input, Output, OnInit, EventEmitter } from '@angular/core';
import { MatSelectionListChange } from '@angular/material/list';
import { Todo } from '../entities/todo';
import { TodosService } from '../services/todos.service';

@Component({
  selector: 'app-todos-list',
  templateUrl: './todos-list.component.html',
  styleUrls: [ './todos-list.component.css' ],
  inputs: [ 'todos' ]
})
export class TodosListComponent implements OnInit {
  @Input() todos: Todo[];

  constructor(private todoSrvc: TodosService) { }

  ngOnInit(): void {
  }

  onIsCompletedChanged(event: MatSelectionListChange) {
    const { value: todoId, selected: isCompleted } = event.options[0]

    this.todoSrvc.updateTodo({
      todoId,
      isCompleted,
      projectId: this.todos.find(todo => todo.id === todoId)!.projectId
    }).subscribe(
      updated => this.todos.find(todo => todo.id === updated.id)!.isCompleted = updated.isCompleted
    );
  }
}
