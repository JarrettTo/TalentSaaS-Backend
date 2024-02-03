import { TransformFnParams } from "class-transformer";
import { ParseUtil } from "./parse-util";

export class TransformUtil {
  private static SPLITTER = ",";

  static toNumber(params: TransformFnParams): number {
    return ParseUtil.toNumber(params.value);
  }

  static toBoolean(params: TransformFnParams): boolean {
    return ParseUtil.toBoolean(params.value);
  }

  static toDate(params: TransformFnParams): Date {
    if (params.value == null) {
      return null;
    }

    const numericValue = +params.value;
    const parsedValue = Number.isNaN(numericValue) ? params.value : numericValue;
    return new Date(parsedValue);
  }

  static toArray(params: TransformFnParams): string[] {
    if (params.value == null) {
      return null;
    }

    return params.value.split(TransformUtil.SPLITTER);
  }

  static toLowerCase(params: TransformFnParams): string {
    if (params.value == null) {
      return null;
    }

    if (typeof params.value !== "string") {
      return params.value;
    }

    return params.value.toLowerCase();
  }

  static toArrayOf<T>(mapFn: (value: string) => T): (params: TransformFnParams) => T[] {
    return (params: TransformFnParams) => {
      if (params.value == null) {
        return null;
      }

      const arr = TransformUtil.toArray(params);

      const result = [];
      for (const elem of arr) {
        result.push(mapFn(elem));
      }

      return result;
    };
  }
}
