import { Component, OnInit, Input, Output, EventEmitter, Renderer2, OnDestroy } from '@angular/core';
import pageSettings from '../../config/page-settings';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor(private renderer: Renderer2) {

  }

  ngOnInit(): void {
  }

  @Input() pageSidebarTwo;
  @Output() toggleSidebarRightCollapsed = new EventEmitter<boolean>();
  @Output() toggleMobileSidebar = new EventEmitter<boolean>();
  @Output() toggleMobileRightSidebar = new EventEmitter<boolean>();
  pageSettings = pageSettings;

  ngOnDestroy() {
    this.pageSettings.pageMobileTopMenuToggled = false;
    this.pageSettings.pageMobileMegaMenuToggled = false;
  }

  mobileSidebarToggle() {
    this.toggleMobileSidebar.emit(true);
  }
  mobileRightSidebarToggle() {
    this.toggleMobileRightSidebar.emit(true);
  }
  toggleSidebarRight() {
    this.toggleSidebarRightCollapsed.emit(true);
  }

  mobileTopMenuToggle() {
    this.pageSettings.pageMobileTopMenuToggled = !this.pageSettings.pageMobileTopMenuToggled;
  }

  mobileMegaMenuToggle() {
    this.pageSettings.pageMobileMegaMenuToggled = !this.pageSettings.pageMobileMegaMenuToggled;
  }

}
