import { Directive, ElementRef } from '@angular/core';

@Directive({
  selector: '[appAutoResizeTextarea]',
  standalone: true
})
export class AutoResizeTextareaDirective {
  private textarea: HTMLTextAreaElement;

  constructor(private el: ElementRef<HTMLTextAreaElement>) {
    this.textarea = this.el.nativeElement;

  }

  resize() {
    this.textarea.style.height = 'auto';
    this.textarea.style.height = this.textarea.scrollHeight + 'px';
  }


  ngAfterViewInit() {
    setTimeout(() => this.resize(), 0);
  }
}
