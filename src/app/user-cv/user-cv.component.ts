import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-cv',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './user-cv.component.html',
  styleUrls: ['./user-cv.component.scss'] // Elimina esta línea si no tienes el archivo CSS
})
export class UserCvComponent implements OnInit {
  username: string | null = null;

  constructor(private authService: AuthService, private router:Router) {}

  ngOnInit(): void {
    this.username = this.authService.getUserName();
    console.log('Username:', this.username); // Para depuración
  }

  navigateList(): void{
    this.router.navigate(['/task-list']);
  }

  navigateToLogin(): void{
    this.router.navigate(['/login']);
  }
}
