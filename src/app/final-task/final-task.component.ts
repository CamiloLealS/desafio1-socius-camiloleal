import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { TaskService } from '../task.service'; 
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-final-task',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './final-task.component.html',
  styleUrl: './final-task.component.scss'
})
export class FinalTaskComponent {
  finalTaskForm: FormGroup;
  errorMessage: string = '';
  taskToken: string = '';
  userToken:string = '';

  constructor(
    private formBuilder: FormBuilder,
    private taskService: TaskService,
    private router: Router
  ) {
    this.taskToken = localStorage.getItem('taskToken') || '',
    this.userToken = localStorage.getItem('userToken') || '',
    this.finalTaskForm = this.formBuilder.group({
      ComentarioFinalTarea: ['', Validators.required],
      EstadoTarea: ['', Validators.required]
    });
  }

  onSubmit(): void {
    if (this.finalTaskForm.valid) {
      this.taskService.updateTaskStatus(this.userToken, this.taskToken ,this.finalTaskForm.value).subscribe(
        response => {
          if (response.success) {
            this.router.navigate(['/task-list']); 
          } else {
            this.errorMessage = response.mensaje;
          }
        },
        error => {
          this.errorMessage = 'No se pudo marcar el final de la tarea';
        }
      );
    }
  }
  
  navigateToList(): void{
    this.router.navigate(['/task-list']);
  }
}
