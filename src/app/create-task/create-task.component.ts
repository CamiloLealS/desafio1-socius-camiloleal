import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { TaskService } from '../task.service'; // Ajusta la ruta si es necesario

@Component({
  selector: 'app-create-task',
  templateUrl: './create-task.component.html',
  styleUrls: ['./create-task.component.scss']
})
export class CreateTaskComponent {
  createTaskForm: FormGroup;
  errorMessage: string = '';
  token: string = '';

  constructor(
    private fb: FormBuilder,
    private taskService: TaskService,
    private router: Router
  ) {
    this.token = localStorage.getItem('userToken') || ''; // Ajusta según cómo guardes el token
    this.createTaskForm = this.fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required] // Ajusta según los campos necesarios
    });
  }

  onSubmit(): void {
    if (this.createTaskForm.valid) {
      this.taskService.createTask(this.token, this.createTaskForm.value).subscribe(
        response => {
          if (response.success) {
            this.router.navigate(['/task-list']); // Ajusta la ruta si es necesario
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
}