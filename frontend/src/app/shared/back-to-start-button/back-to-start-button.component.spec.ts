import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BackToStartButtonComponent } from './back-to-start-button.component';

describe('BackToStartButtonComponent', () => {
  let component: BackToStartButtonComponent;
  let fixture: ComponentFixture<BackToStartButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BackToStartButtonComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(BackToStartButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
