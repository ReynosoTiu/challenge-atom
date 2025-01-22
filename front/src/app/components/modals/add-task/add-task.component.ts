import { Component, EventEmitter, Output } from '@angular/core';
import { NEW_TASK } from '../../../interfaces/tasks.interfaces';

@Component({
  selector: 'app-add-task',
  standalone: true,
  imports: [],
  templateUrl: './add-task.component.html',
  styleUrl: './add-task.component.scss'
})
export class AddTaskComponent {
  // Modelo para la nueva tarea
  newTask: NEW_TASK = {
    title: '',
    description: '',
    createdAt: (new Date()).toString(),
    completed: false,
  };

  // Evento para enviar la nueva tarea al componente padre
  @Output() saveTask = new EventEmitter<any>();

  // Cierra el modal
  closeModal(): void {
    const modalElement = document.getElementById('taskModal');
    if (modalElement) {
      modalElement.style.display = 'none';
    }
  }

  // Guarda la tarea y la envía al componente padre
  onSave(): void {
    this.saveTask.emit(this.newTask);
    this.resetForm();
    this.closeModal();
  }

  // Reinicia el formulario
  resetForm(): void {
    this.newTask = {
      title: '',
      description: '',
      createdAt: '',
      completed: false,
    };
  }
}
