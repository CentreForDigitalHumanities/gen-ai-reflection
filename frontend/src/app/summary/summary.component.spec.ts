import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SummaryComponent } from './summary.component';
import { ApiService } from "../services/api.service";
import { provideRouter } from "@angular/router";
import { FormService } from "../services/form.service";

describe('SummaryComponent', () => {
  let component: SummaryComponent;
  let fixture: ComponentFixture<SummaryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SummaryComponent],
      providers: [
        FormService,
        { provide: ApiService, useValue: {} },
        provideRouter([]),
      ],
    })
    .compileComponents();

    fixture = TestBed.createComponent(SummaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
