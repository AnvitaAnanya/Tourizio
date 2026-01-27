import { Directive, ElementRef, Renderer2, OnInit, OnDestroy } from '@angular/core';

@Directive({
  selector: '[appScrollAnimate]',
  standalone: true,
})
export class ScrollAnimateDirective implements OnInit, OnDestroy {
  private observer: IntersectionObserver | null = null;

  constructor(private el: ElementRef, private renderer: Renderer2) {}

  ngOnInit(): void {
    // Trigger a bit before the element fully enters the viewport so
    // side-wise entrance animations start reliably as the user scrolls down.
    // rootMargin moves the bottom edge up by 20% of the viewport height.
    const options: IntersectionObserverInit = {
      root: null,
      rootMargin: '0px 0px -20% 0px',
      threshold: 0.12,
    };

    this.observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          // Add visible class when element enters viewport
          this.renderer.addClass(this.el.nativeElement, 'visible');
          // Stop observing once the animation has been triggered (one-time animation)
          if (this.observer) {
            this.observer.unobserve(this.el.nativeElement);
          }
        }
      });
    }, options);

    this.observer.observe(this.el.nativeElement);
  }

  ngOnDestroy(): void {
    // Clean up observer when directive is destroyed
    if (this.observer) {
      this.observer.disconnect();
    }
  }
}
