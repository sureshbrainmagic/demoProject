import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { PayslipPage } from './payslip.page';

describe('PayslipPage', () => {
  let component: PayslipPage;
  let fixture: ComponentFixture<PayslipPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PayslipPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(PayslipPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
