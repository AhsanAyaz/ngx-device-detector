/**
 * Created by ahsanayaz on 08/11/2016.
 */

export class ReTree {
    private readonly regexCache = new Map<string, RegExp>();

    private getRegex(pattern: string): RegExp {
        const regex = this.regexCache.get(pattern);
        if (!regex) {
            const newRegex = new RegExp(pattern);

            this.regexCache.set(pattern, newRegex);
            return newRegex;
        }

        return regex;
    }

    public test(str: string, regex: unknown): boolean {
        if (typeof regex === 'string') {
            regex = this.getRegex(regex);
        }

        if (regex instanceof RegExp) {
            return regex.test(str);
        } else if (regex && typeof regex === 'object') {
            if ('and' in regex && Array.isArray(regex.and)) {
                return regex.and.every(item => this.test(str, item));
            }

            if ('or' in regex && Array.isArray(regex.or)) {
                return regex.or.some(item => this.test(str, item));
            }

            if ('not' in regex) {
                return !this.test(str, regex.not);
            }
        }

        return false;
    }

    public exec(str: string, regex: unknown): RegExpExecArray | null {
        if (typeof regex === 'string') {
            regex = this.getRegex(regex);
        }

        if (regex instanceof RegExp) {
            return regex.exec(str);
        } else if (regex && Array.isArray(regex)) {
            return regex.reduce((res, item) => res ?? this.exec(str, item), null);
        } else {
            return null;
        }
    }
}
