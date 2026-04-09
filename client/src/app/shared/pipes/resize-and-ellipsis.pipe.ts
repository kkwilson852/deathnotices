import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'resizeAndEllipsis',
  standalone: true
})
export class ResizeAndEllipsisPipe implements PipeTransform {

  transform(
    text: string | null | undefined,
    length: number,
    showEllipsis: boolean = true
  ): string {
    if (!text) return '';

    if (text.length <= length) {
      return text;
    }

    const result = text.substring(0, length).trimEnd();
    return showEllipsis ? result + '…' : result;
  }
}
