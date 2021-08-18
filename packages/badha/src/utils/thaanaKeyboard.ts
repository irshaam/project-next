export const _transFrom = "qwertyuiop[]\\asdfghjkl;'zxcvbnm,./QWERTYUIOP{}|ASDFGHJKL:\"ZXCVBNM<>?()";
export const _transToKbd = "ްއެރތޔުިޮޕ][\\ަސދފގހޖކލ؛'ޒ×ޗވބނމ،./ޤޢޭޜޓޠޫީޯ÷}{|ާށޑﷲޣޙޛޚޅ:\"ޡޘޝޥޞޏޟ><؟)(";
import { BaseSyntheticEvent } from "react";
export interface Translatable {
  index: number;
  char: string;
}
export const isTranslatable = (key: string): boolean => {
  const index = _transFrom.indexOf(key);
  // Return false if no transIndex
  return index == -1 ? false : true;
};

export const transChar = (key: string): Translatable => {
  const index = _transFrom.indexOf(key);
  // Return false if no transIndex

  const char = _transToKbd.substr(index, 1);
  // Return transIndex
  return {
    index,
    char,
  };
};

export const translateToThaana = (event: BaseSyntheticEvent): any => {
  const e = event.nativeEvent as InputEvent;
  const el = e.target as HTMLInputElement;
  const key = e.data;

  console.log(e);
  // Run ONLY for insertText
  // if ("insertText" !== e.inputType) return;

  console.log(key);
  if (key === null) {
    return;
  }

  // Check if key can be translated
  const translatable = isTranslatable(key);

  if (!translatable) {
    return true;
  }
  const { char } = transChar(key);

  console.log(char);
  const selectionStart = el.selectionStart as number;
  const selectionEnd = el.selectionEnd as number;

  el.value = el.value.split(key).join("");

  // Insert the new char where the cursor was at
  let newValue = el.value.substring(0, selectionStart - 1);
  newValue += char;
  newValue += el.value.substring(selectionStart - 1);

  el.value = newValue;

  // Maintain cursor location
  el.selectionStart = selectionStart;
  el.selectionEnd = selectionEnd;
};
