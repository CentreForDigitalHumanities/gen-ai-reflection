import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IloSelectComponent } from './ilo-select.component';

describe('IloSelectComponent', () => {
    let component: IloSelectComponent;
    let fixture: ComponentFixture<IloSelectComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [IloSelectComponent]
        })
            .compileComponents();

        fixture = TestBed.createComponent(IloSelectComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
