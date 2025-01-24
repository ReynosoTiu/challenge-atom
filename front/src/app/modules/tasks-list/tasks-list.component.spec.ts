import { HttpClientTestingModule } from "@angular/common/http/testing";
import { ComponentFixture, TestBed } from "@angular/core/testing";
import { Router } from "@angular/router";
import { CookieService } from "ngx-cookie-service";
import { ToastrService } from "ngx-toastr";
import { of, throwError } from "rxjs";

import { TASK } from "../../interfaces/tasks.interfaces";
import { TasksService } from "../../services/tasks.service";
import { TasksListComponent } from "./tasks-list.component";

describe("TasksListComponent", () => {
    let component: TasksListComponent;
    let fixture: ComponentFixture<TasksListComponent>;

    let mockTasksService: any;
    let mockCookieService: any;
    let mockRouter: any;
    let mockToastrService: any;

    beforeEach(async () => {
        const mockTasks: { data: TASK[] } = {
            data: [
                {
                    id: "1", title: "Tarea de prueba", description: "Descripcion de tarea", createdAt: "23/01/2025 18:18:18", completed: false
                },
                {
                    id: "2", title: "Otra tarea", description: "Otra descripcion de la tarea", createdAt: "23/01/2025 18:18:18", completed: true
                },
            ],
        };

        mockTasksService = {
            getTasks: jasmine.createSpy("getTasks").and.returnValue(of(mockTasks)),
        };
        mockCookieService = {
            delete: jasmine.createSpy("delete"),
        };
        mockRouter = {
            navigate: jasmine.createSpy("navigate"),
        };

        mockToastrService = {
            success: jasmine.createSpy("success"),
            error: jasmine.createSpy("error"),
            warning: jasmine.createSpy("warning"),
            info: jasmine.createSpy("info"),
        };

        await TestBed.configureTestingModule({
            declarations: [],
            imports: [HttpClientTestingModule, TasksListComponent],
            providers: [
                { provide: TasksService, useValue: mockTasksService },
                { provide: CookieService, useValue: mockCookieService },
                { provide: Router, useValue: mockRouter },
                { provide: ToastrService, useValue: mockToastrService }
            ],
        }).compileComponents();

        fixture = TestBed.createComponent(TasksListComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it("should create", () => {
        expect(component).toBeTruthy();
    });

    it("Mostrar tareas", () => {
        const mockTasks: { data: TASK[] } = {
            data: [
                {
                    id: "1", title: "Tarea de prueba", description: "Descripcion de tarea", createdAt: "23/01/2025 18:18:18", completed: false
                },
                {
                    id: "2", title: "Otra tarea", description: "Otra descripcion de la tarea", createdAt: "23/01/2025 18:18:18", completed: true
                },
            ],
        };

        mockTasksService.getTasks.and.returnValue(of(mockTasks));

        component.loadTasks();

        expect(mockTasksService.getTasks).toHaveBeenCalled();
        expect(component.tasks).toEqual(mockTasks.data);
        expect(component.loading).toBeTrue();
    });

    it("Debe suceder error y setear un true a la variable loading", () => {
        spyOn(console, "error");
        mockTasksService.getTasks.and.returnValue(throwError(() => new Error("Error loading tasks")));

        component.loadTasks();

        expect(mockTasksService.getTasks).toHaveBeenCalled();
        expect(console.error).toHaveBeenCalled();
        expect(component.loading).toBeTrue();
    });

    it("Eliminar el token al hacer logout y redireccionar al login", () => {
        component.logout();
        expect(mockCookieService.delete).toHaveBeenCalledWith("token");
        expect(mockRouter.navigate).toHaveBeenCalledWith(["/auth"]);
    });

    it("debería actualizar la tarea en la matriz de tareas", () => {
        const mockTask = {
            id: "1", title: "Tarea de prueba actualizada", description: "Descripcion de tarea actualizada", createdAt: "23/01/2025 18:18:18", completed: false
        };
        component.tasks = [{
            id: "1", title: "Tarea de prueba", description: "Descripcion de tarea", createdAt: "23/01/2025 18:18:18", completed: true
        }];

        component.onEditTask(mockTask);

        expect(component.tasks).toEqual([mockTask]);
    });

    it("debería eliminar la tarea de la lista de tareas", () => {
        const mockTask = {
            id: "1", title: "Tarea de prueba", description: "Descripcion de tarea", createdAt: "23/01/2025 18:18:18", completed: true
        };
        component.tasks = [mockTask];

        component.onDeleteTask(mockTask);

        expect(component.tasks).toEqual([]);
    });

    it("debería abrir el modal y cerrarlo", () => {
        const modalElement = document.createElement("div");
        modalElement.id = "taskNewModal";
        document.body.appendChild(modalElement);
        component.openModal();
        expect(modalElement.style.display).toBe("");
    });
});
