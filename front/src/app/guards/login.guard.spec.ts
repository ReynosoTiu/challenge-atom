import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { loginGuard } from './login.guard';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

describe('loginGuard', () => {
  let mockRouter: jasmine.SpyObj<Router>;
  let mockCookieService: jasmine.SpyObj<CookieService>;

  const executeGuard: CanActivateFn = (...guardParameters) =>
    TestBed.runInInjectionContext(() => loginGuard(...guardParameters));

  beforeEach(() => {
    mockRouter = jasmine.createSpyObj('Router', ['navigate']);
    mockCookieService = jasmine.createSpyObj('CookieService', ['get']);

    TestBed.configureTestingModule({
      providers: [
        { provide: Router, useValue: mockRouter },
        { provide: CookieService, useValue: mockCookieService },
      ],
    });
  });

  it('retornar true cuando exista el token', () => {
    mockCookieService.get.and.returnValue('mockToken');

    const result = TestBed.runInInjectionContext(() => loginGuard(null as any, null as any));

    expect(result).toBeTrue();
    expect(mockRouter.navigate).not.toHaveBeenCalled();
  });

  it('navegar a /auth y retornar false cuando no exista el token', () => {
    mockCookieService.get.and.returnValue('');

    const result = TestBed.runInInjectionContext(() => loginGuard(null as any, null as any));

    expect(result).toBeFalse();
    expect(mockRouter.navigate).toHaveBeenCalledWith(['/auth']);
  });

});
