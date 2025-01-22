import { Routes } from "@angular/router";

export const routes: Routes = [
    {
        path: "",
        redirectTo: "/auth",
        pathMatch: "full"
    },
    {
        path: "auth",
        loadComponent: () => import("./modules/auth/auth.component").then((m) => m.AuthComponent)

    }
];
