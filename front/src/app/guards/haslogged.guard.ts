import { inject } from "@angular/core";
import { CanActivateFn, Router } from "@angular/router";
import { CookieService } from "ngx-cookie-service";

export const hasloggedGuard: CanActivateFn = () => {
    const router = inject(Router);
    const cookieService = inject(CookieService);
    const token = cookieService.get("token");
    if (!token) {
        return true;
    }
    router.navigate(["/tasks"]);
    return false;
};
