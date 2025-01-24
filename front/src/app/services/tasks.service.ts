import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";

import { environment } from "../../environments/environment";
import { RESPONSE_GET_TASKS, RESPONSE_TASK, TASK } from "../interfaces/tasks.interfaces";
import { AppService } from "./app.service";

@Injectable({
    providedIn: "root"
})
export class TasksService {
    API_URL = `${environment.API_URL}/tasks`;
    HEADERS: HttpHeaders;
    constructor(
        private http: HttpClient,
        private appService: AppService
    ) {
        this.HEADERS = new HttpHeaders();
    }

    getTasks() {
        this.HEADERS = this.appService.GET_HEADERS();
        return this.http.get<RESPONSE_GET_TASKS>(`${this.API_URL}`, { headers: this.HEADERS });
    }

    addTask(task: TASK) {
        this.HEADERS = this.appService.GET_HEADERS();
        return this.http.post<RESPONSE_TASK>(this.API_URL, { task }, { headers: this.HEADERS });
    }

    updateTask(task: TASK) {
        this.HEADERS = this.appService.GET_HEADERS();
        return this.http.put<RESPONSE_TASK>(`${this.API_URL}/${task.id}`, { task }, { headers: this.HEADERS });
    }

    deleteTask(task: TASK) {
        this.HEADERS = this.appService.GET_HEADERS();
        return this.http.delete<RESPONSE_TASK>(`${this.API_URL}/${task.id}`, { headers: this.HEADERS });
    }
}
