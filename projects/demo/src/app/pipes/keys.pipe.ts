import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'keys'
})
export class KeysPipe implements PipeTransform {

  transform(value, props: string[] = []): any {
    const keys = [];
    const noFilter = props.length === 0;
    for (const keyProp in value) {
      if (noFilter) {
        if (value.hasOwnProperty(keyProp)) {
          keys.push({key: keyProp, value: value[keyProp]});
        }
      } else {
        if (props.indexOf(keyProp) !== -1) {
          keys.push({key: keyProp, value: value[keyProp]});
        }
      }
    }
    return keys;
  }

}
