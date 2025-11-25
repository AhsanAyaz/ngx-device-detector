import { Pipe, PipeTransform } from '@angular/core';
import { DeviceInfo } from 'ngx-device-detector';

@Pipe({
    name: 'keys',
    standalone: true,
})
export class KeysPipe implements PipeTransform {
    public transform(value: DeviceInfo, props: string[] = []): { key: string; value: unknown }[] {
        const keys: { key: string; value: unknown }[] = [];
        const noFilter = props.length === 0;

        for (const key in value) {
            if (noFilter) {
                if (value.hasOwnProperty(key)) {
                    keys.push({ key, value: value[key] });
                }
            } else if (props.includes(key)) {
                keys.push({ key, value: value[key] });
            }
        }

        return keys;
    }
}
