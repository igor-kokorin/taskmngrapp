import { Component, OnInit } from '@angular/core';
import { Project } from './entities/project';
import { ProjectsService } from './services/projects.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  projects: Project[] = [];

  constructor (private projectSrvc: ProjectsService) {

  }

  ngOnInit () {
    this.projectSrvc.getProjects().subscribe((data: Project[]) => this.projects = data);
  }
}
