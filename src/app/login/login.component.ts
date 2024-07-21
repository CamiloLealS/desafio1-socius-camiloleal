import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService } from '../auth.service';
import { catchError, of } from 'rxjs';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'] // Elimina esta línea si no tienes el archivo CSS
})
export class LoginComponent {
  user = '';
  password = '';
  errorMessage = '';

  constructor(private authService: AuthService, private router: Router) {}

  login(): void {
    this.authService.login(this.user, this.password).subscribe(
      success => {
        if (success) {
          console.log(this.user);
          this.router.navigate(['/user-cv']);
        } else {
          this.errorMessage = 'Usuario o contraseña inválidos';
        }
      },
      error => {
        this.errorMessage = 'Error en la conexión con el servidor';
      }
    );
      
  }
}