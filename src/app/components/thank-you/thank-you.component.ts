import { Component, OnInit } from '@angular/core'

@Component({
  selector: 'app-thank-you',
  templateUrl: './thank-you.component.html',
  styleUrls: ['./thank-you.component.scss']
})
export class ThankYouComponent implements OnInit {
  private isOpen = true

  constructor() {
    if (window.localStorage.getItem('accepted')) {
      this.isOpen = false
    }
  }

  ngOnInit() {}

  close() {
    this.isOpen = false
    window.localStorage.setItem('accepted', '1')
  }
}
