import { Component, OnInit } from '@angular/core';
import {OktaGetTokenService} from 'app/shared/okta/okta-get-token.service';
import { ViewEncapsulation } from '@angular/core';
import {AppList, appItems} from 'app/shared/app-list/app-list';
import { Router } from '@angular/router';
import { OktaConfigService } from 'app/shared/okta/okta-config.service';
import { OktaSDKAuthService } from '../shared/okta/okta-auth.service';
import { OktaAuth } from '@okta/okta-auth-js'

@Component({
  selector: 'app-start',
  templateUrl: './start.component.html',
  styleUrls: ['./start.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class StartComponent implements OnInit {
  private authService = new OktaAuth(this.OktaSDKAuthService.config);
  appItems = appItems;
  constructor(
    public OktaGetTokenService:OktaGetTokenService,
    public OktaConfigService: OktaConfigService,
    private OktaSDKAuthService: OktaSDKAuthService
  ) { }

  strUserSession: Boolean;

  async ngOnInit() {
       
    this.authService.token.getUserInfo()
      .then(function (user) {
        console.log(user)
      })
    this.strUserSession = await this.authService.session.exists()
      .then(function (exists) {
        if (exists) {
          // logged in
          
          return exists
        } else {
          // not logged in
          return exists
        }
      });
    switch (this.strUserSession == true) {
      case false:
        await window.location.replace(this.OktaConfigService.strPostLogoutURL);
      case true:
        // User is logged in
        this.OktaGetTokenService.GetAccessToken()
        break;
    }
  }

}
