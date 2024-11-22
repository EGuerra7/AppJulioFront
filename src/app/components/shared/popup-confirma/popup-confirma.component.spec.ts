import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PopupConfirmaComponent } from './popup-confirma.component';

describe('PopupConfirmaComponent', () => {
  let component: PopupConfirmaComponent;
  let fixture: ComponentFixture<PopupConfirmaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PopupConfirmaComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PopupConfirmaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
