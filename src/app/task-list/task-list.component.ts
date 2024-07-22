import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TaskService } from '../task.service'; 
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-task-list',
  standalone:true,
  templateUrl: './task-list.component.html',
  imports : [CommonModule],
  styleUrls: ['./task-list.component.scss'] 
})
export class TaskListComponent implements OnInit {
  tasks: any[] | null = [];
  errorMessage: string = '';
  token: string = ''; 
  selectedTaskId: string = '';

  constructor(private taskService: TaskService, private router: Router) {}

  ngOnInit(): void {
    
    this.token = localStorage.getItem('userToken') || ''; 

    this.taskService.getTasks(this.token).subscribe(
      response => {
        this.tasks = response.getTareas; 
        console.log(response.mensaje);
        console.log(response.success);
        console.log(response.getTareas);
        console.log('se obtienen las tareas');
      },
      error => {
        console.log(this.errorMessage);
        console.log(this.tasks);
        this.errorMessage = 'No se pudieron cargar las tareas';
        this.tasks = null;
      }
    );
  }

  getTasks(): void {
    this.taskService.getTasks(this.token).subscribe(
      response => {
        if (response.success) {
          this.tasks = response.getTareas || [];
        } else {
          console.error(response.mensaje);
        }
      },
      error => {
        console.error('Error fetching tasks:', error);
      }
    );
  }

  selectTask(taskId: string): void {
    this.selectedTaskId = taskId;
  }

  storeTaskId(taskId: string): void{
    localStorage.setItem('taskToken', taskId);
  }
  

  navigateToCreateTask(): void {
    this.router.navigate(['/create-task']);
  }

  navigateToFinalTask(): void {
    this.router.navigate(['/final-task']);
  }

  navigateToCV(): void {
    this.router.navigate(['user-cv']);
  }
}