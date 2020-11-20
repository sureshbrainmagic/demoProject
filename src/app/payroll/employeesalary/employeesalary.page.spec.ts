import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { EmployeesalaryPage } from './employeesalary.page';

describe('EmployeesalaryPage', () => {
  let component: EmployeesalaryPage;
  let fixture: ComponentFixture<EmployeesalaryPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmployeesalaryPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(EmployeesalaryPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
