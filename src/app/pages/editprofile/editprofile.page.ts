import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { ConfigService } from 'src/app/services/config/config.service';
import { ErrormsgService } from 'src/app/services/errormsg/errormsg.service';
@Component({
  selector: 'app-editprofile',
  templateUrl: './editprofile.page.html',
  styleUrls: ['./editprofile.page.scss'],
})
export class EditprofilePage implements OnInit {

  validationsForm: FormGroup;
  constructor(
    public formBuilder: FormBuilder,
    public errorMsg: ErrormsgService,
    private config: ConfigService,
  ) { }

  ngOnInit() {
    this.validationsForm = this.formBuilder.group({
      FirstName: new FormControl('', Validators.compose([
        Validators.required,
      ])),
      LastName: new FormControl('', Validators.compose([
        Validators.required,
      ])),
      email: new FormControl('', Validators.compose([
        // Validators.minLength(5),
        Validators.required
      ])),
      password: new FormControl('', Validators.compose([
        // Validators.minLength(5),
        Validators.required
      ])),
    });
  }

}
