import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { TaskService } from '../task.service'; 
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-create-task',
  standalone:true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './create-task.component.html',
  styleUrls: ['./create-task.component.scss']
})
export class CreateTaskComponent {
  createTaskForm: FormGroup;
  errorMessage: string = '';
  token: string = '';

  constructor(
    private formBuilder: FormBuilder,
    private taskService: TaskService,
    private router: Router
  ) {
    this.token = localStorage.getItem('userToken') || ''; 
    this.createTaskForm = this.formBuilder.group({
      tituloTarea: ['', Validators.required],
      descripcionTarea: ['', Validators.required]
    });
  }

  onSubmit(): void {
    if (this.createTaskForm.valid) {
      this.taskService.createTask(this.token, this.createTaskForm.value).subscribe(
        response => {
          if (response.success) {
            this.router.navigate(['/task-list']); 
          } else {
            this.errorMessage = response.mensaje;
          }
        },
        error => {
          this.errorMessage = 'No se pudo crear la tarea';
        }
      );
    }
  }

  navigateToList(): void{
    this.router.navigate(['/task-list']);
  }
}