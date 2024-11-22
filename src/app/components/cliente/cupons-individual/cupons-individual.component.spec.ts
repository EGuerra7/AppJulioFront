import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CuponsIndividualComponent } from './cupons-individual.component';

describe('CuponsIndividualComponent', () => {
  let component: CuponsIndividualComponent;
  let fixture: ComponentFixture<CuponsIndividualComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CuponsIndividualComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CuponsIndividualComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
