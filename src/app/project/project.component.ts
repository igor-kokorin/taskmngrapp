import { Component, OnInit } from '@angular/core';
import { Project } from '../entities/project';
import { Input } from '@angular/core';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: [ './project.component.css' ]
})
export class ProjectComponent implements OnInit {

  @Input() project: Project;

  constructor() { }

  ngOnInit(): void {
  }

}
