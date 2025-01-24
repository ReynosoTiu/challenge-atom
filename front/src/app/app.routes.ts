import { Routes } from "@angular/router";

import { hasloggedGuard } from "./guards/haslogged.guard";
import { loginGuard } from "./guards/login.guard";

export const routes: Routes = [
    {
        path: "",
        redirectTo: "/auth",
        pathMatch: "full"
    },
    {
        path: "auth",
        loadComponent: () => import("./modules/auth/auth.component").then((m) => m.AuthComponent),
        canActivate: [hasloggedGuard]
    },
    {
        path: "tasks",
        loadComponent: () => import("./modules/tasks-list/tasks-list.component").then((m) => m.TasksListComponent),
        canActivate: [loginGuard]
    }
];
