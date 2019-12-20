import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  transform(value: any[], args: string = ''): any[] {
    if (!args.trim()) {
      return value;
    }

    return value.filter(v => v.toLowerCase().includes(args.toLowerCase()));
  }

}
