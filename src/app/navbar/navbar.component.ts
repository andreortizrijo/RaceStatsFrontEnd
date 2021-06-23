import { Component, OnInit } from '@angular/core';
import { LoginstatecontrolService } from '../service/loginstatecontrol.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  constructor(private loginstate: LoginstatecontrolService) { }

  ngOnInit(): void {
    this.loginstate.observer.subscribe( data => {
      console.log(data)
    })
  }
}
