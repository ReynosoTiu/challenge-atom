import { HttpClientTestingModule } from "@angular/common/http/testing";
import { ComponentFixture, TestBed } from "@angular/core/testing";
import { FormsModule } from "@angular/forms";
import { Router } from "@angular/router";
import { CookieService } from "ngx-cookie-service";
import { ToastrService } from "ngx-toastr";
import { of, throwError } from "rxjs";
import Swal from "sweetalert2";

import { UsersService } from "../../services/users.service";
import { AuthComponent } from "./auth.component";

describe("AuthComponent", () => {
    let component: AuthComponent;
    let fixture: ComponentFixture<AuthComponent>;

    let mockUsersService: any;
    let mockToastrService: any;
    let mockCookieService: any;
    let mockRouter: any;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [HttpClientTestingModule],
            providers: [],
            declarations: [],
        }).compileComponents();

        mockUsersService = {
            getUser: jasmine.createSpy("getUser"),
            addUser: jasmine.createSpy("addUser"),
        };
        mockToastrService = {
            success: jasmine.createSpy("success"),
            warning: jasmine.createSpy("warning"),
            error: jasmine.createSpy("error"),
        };
        mockCookieService = {
            set: jasmine.createSpy("set"),
        };
        mockRouter = {
            navigate: jasmine.createSpy("navigate"),
        };

        await TestBed.configureTestingModule({
            imports: [FormsModule, AuthComponent],
            providers: [
                { provide: UsersService, useValue: mockUsersService },
                { provide: ToastrService, useValue: mockToastrService },
                { provide: CookieService, useValue: mockCookieService },
                { provide: Router, useValue: mockRouter },
            ],
        }).compileComponents();

        fixture = TestBed.createComponent(AuthComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it("should create", () => {
        expect(component).toBeTruthy();
    });

    it("debería llamar a la función searchUser cuando se envía", () => {
        spyOn(component, "searchUser");
        component.onSubmit();
        expect(component.searchUser).toHaveBeenCalled();
    });

    it("redirige si existe el usuario", () => {
        const token = "mockToken";
        mockUsersService.getUser.and.returnValue(of({ token }));

        component.searchUser();

        expect(mockUsersService.getUser).toHaveBeenCalledWith(component.email);
        expect(mockCookieService.set).toHaveBeenCalledWith("token", token);
        expect(mockRouter.navigate).toHaveBeenCalledWith(["/tasks"]);
    });

    it("Debería solicitar la creación del usuario si no existe", async () => {
        mockUsersService.getUser.and.returnValue(throwError({}));

        spyOn(Swal, "fire").and.returnValue(
            Promise.resolve({
                isConfirmed: true,
                isDenied: false,
                isDismissed: false,
                value: null,
            })
        );
        spyOn(component, "addUser");

        await component.searchUser();

        expect(Swal.fire).toHaveBeenCalled();
        expect(component.addUser).toHaveBeenCalled();
    });

    it("debería llamar al searchUser despues de haber registrado exitosamente al usuario", () => {
        mockUsersService.addUser.and.returnValue(of({ message: "User registered successfully" }));
        spyOn(component, "searchUser");

        component.addUser();

        expect(mockUsersService.addUser).toHaveBeenCalledWith(component.email);
        expect(mockToastrService.success).toHaveBeenCalledWith("User registered successfully");
        expect(component.searchUser).toHaveBeenCalled();
    });

    it("Debe mostrar un erro si no se cumple con el registro", () => {
        const errorMessage = "Registration failed";
        mockUsersService.addUser.and.returnValue(throwError({ error: { message: errorMessage } }));

        component.addUser();

        expect(mockUsersService.addUser).toHaveBeenCalledWith(component.email);
        expect(mockToastrService.error).toHaveBeenCalledWith(errorMessage);
    });
});
