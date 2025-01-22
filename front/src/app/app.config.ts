import { ApplicationConfig } from "@angular/core";
import { provideAnimationsAsync } from "@angular/platform-browser/animations/async";
import { provideRouter } from "@angular/router";
import { routes } from "./app.routes";
import { provideHttpClient, withInterceptorsFromDi } from "@angular/common/http";
import { provideToastr } from 'ngx-toastr';

export const appConfig: ApplicationConfig = {

    providers: [
        provideHttpClient(withInterceptorsFromDi()),
        provideRouter(routes),
        provideAnimationsAsync(),
        provideToastr()
    ]
};
