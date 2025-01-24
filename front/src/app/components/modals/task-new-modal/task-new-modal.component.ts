import { Component, EventEmitter, Output } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { ToastrService } from "ngx-toastr";

import { TASK } from "../../../interfaces/tasks.interfaces";
import { TasksService } from "../../../services/tasks.service";

@Component({
    selector: "app-task-new-modal",
    standalone: true,
    imports: [FormsModule],
    templateUrl: "./task-new-modal.component.html",
    styleUrl: "./task-new-modal.component.scss"
})
export class TaskNewModalComponent {
    constructor(
        private taskService: TasksService,
        private toastr: ToastrService
    ) { }

    newTask: TASK = {
        title: "",
        description: "",
        completed: false,
    };

    @Output() saveTask = new EventEmitter<TASK>();

    closeModal(): void {
        const modalElement = document.getElementById("taskNewModal");
        if (modalElement) {
            modalElement.style.display = "none";
        }
    }

    onSave(): void {
        if (this.newTask.title === "" || this.newTask.description === "") {
            this.toastr.error("Por favor, llena todos los campos");
            return;
        }
        this.taskService.addTask(this.newTask).subscribe({
            next: (response) => {
                this.toastr.success("Tarea agregada exitosamente");
                this.newTask = response.data;
                this.saveTask.emit(this.newTask);
                this.resetForm();
                this.closeModal();
            },
            error: (error) => {
                this.toastr.error(error.error.message);
            }
        });
    }

    resetForm(): void {
        this.newTask = {
            title: "",
            description: "",
            completed: false,
        };
    }
}
