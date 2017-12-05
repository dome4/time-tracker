import { Directive, HostBinding, HostListener } from '@angular/core';

@Directive({
  selector: '[appDropdown]'
})
export class DropdownDirective {
  @HostBinding('class.open') isOpen: boolean;

  @HostListener('click') toggleOpen(eventData: Event) {
    this.isOpen = !this.isOpen;
  }
}
