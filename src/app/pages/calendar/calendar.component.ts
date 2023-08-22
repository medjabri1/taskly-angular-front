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

  months = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ]

  daysOfWeek = [
    "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"
  ];

  colors = [
      "#FF0000",  
      "#00FF00",  
      "#0000FF",  
      "#FF00FF",  
      "#800000",  
      "#008000",
      "#808000",  
      "#800080",  
      "#008080",  
      "#FFA500",  
  ]

  tasks = [
    {
      day: 20,
      length: 2,
      team: 'UI / UX Design',
      title: 'Design New System'
    },
    {
      day: 23,
      length: 2,
      team: 'UI / UX Design',
      title: 'Dislay other tasks'
    },
    {
      day: 23,
      length: 3,
      team: 'Visa',
      title: 'Design New System'
    },
    {
      day: 21,
      length: 2,
      team: 'Marketplace',
      title: 'Add new product'
    },
    {
      day: 25,
      length: 2,
      team: 'Design team',
      title: 'Remodel the UI'
    },
    {
      day: 23,
      length: 3,
      team: 'Marketplace',
      title: 'Hide redundant product'
    },
  ]


  dates: Array<Date> = [];


  day = new Date().getDate();
  month = new Date().getMonth();
  dayNbr = new Date().getDay();

  shift = 0;

  ngOnInit() {
    this.fillDates();

    let i = 0;
  }
  
  fillDates() {
    this.dates = [];
    for(let i = this.day - 2 + this.shift; i <= this.day + 4 + this.shift; i++) {
      this.dates.push(this.getDateAfterDays(i - this.day));
    }
  }

  handleShiftDate(step: number) {
    this.shift += step;
    this.fillDates();
  }

  getDateAfterDays(days: number): Date {
    const today: any = new Date();
    const millisecondsPerDay = 24 * 60 * 60 * 1000; // Number of milliseconds in a day
    const daysAfterMilliseconds = days * millisecondsPerDay;
    
    const targetDate = new Date(today.getTime() + daysAfterMilliseconds);
    return targetDate;
  }

  isCurrentDay(date: Date): boolean {
    const current = new Date();

    if(
      current.getDate() !== date.getDate() ||
      current.getMonth() !== date.getMonth() ||
      current.getFullYear() !== date.getFullYear()
    ) {
      return false;
    } else {
      return true;
    }

  }

  dayHasTask(date: Date, team: String) {

    let result = 1;

    this.tasks.map((task) => {
      if(task.day === date.getDate() && task.team === team) {
        result = task.length;
      }
    })

    return result;

  }

  getTaskTitle(date: Date, team: String) {
    let result = '';

    this.tasks.map((task) => {
      if(task.day === date.getDate() && task.team === team) {
        result = task.title;
      }
    })

    return result;
  }

  hideCell(date: Date, team: String) {
    let result = false;

    let day = date.getDate();

    this.tasks.map((task) => {
      if((day > task.day && day < task.day + task.length) && team === task.team) {
        result = true;
      }
    })

    return result;
  }

  getRandomColor() {
    let randomInt = Math.random() * this.colors.length;
    return this.colors[Math.round(randomInt)];
  }
 
}
