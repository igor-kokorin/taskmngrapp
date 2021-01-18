import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CreateTodoDialogComponent } from './create-todo-dialog/create-todo-dialog.component';
import { Project } from './entities/project';
import { Todo } from './entities/todo';
import { ProjectsService } from './services/projects.service';
import { TodosService } from './services/todos.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  public projects: Project[] = [];

  constructor (private projectSrvc: ProjectsService, private todoSrvc: TodosService, public dialog: MatDialog) {}

  ngOnInit () {
    this.fetchProjects();
  }

  private fetchProjects () {
    this.projectSrvc.getProjects().subscribe((data: Project[]) => this.projects = data);
  }

  openDialog () {
    const dialogRef = this.dialog.open(CreateTodoDialogComponent, {
      data: {
        projects: this.projects
      }
    })

    dialogRef.afterClosed().subscribe(todo => {
      if (todo) {
        this.todoSrvc.createTodo(todo).subscribe((todo: Todo) => {
          this.fetchProjects();
        });
      }
    })
  }
}
