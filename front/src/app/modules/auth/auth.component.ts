import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { UsersService } from '../../services/users.service';
import Swal from 'sweetalert2';
import { ToastrService } from 'ngx-toastr';
import { HttpErrorResponse } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-auth',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.scss'
})
export class AuthComponent {

  email: string;

  constructor(private usersService: UsersService,
    private toastr: ToastrService,
    private cookieService: CookieService,
    private router: Router
  ) {
    this.email = '';
  }

  onSubmit() {
    this.usersService.getUser(this.email).subscribe({
      next: () => {
        this.cookieService.set('email', this.email, 1 / 24); // Duración de 1 hora
        this.toastr.success('Bienvenido');
        this.reDirect();
      },
      error: (err: HttpErrorResponse) => {
        Swal.fire({
          title: 'Registro',
          text: '¿Desea registrar el correo electrónico?',
          icon: 'question',
          showCancelButton: true,
          confirmButtonText: 'Sí, registrar',
          cancelButtonText: 'Cancelar'
        }).then((result) => {
          if (result.isConfirmed) {
            this.addUser();
          } else if (result.isDismissed) {
            this.toastr.warning('Registrese para continuar');
          }
        });
      }
    });
  }

  addUser() {
    this.usersService.addUser(this.email).subscribe({
      next: (response) => {
        this.toastr.success(response.message);
        this.reDirect();
      },
      error: (err: HttpErrorResponse) => {
        this.toastr.error(err.error.message);
      }
    });
  }

  reDirect() {
    console.log('Redirigiendo...');
    //this.router.navigate(['/tasks']);
  }
}
