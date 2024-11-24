import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ControleFeedComponent } from './controle-feed.component';

describe('ControleFeedComponent', () => {
  let component: ControleFeedComponent;
  let fixture: ComponentFixture<ControleFeedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ControleFeedComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ControleFeedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
