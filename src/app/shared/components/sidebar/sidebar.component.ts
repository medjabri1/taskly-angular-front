import { Component } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent {

  isCollapsed: boolean = false;

  clickCollapseButton(): void {
    this.isCollapsed = !this.isCollapsed;
  }

}
