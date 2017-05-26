import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'keys'
})
export class KeysPipe implements PipeTransform {

  transform(value, props: string[] = []) : any {
    let keys = [];
    let noFilter = props.length === 0;
    for (let key in value) {
      if(noFilter){
        if(value.hasOwnProperty(key)){
          keys.push({key: key, value: value[key]});
        }
      }
      else{
        if(props.indexOf(key) !== -1){
          keys.push({key: key, value: value[key]});
        }
      }
    }
    return keys;
  }

}
