import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'costarricanPrice',
  standalone: true
})
export class CostarricanPricePipe implements PipeTransform {

  transform(value: number, base: number): number {
    return (value / base) * base;
  }

}
