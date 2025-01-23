import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TASK } from '../../../interfaces/tasks.interfaces';
import { TasksService } from '../../../services/tasks.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-task-edit-modal',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './task-edit-modal.component.html',
  styleUrl: './task-edit-modal.component.scss'
})
export class TaskEditModalComponent {
  @Input() task: TASK;
  @Output() saveTask = new EventEmitter<TASK>();


  constructor(private taskService: TasksService,
    private toastr: ToastrService,
    private tasksService: TasksService
  ) {
    this.task = {
      title: '',
      description: ''
    };
  }


  closeModal(): void {
    const modalElement = document.getElementById('taskEditModal' + this.task.id);
    if (modalElement) {
      modalElement.style.display = 'none';
    }
  }

  onSave(): void {
    if (this.task.title === '' || this.task.description === '') {
      this.toastr.error('Por favor, llena todos los campos');
      return;
    }

    this.saveTask.emit(this.task);
    this.closeModal();
  }
}
