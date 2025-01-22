import { Routes } from "@angular/router";
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
        canActivate: [loginGuard]
    }
];
