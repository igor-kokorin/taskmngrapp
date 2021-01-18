import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Project } from '../entities/project';

class CreateTodoDto {
  public projects: Project[];
}

@Component({
  selector: 'app-create-todo-dialog',
  templateUrl: './create-todo-dialog.component.html',
  styleUrls: ['./create-todo-dialog.component.css']
})
export class CreateTodoDialogComponent implements OnInit {
  public form: FormGroup;
  public projects: Project[];

  constructor(
    private formBuilder: FormBuilder,
    public dialog: MatDialogRef<CreateTodoDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: CreateTodoDto
  ) {
    this.form = this.formBuilder.group({
      text: [ '', Validators.required ],
      projectId: [ '' ],
      projectTitle: [ '' ]
    })

    this.form.setValidators(this.projectValidator());

    this.projects = data.projects || [];
  }

  ngOnInit(): void {}

  onCancel() {
    this.dialog.close(null);
  }

  onSubmit() {
    if (this.form.valid) {
      this.dialog.close(this.form.value);
    }
  }

  public projectValidator() : ValidatorFn {
    return (group: any): { [key: string]: any } | null => {
      const projectId = group.controls['projectId'];
      const projectTitle = group.controls['projectTitle'];

      if (!projectId.value && !projectTitle.value) {
        projectId.setErrors({
          required: true
        });
      }

      if (projectId.value === -1 && !projectTitle.value) {
        projectTitle.setErrors({
          required: true
        });
      }

      return null;
    };
  }
}
