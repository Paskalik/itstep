import { Pipe, PipeTransform } from '@angular/core';
import { DatePipe } from '@angular/common';

@Pipe({
  name: 'customDate'
})
export class CustomDatePipe extends
  DatePipe implements PipeTransform {
  transform(value: any, args?: any): any {
    if (/[0-9]/.test(value)) {
      return super.transform(value, "MMMM y");
    }
    else {
      return value;
    }
  }
}
