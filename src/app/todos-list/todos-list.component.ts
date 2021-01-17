import { Component, Input, OnInit } from '@angular/core';
import { MatSelectionListChange } from '@angular/material/list';
import { Todo } from '../entities/todo';

@Component({
  selector: 'app-todos-list',
  templateUrl: './todos-list.component.html',
  styleUrls: [ './todos-list.component.css' ],
  inputs: [ 'todos' ]
})
export class TodosListComponent implements OnInit {
  @Input() todos: Todo[];

  constructor() { }

  ngOnInit(): void {
  }

  onIsCompletedChanged(event: MatSelectionListChange) {
    const { value: selectedId, selected } = event.options[0]

    this.todos.map(todo => {
      if (todo.id === selectedId) {
        todo.isCompleted = selected
      }

      return todo;
    })
  }
}
