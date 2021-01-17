import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Project } from '../entities/project';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { plainToClass } from 'class-transformer';

@Injectable({
  providedIn: 'root',
})
export class ProjectsService {
  constructor (private http: HttpClient) {}

  public getProjects (): Observable<Project[]> {
    return this.http.get<Project[]>(`${environment.apiEndpoint}/projects`).pipe(map(data => plainToClass(Project, data)))
  }
}
