export class MathOperationHelper {
  public static sumNullableNumbers(first?: number, second?: number): number {
    if (first == null) {
      first = 0;
    }
    if (second == null) {
      second = 0;
    }
    return +first + +second;
  }
  static toNumber(value: number | string): number {
    if (value == null) {
      return 0;
    }

    const parsed = Number(value);
    if (!Number.isFinite(parsed) || Number.isNaN(parsed)) {
      return 0;
    }

    return parsed;
  }
  static isNumber(value: number | string): boolean {
    if (value == null) {
      return false;
    }

    const parsed = Number(value);
    if (!Number.isFinite(parsed) || Number.isNaN(parsed)) {
      return false;
    }

    return true;
  }

  static parseNumber(value: string): number {
    value = value.replace(/"/g, "");
    value = value.replace(/,/g, ".");

    const isFloat = value.includes("%");

    let arr = value.split("");
    arr = arr.filter((el) => MathOperationHelper.isNumber(el) || (value.includes("%") && el == "."));

    const res = arr.join("");

    if (isFloat) {
      return parseFloat(res);
    }
    return +res;
  }
}
