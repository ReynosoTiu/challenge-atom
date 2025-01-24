import { HttpErrorResponse } from "@angular/common/http";
import { Component } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { Router } from "@angular/router";
import { CookieService } from "ngx-cookie-service";
import { ToastrService } from "ngx-toastr";
import Swal from "sweetalert2";

import { UsersService } from "../../services/users.service";

@Component({
    selector: "app-auth",
    standalone: true,
    imports: [FormsModule],
    templateUrl: "./auth.component.html",
    styleUrl: "./auth.component.scss"
})
export class AuthComponent {
    email: string;

    constructor(
        private usersService: UsersService,
        private toastr: ToastrService,
        private cookieService: CookieService,
        private router: Router
    ) {
        this.email = "";
    }

    onSubmit() {
        this.searchUser();
    }

    searchUser() {
        this.usersService.getUser(this.email).subscribe({
            next: (response) => {
                this.reDirect(response.token);
            },
            error: () => {
                Swal.fire({
                    title: "Registro",
                    text: "¿Desea registrar el correo electrónico?",
                    icon: "question",
                    showCancelButton: true,
                    confirmButtonText: "Sí, registrar",
                    cancelButtonText: "Cancelar"
                }).then((result) => {
                    if (result.isConfirmed) {
                        this.addUser();
                    } else if (result.isDismissed) {
                        this.toastr.warning("Registrese para continuar");
                    }
                });
            }
        });
    }

    addUser() {
        this.usersService.addUser(this.email).subscribe({
            next: (response) => {
                this.toastr.success(response.message);
                this.searchUser();
            },
            error: (err: HttpErrorResponse) => {
                this.toastr.error(err.error.message);
            }
        });
    }

    reDirect(token: string) {
        this.cookieService.set("token", token);
        this.router.navigate(["/tasks"]);
    }
}
