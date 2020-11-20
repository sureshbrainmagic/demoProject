import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MenuController } from '@ionic/angular';
import { ConfigService } from 'src/app/services/config/config.service';
import { ErrormsgService } from 'src/app/services/errormsg/errormsg.service';
import { LoaderService } from 'src/app/services/loader/loader.service';
import { ToastService } from 'src/app/services/toast/toast.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  validationsForm: FormGroup;
  public showPassword: boolean = true;

  constructor(
    public formBuilder: FormBuilder,
    public errorMsg: ErrormsgService,
    private config: ConfigService,
    private loader: LoaderService,
    private toast: ToastService,
    private router: Router,
    private menuCtrl: MenuController
  ) { }


  ngOnInit() {
    this.menuCtrl.enable(false);
    this.validationsForm = this.formBuilder.group({
      employeeCode: new FormControl('', Validators.compose([
        Validators.required,
      ])),
      password: new FormControl('', Validators.compose([
        // Validators.minLength(5),
        Validators.required
      ])),
    });
  }

  onPasswordToggle(): void {
    this.showPassword = !this.showPassword;
  }

  onSubmit(values) {
    // this.router.navigate(['home']);
    // this.validationsForm.reset();
    this.loader.present(`Please Wait ... `);
    const bodyValues = {
      "Code": values.employeeCode,
      "Password": values.password
    };
    this.config.postData('Login', bodyValues).subscribe(res => {
      console.log(res);
      const response: any = res;
      if (response.result === 'Success') {
        this.menuCtrl.enable(true);
        localStorage.setItem('token', 'true');
        localStorage.setItem('lsEmployeeDetails', JSON.stringify(response.data));
        this.toast.toastFn(`Login Successfully ...`);
        this.router.navigate(['home']);
        this.loader.dismiss();
      } else if (response.result === null) {
        // alert('else');
        this.toast.toastFn(`Invalid Employee Code or Password.`);
      }
      this.loader.dismiss();
    }, error => {
      this.loader.dismiss();
      console.log(error);
      // this.toast.toastFn(`${error.error.messages}`);
    });

  }

}
