import { Component, OnInit } from '@angular/core';
import { FormControl, FormBuilder, UntypedFormGroup, Validators, NonNullableFormBuilder } from '@angular/forms';
import { CoursesService } from '../services/courses.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Location } from '@angular/common';

@Component({
  selector: 'app-course-form',
  templateUrl: './course-form.component.html',
  styleUrls: ['./course-form.component.scss'],
})
export class CourseFormComponent implements OnInit {

  form = this.formBuilder.group({
    name: [''],
    category: ['']
  });

  constructor(
    private formBuilder: NonNullableFormBuilder,
    private service: CoursesService,
    private _snackBar: MatSnackBar,
    private location: Location ) {

    }

  ngOnInit(): void {

  }

  onSubmit() {
    this.service.save(this.form.value).subscribe(
      (result) => this.onSuccess(),
      (error) => this.onError()
    );
  }

  onCancel() {
    this.location.back();
  }
  
  private onSuccess() {
    this._snackBar.open('Curso salvo com sucesso!', '', {duration: 3000});
    this.location.back();
  }

  private onError() {
    this._snackBar.open('Erro ao salvar curso!', '', {duration: 3000});
  }
}
