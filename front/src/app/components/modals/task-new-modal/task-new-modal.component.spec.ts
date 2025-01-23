import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskNewModalComponent } from './task-new-modal.component';

describe('TaskNewModalComponent', () => {
  let component: TaskNewModalComponent;
  let fixture: ComponentFixture<TaskNewModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TaskNewModalComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TaskNewModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
