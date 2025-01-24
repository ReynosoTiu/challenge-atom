import { HttpErrorResponse } from "@angular/common/http";
import {
    Component, EventEmitter, Input, Output
} from "@angular/core";
import { FormsModule } from "@angular/forms";
import { ToastrService } from "ngx-toastr";

import { TASK } from "../../interfaces/tasks.interfaces";
import { TasksService } from "../../services/tasks.service";
import { TaskEditModalComponent } from "../modals/task-edit-modal/task-edit-modal.component";

@Component({
    selector: "app-task",
    standalone: true,
    imports: [FormsModule, TaskEditModalComponent],
    templateUrl: "./task.component.html",
    styleUrl: "./task.component.scss"
})
export class TaskComponent {
    constructor(
        private tasksService: TasksService,
        private toastr: ToastrService
    ) { }
    @Input() task: TASK = { title: "", description: "", completed: false };
    copyTask: TASK = { title: "", description: "", completed: false };
    @Output() editTask = new EventEmitter<TASK>();
    @Output() deleteTask = new EventEmitter<TASK>();

    updateTask(task: TASK): void {
        this.tasksService.updateTask(task).subscribe({
            next: () => {
                this.editTask.emit(task);
                this.toastr.success("Tarea actualizada exitosamente");
            },
            error: (error: HttpErrorResponse) => {
                this.toastr.error(error.error.message);
            }
        });
    }

    onDelete(): void {
        this.tasksService.deleteTask(this.task).subscribe({
            next: () => {
                this.deleteTask.emit(this.task);
                this.toastr.success("Tarea eliminada exitosamente");
            },
            error: (error: HttpErrorResponse) => {
                this.toastr.error(error.error.message);
            }
        });
    }

    openModal(): void {
        this.copyTask = { ...this.task };
        const modalElement = document.getElementById(`taskEditModal${this.task.id}`);
        if (modalElement) {
            modalElement.style.display = "block";
        }
    }
}
