import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'keys', standalone:true })
export class KeysPipe implements PipeTransform {
  transform(value, props: string[] = []): any {
    const keys = [];
    const noFilter = props.length === 0;
    for (const key in value) {
      if (noFilter) {
        if (value.hasOwnProperty(key)) {
          keys.push({ key, value: value[key] });
        }
      } else {
        if (props.indexOf(key) !== -1) {
          keys.push({ key, value: value[key] });
        }
      }
    }
    return keys;
  }
}
