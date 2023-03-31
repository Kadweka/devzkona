import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'dataPropertyGetter'
})
export class DataPropertyGetterPipe implements PipeTransform {

  transform(object: any, keyName: string, ...args: any[]): any {
    if (object[keyName] != null || object[keyName] !== undefined) {
      return object[keyName];
    } else if (object[keyName] === null) {
      if (object[keyName] === 0) {
        return 0;
      } else {
        return '-';
      }
    } else {
      return null;
    }
  }

}
