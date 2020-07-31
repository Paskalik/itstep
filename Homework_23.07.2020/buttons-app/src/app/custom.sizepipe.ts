import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'customSize' })
export class CustomSizePipe implements PipeTransform {
  transform(size: number): string {
    return size.toFixed(2) + ' м';
  }
}
