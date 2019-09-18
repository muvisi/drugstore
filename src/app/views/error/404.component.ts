import {Component, OnDestroy} from '@angular/core';
import { CarouselConfig } from 'ngx-bootstrap/carousel';

@Component({
  templateUrl: '404.component.html',
  providers: [
    { provide: CarouselConfig, useValue: { interval: 1500, noPause: false } },
  ]
})
export class P404Component implements OnDestroy {
  myInterval: number | false = 6000;
  slides: any[] = [];
  activeSlideIndex: number = 0;
  noWrapSlides: boolean = false;

  constructor() {
    for (let i = 0; i < 4; i++) {
      this.addSlide();
    }
  }
  ngOnDestroy(): void {
    this.myInterval = 0;
    this.noWrapSlides = true;
    this.myInterval = false;
  }

  addSlide(): void {
    this.slides.push({
      image: `https://lorempixel.com/900/500/abstract/${this.slides.length % 8 + 1}/`
    });
  }

  removeSlide(index?: number): void {
    const toRemove = index ? index : this.activeSlideIndex;
    this.slides.splice(toRemove, 1);
  }
}
