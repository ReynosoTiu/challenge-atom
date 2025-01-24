import { Component } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { TASK } from '../../interfaces/tasks.interfaces';
import { TasksService } from '../../services/tasks.service';
import { TaskComponent } from '../../components/task/task.component';
import { TaskNewModalComponent } from '../../components/modals/task-new-modal/task-new-modal.component';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tasks-list',
  standalone: true,
  imports: [TaskNewModalComponent, TaskComponent],
  templateUrl: './tasks-list.component.html',
  styleUrl: './tasks-list.component.scss'
})
export class TasksListComponent {
  tasks: TASK[] = [];
  loading = false;

  constructor(private tasksService: TasksService,
    private cookieService: CookieService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.loadTasks();
  }

  openModal(): void {
    const modalElement = document.getElementById('taskNewModal');
    if (modalElement) {
      modalElement.style.display = 'block';
    }
  }

  loadTasks(): void {
    this.tasksService.getTasks().subscribe({
      next: (response) => {
        this.tasks = response.data;
        this.loading = true;
      }, error: (error: HttpErrorResponse) => {
        console.error(error);
        this.loading = true;
      }
    });
  }

  onEditTask(task: TASK): void {
    this.tasks = this.tasks.map((t) => {
      if (t.id === task.id) {
        return task;
      }
      return t;
    });
  }

  onDeleteTask(task: TASK): void {
    this.tasks = this.tasks.filter((t) => t.id !== task.id);
  }

  logout(): void {
    this.cookieService.delete('token');
    this.router.navigate(['/auth']);
  }
}
