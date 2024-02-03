export class ParseUtil {
  private static STRING_BOOL_TRUE = "true";
  private static STRING_BOOL_FALSE = "false";

  static toNumber(
    value: number | string,
    options = { returnNUllWhenNaN: false, returnNUllWhenInfinite: false },
  ): number {
    if (value == null) {
      return null;
    }

    const parsed = Number(value);
    if (options.returnNUllWhenNaN && Number.isNaN(parsed)) {
      return null;
    }
    if (options.returnNUllWhenInfinite && !Number.isFinite(parsed)) {
      return null;
    }

    return parsed;
  }

  static toBoolean(value: string): boolean {
    const str = value?.toString() ?? "";
    switch (str.toLowerCase()) {
      case ParseUtil.STRING_BOOL_TRUE:
        return true;
      case ParseUtil.STRING_BOOL_FALSE:
        return false;
      default:
        return null;
    }
  }
}
