import { TestBed } from "@angular/core/testing";
import { CanActivateFn, Router } from "@angular/router";
import { CookieService } from "ngx-cookie-service";

import { hasloggedGuard } from "./haslogged.guard";

describe("hasloggedGuard", () => {
    let mockRouter: jasmine.SpyObj<Router>;
    let mockCookieService: jasmine.SpyObj<CookieService>;

    const executeGuard: CanActivateFn = (...guardParameters) => TestBed.runInInjectionContext(() => hasloggedGuard(...guardParameters));

    beforeEach(() => {
        mockRouter = jasmine.createSpyObj("Router", ["navigate"]);
        mockCookieService = jasmine.createSpyObj("CookieService", ["get"]);

        TestBed.configureTestingModule({
            providers: [
                { provide: Router, useValue: mockRouter },
                { provide: CookieService, useValue: mockCookieService },
            ],
        });
    });

    it("should be created", () => {
        expect(executeGuard).toBeTruthy();
    });

    it("retornar true si no existe el toekn", () => {
        mockCookieService.get.and.returnValue("");

        const result = TestBed.runInInjectionContext(() => hasloggedGuard(null as any, null as any));

        expect(result).toBeTrue();
        expect(mockRouter.navigate).not.toHaveBeenCalled();
    });

    it("navegar a /tasks y retornar false cuando exista el tolen", () => {
        mockCookieService.get.and.returnValue("mockToken");
        const result = TestBed.runInInjectionContext(() => hasloggedGuard(null as any, null as any));

        expect(result).toBeFalse();
        expect(mockRouter.navigate).toHaveBeenCalledWith(["/tasks"]);
    });
});
