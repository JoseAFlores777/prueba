import { AfterViewChecked, AfterViewInit, ChangeDetectionStrategy, Component, ElementRef, Input, OnChanges, OnInit, Renderer2, SimpleChanges, ViewChild } from '@angular/core';
import { Subject } from 'rxjs';

import { ClappIcons, IconFill } from './clapp-icons.helper';

type TYPE_ICON_FILLS = keyof typeof IconFill;
type TYPE_ICONS_NAMES = keyof typeof ClappIcons;

@Component({
  selector: 'cl-svg-icon',
  template: `<div #iconContainer id="iconContainer"></div>`,
  styleUrls: ['./svg-icon.component.scss'],
})
export class SvgIconComponent implements OnInit, AfterViewInit, OnChanges {
  @ViewChild('iconContainer') iconContainer!: ElementRef;
  @Input('icon') icon: TYPE_ICONS_NAMES = 'account';
  @Input('width') width: number = 24;
  @Input('height') height: number = 24;
  @Input('fill') fill: TYPE_ICON_FILLS = 'ApplaudoNavyBlue';

  constructor(private renderer: Renderer2) {}

  ngAfterViewInit(): void {
    this.buildIcon();
  }

  ngOnChanges(changes: SimpleChanges) {
    let changesCant = 0;
    for (let propName in changes) {
      if (!changes[propName].isFirstChange()) {
        changesCant++;
      }
    }
    if (changesCant > 0) {
      this.buildIcon();
    }
  }

  ngOnInit(): void {}

  buildIcon(): void {
    let templateTmp = this.renderer.createElement('template');
    templateTmp.innerHTML = ClappIcons[this.icon];
    let svg = templateTmp.content.firstChild as SVGElement;
    this.renderer.setAttribute(svg, 'width', `${this.width}px`);
    this.renderer.setAttribute(svg, 'height', `${this.height}px`);
    this.iconContainer.nativeElement.setAttribute('class', `${IconFill[this.fill]}`);
    this.iconContainer.nativeElement.innerHTML = '';
    this.renderer.appendChild(this.iconContainer.nativeElement, svg);
  }
}
