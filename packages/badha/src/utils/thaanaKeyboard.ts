export const _transFrom = "qwertyuiop[]\\asdfghjkl;'zxcvbnm,./QWERTYUIOP{}|ASDFGHJKL:\"ZXCVBNM<>?()";
export const _transToKbd = "ްއެރތޔުިޮޕ][\\ަސދފގހޖކލ؛'ޒ×ޗވބނމ،./ޤޢޭޜޓޠޫީޯ÷}{|ާށޑﷲޣޙޛޚޅ:\"ޡޘޝޥޞޏޟ><؟)(";

interface Translatable {
  index: number;
  char: string;
}
export const isTranslatable = (key: string): boolean | Translatable => {
  const index = _transFrom.indexOf(key);
  //return false if no transIndex
  if (index == -1) return true;

  const char = _transToKbd.substr(index, 1);
  // return transIndex
  return {
    index,
    char,
  };
};
