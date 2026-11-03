import { TestBed } from '@angular/core/testing';

import { DemoAuthGatewayService } from './demo-auth-gateway.service';

describe('DemoAuthGatewayService', () => {
  let service: DemoAuthGatewayService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DemoAuthGatewayService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
