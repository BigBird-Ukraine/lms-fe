import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'question'
})
export class QuestionPipe implements PipeTransform {

  transform(value: any, ...args: any[]): any {
    console.log(value);
    return null;
  }

}
