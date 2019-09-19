import { Component, OnInit } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { NgForm } from "@angular/forms";
import{ Account } from "./account.model";
import { LoginService } from "../login/login.service";
import { ActivatedRoute, ParamMap } from "@angular/router";

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss']
})
export class AccountComponent implements OnInit {

  account: Account;
  _id: string;
  userId: string;
  firstName: string;
  lastName: string;
  address: string;
  city: string;
  state: string;
  zipcode: string;
  email: string;
  loginName: string;
  password: string;
  password2: string;
  creator: string;

  // private postId: string;
  constructor(
    private http: HttpClient,
    private loginService: LoginService,
    public route: ActivatedRoute){ }

  ngOnInit() {
    this.userId = this.loginService.getUserId();
    this.getAccount();
  }

  //Update account info
  SaveUpdate(){
    let account = { 
      firstName: this.firstName,
      lastName: this.lastName,
      address: this.address,
      city: this.city,
      state: this.city,
      zipcode: this.zipcode,
      email: this.email,
      loginName: this.loginName,
      password: this.password,
      password2: this.password2,
      creator: this.creator
    };

    this.http
      .put("http://localhost:3000/account/" + this._id, account)
      .subscribe(response => {
        // this.router.navigate(["/"]);
        console.log(response);
      });
  }

  //get default account default
  getAccount() {
    console.log("client side:", this.userId);
    this.http
      .get<{ message: string; account: Account }>(
        "http://localhost:3000/account/" + this.userId)
      .subscribe(AccountData => {
      // this.isLoading = false;
        console.log(AccountData);
        console.log(AccountData.account.loginName);

        // this.account = AccountData;
      // this.firstName = AccountData.firstName;
      // this.lastName = AccountData.account.lastName;
      // this.address = AccountData.account.address;
      // this.city = AccountData.account.city;
      // this.state = AccountData.account.state;
      // this.zipcode = AccountData.account.zipcode;
      // this.email = AccountData.account.email;
      // this.loginName = AccountData.account.loginName;
      // this.password = AccountData.account.password;
      // this.password2 = AccountData.account.password2;
      // this.creator = AccountData.account.creator;
    })
  }


}
