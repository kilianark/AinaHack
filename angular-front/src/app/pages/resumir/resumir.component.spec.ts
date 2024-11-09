import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResumirComponent } from './resumir.component';

describe('ResumirComponent', () => {
  let component: ResumirComponent;
  let fixture: ComponentFixture<ResumirComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ResumirComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ResumirComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
