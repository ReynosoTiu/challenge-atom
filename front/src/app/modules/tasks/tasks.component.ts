import { Component, HostListener } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { TaskComponent } from '../../components/task/task.component';

@Component({
  selector: 'app-tasks',
  standalone: true,
  imports: [TaskComponent],
  templateUrl: './tasks.component.html',
  styleUrl: './tasks.component.scss'
})
export class TasksComponent {

  newTask = {
    title: '',
    description: '',
    createdAt: new Date(),
    completed: false,
  };

  constructor(private cookieService: CookieService) {
    this.resetCookie();
  }

  @HostListener('window:click')
  @HostListener('window:touchstart')
  onUserActivity() {
    this.resetCookie();
  }

  resetCookie() {
    const email = this.cookieService.get('email');
    if (email) {
      const expirationTime = 10 / (24 * 60); // Cada 10 minutos
      this.cookieService.set('email', email, expirationTime);
    }
  }

}
