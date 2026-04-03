// import { Directive, ElementRef } from '@angular/core';

// @Directive({
//   selector: '[appAutoResizeTextarea]',
//   standalone: true
// })
// export class AutoResizeTextareaDirective {
//   private textarea: HTMLTextAreaElement;

//   constructor(private el: ElementRef<HTMLTextAreaElement>) {
//     this.textarea = this.el.nativeElement;

//   }

//   resize() {
//     this.textarea.style.height = 'auto';
//     this.textarea.style.height = this.textarea.scrollHeight + 'px';
//   }


//   ngAfterViewInit() {
//     setTimeout(() => this.resize(), 0);
//   }
// }


import {
  Directive,
  ElementRef,
  AfterViewInit,
  Optional
} from '@angular/core';
import { NgControl } from '@angular/forms';

@Directive({
  selector: '[appAutoResizeTextarea]',
  standalone: true
})
export class AutoResizeTextareaDirective implements AfterViewInit {
  constructor(
    private el: ElementRef<HTMLTextAreaElement>,
    @Optional() private ngControl: NgControl
  ) { }

  ngAfterViewInit() {
    // Initial resize
    setTimeout(() => this.resize());

    // Listen for Angular form value changes
    this.ngControl?.valueChanges?.subscribe(() => {
      this.resize();
    });
  }

  resize() {
    const textarea = this.el.nativeElement;
    textarea.style.height = 'auto';
    textarea.style.height = textarea.scrollHeight + 'px';
  }
}