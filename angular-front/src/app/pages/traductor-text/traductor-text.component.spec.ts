import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TraductorTextComponent } from './traductor-text.component';

describe('TraductorTextComponent', () => {
  let component: TraductorTextComponent;
  let fixture: ComponentFixture<TraductorTextComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TraductorTextComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TraductorTextComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
