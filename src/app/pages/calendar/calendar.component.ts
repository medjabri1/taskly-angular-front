import { Component } from '@angular/core';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss']
})
export class CalendarComponent {

  teams: Array<String> = [
    'UI / UX Design',
    'Illustration Design',
    'Marketplace',
    'Nike Landing',
    'Bank of America',
    'Visa',
    'Rebook Run App',
    'Landing for education',
    'Design team',
  ]

  dates: Array<Number> = [];


  day = new Date().getDate();
  month = new Date().getMonth();

  shift = 0;

  ngOnInit() {
    this.fillDates();

    let i = 0;
  }
  
  fillDates() {  
    this.dates = [];
    for(let i = this.day - 2 + this.shift; i <= this.day + 4 + this.shift; i++) {
      this.dates.push(i);
    }
  }

  handleShiftDate(step: number) {
    this.shift += step;
    this.fillDates();
  }

}
