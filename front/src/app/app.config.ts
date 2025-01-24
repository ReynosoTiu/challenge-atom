import { provideHttpClient, withInterceptorsFromDi } from "@angular/common/http";
import { ApplicationConfig } from "@angular/core";
import { provideAnimationsAsync } from "@angular/platform-browser/animations/async";
import { provideRouter } from "@angular/router";
import { provideToastr } from "ngx-toastr";

import { routes } from "./app.routes";

export const appConfig: ApplicationConfig = {

    providers: [
        provideHttpClient(withInterceptorsFromDi()),
        provideRouter(routes),
        provideAnimationsAsync(),
        provideToastr()
    ]
};
