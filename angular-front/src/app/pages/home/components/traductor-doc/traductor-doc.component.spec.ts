import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TraductorDocComponent } from './traductor-doc.component';

describe('TraductorDocComponent', () => {
  let component: TraductorDocComponent;
  let fixture: ComponentFixture<TraductorDocComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TraductorDocComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TraductorDocComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
