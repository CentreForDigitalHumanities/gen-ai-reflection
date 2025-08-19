import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AiScaleSelectComponent } from './ai-scale-select.component';

describe('AiScaleSelectComponent', () => {
  let component: AiScaleSelectComponent;
  let fixture: ComponentFixture<AiScaleSelectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AiScaleSelectComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AiScaleSelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
