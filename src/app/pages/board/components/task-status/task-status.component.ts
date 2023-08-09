import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-task-status',
  templateUrl: './task-status.component.html',
  styleUrls: ['./task-status.component.scss']
})
export class TaskStatusComponent {

  @Input() title: String = "";
  @Input() data: Array<any> = [];

}
