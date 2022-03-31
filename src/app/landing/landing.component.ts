import { Component, OnInit } from '@angular/core';
import { ViewEncapsulation } from '@angular/core';
import {OktaWidgetService } from 'app/shared/okta/okta-widget.service';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class LandingComponent implements OnInit {

  constructor(
    public OktaWidgetService:OktaWidgetService,
  ) { }

  async ngOnInit() {
    this.OktaWidgetService.login();
  }

}
