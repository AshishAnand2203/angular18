import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RoleDashboardComponent } from './role-dashboard.component';

describe('RoleDashboardComponent', () => {
  let component: RoleDashboardComponent;
  let fixture: ComponentFixture<RoleDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RoleDashboardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RoleDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
