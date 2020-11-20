import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthguardGuard } from './guard/authguard.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'folder/:id',
    loadChildren: () => import('./folder/folder.module').then( m => m.FolderPageModule)
  },
  {
    path: 'home',
    loadChildren: () => import('./pages/home/home.module').then( m => m.HomePageModule),
    canActivate: [AuthguardGuard]
  },
  {
    path: 'login',
    loadChildren: () => import('./pages/login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'employee',
    loadChildren: () => import('./pages/employee/employee.module').then( m => m.EmployeePageModule)
  },
  {
    path: 'attendance',
    loadChildren: () => import('./pages/attendance/attendance.module').then( m => m.AttendancePageModule)
  },
  {
    path: 'leaverequest',
    loadChildren: () => import('./pages/leaverequest/leaverequest.module').then( m => m.LeaverequestPageModule)
  },
  {
    path: 'holidays',
    loadChildren: () => import('./pages/holidays/holidays.module').then( m => m.HolidaysPageModule)
  },
  {
    path: 'settings',
    loadChildren: () => import('./pages/settings/settings.module').then( m => m.SettingsPageModule)
  },
  {
    path: 'notifications',
    loadChildren: () => import('./pages/notifications/notifications.module').then( m => m.NotificationsPageModule)
  },
  {
    path: 'myprofile',
    loadChildren: () => import('./pages/myprofile/myprofile.module').then( m => m.MyprofilePageModule)
  },
  {
    path: 'contactus',
    loadChildren: () => import('./pages/contactus/contactus.module').then( m => m.ContactusPageModule)
  },
  {
    path: 'aboutus',
    loadChildren: () => import('./pages/aboutus/aboutus.module').then( m => m.AboutusPageModule)
  },
  {
    path: 'employeesalary',
    loadChildren: () => import('./payroll/employeesalary/employeesalary.module').then( m => m.EmployeesalaryPageModule)
  },
  {
    path: 'payslip',
    loadChildren: () => import('./payroll/payslip/payslip.module').then( m => m.PayslipPageModule)
  },
  {
    path: 'editprofile',
    loadChildren: () => import('./pages/editprofile/editprofile.module').then( m => m.EditprofilePageModule)
  },
  {
    path: 'leavestatus',
    loadChildren: () => import('./pages/leavestatus/leavestatus.module').then( m => m.LeavestatusPageModule)
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
