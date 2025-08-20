/**
 * Created by ahsanayaz on 08/11/2016.
 */

export class ReTree {
  private regexCache = new Map<string, RegExp>();

  constructor() {}

  private getRegex(pattern: string): RegExp {
    if (!this.regexCache.has(pattern)) {
      this.regexCache.set(pattern, new RegExp(pattern));
    }
    return this.regexCache.get(pattern)!;
  }

  public test(str: string, regex: any): any {
    if (typeof regex === 'string') {
      regex = this.getRegex(regex);
    }

    if (regex instanceof RegExp) {
      return regex.test(str);
    } else if (regex && Array.isArray(regex.and)) {
      return regex.and.every((item: any) => {
        return this.test(str, item);
      });
    } else if (regex && Array.isArray(regex.or)) {
      return regex.or.some((item: any) => {
        return this.test(str, item);
      });
    } else if (regex && regex.not) {
      return !this.test(str, regex.not);
    } else {
      return false;
    }
  }

  public exec(str: string, regex: any): any {
    if (typeof regex === 'string') {
      regex = this.getRegex(regex);
    }

    if (regex instanceof RegExp) {
      return regex.exec(str);
    } else if (regex && Array.isArray(regex)) {
      return regex.reduce((res: any, item: any) => {
        return !!res ? res : this.exec(str, item);
      }, null);
    } else {
      return null;
    }
  }
}
