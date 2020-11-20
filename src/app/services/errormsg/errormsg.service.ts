import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ErrormsgService {

  validationMSG = {
    name: [
      { type: 'required', message: 'Name is required.' },
      { type: 'pattern', message: 'Number are not allowed' }
    ],
    UserName: [
      { type: 'required', message: 'User Name is required.' },
    ],
    email: [
      { type: 'required', message: 'Email is required.' },
      { type: 'pattern', message: 'Please enter a valid email.' }
    ],
    employeeCode: [
      { type: 'required', message: 'Employee Code is required.' },
    ],
    mobileNo: [
      { type: 'required', message: 'Mobile number is required.' },
      { type: 'minlength', message: 'Mobile No must be at least 10' },
      { type: 'maxlength', message: 'Mobile No cannot be more than 10' },
      { type: 'pattern', message: 'Chapter are not allowed' }
    ],
    password: [
      { type: 'required', message: 'Password is required.' },
      { type: 'minlength', message: 'Password must be at least 5 characters long.' },
      // { type: 'pattern', message: 'Your password must contain at least one uppercase, one lowercase, and one number.' }
    ],
    confirmPassword: [
      { type: 'required', message: 'Confirm password is required.' }
    ],
    username: [
      { type: 'required', message: 'Username is required.' }
    ],
    ContactName: [
      { type: 'required', message: 'Contact Name is required.' }
    ],
    Message: [
      { type: 'required', message: 'Message is required.' }
    ],
    dealercode: [
      { type: 'required', message: 'Dealer Code is required.' }
    ],
    SubDealerName: [
      { type: 'required', message: 'Sub Dealer Name is required.' }
    ],
    SubDealerCode: [
      { type: 'required', message: 'Sub Dealer Code is required.' }
    ],
    ShopName: [
      { type: 'required', message: 'Shop is required.' }
    ],
    Address: [
      { type: 'required', message: 'Address is required.' }
    ],
    GSTIN: [
      { type: 'required', message: 'GSTIN is required.' }
    ],
    PanNO: [
      { type: 'required', message: 'PanNO is required.' }
    ],
    ContactPerson: [
      { type: 'required', message: 'Contact Person is required.' }
    ],
    matchingPasswords: [
      { type: 'areEqual', message: 'Password mismatch.' }
    ],
    PaymentType: [
      { type: 'required', message: 'Payment Type is required.' }
    ],
    landmark: [
      { type: 'required', message: 'Landmark is required.' }
    ],
    address: [
      { type: 'required', message: 'Address is required.' }
    ],
    City: [
      { type: 'required', message: 'City is required.' }
    ],
    Country: [
      { type: 'required', message: 'Country is required.' }
    ],
    State: [
      { type: 'required', message: 'State is required.' }
    ],
    Pincode: [
      { type: 'required', message: 'Pincode is required.' },
      { type: 'minlength', message: 'Pincode must be at least 10' },
      { type: 'maxlength', message: 'Pincode cannot be more than 10' },
      { type: 'pattern', message: 'Chapter are not allowed' }
    ],
  };
}
