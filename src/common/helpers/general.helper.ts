export class GeneralHelper {
  static isEmptyObject(value: any): boolean {
    return (
      typeof value === 'object' &&
      value !== null &&
      Object.keys(value).length === 0
    );
  }

  static isArray(obj: any): boolean {
    return Array.isArray(obj);
  }
}
