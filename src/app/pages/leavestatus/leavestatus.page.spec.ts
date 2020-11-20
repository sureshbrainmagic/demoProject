import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { LeavestatusPage } from './leavestatus.page';

describe('LeavestatusPage', () => {
  let component: LeavestatusPage;
  let fixture: ComponentFixture<LeavestatusPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LeavestatusPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(LeavestatusPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
