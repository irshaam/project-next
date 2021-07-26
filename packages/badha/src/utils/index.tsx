export * from "./thaana-transliterator";

import { ImageLoaderProps } from "next/image";

export const classNames = (...classes: string[]) => {
  return classes.filter(Boolean).join(" ");
};

export const getThaanaChar = (char: string): string => {
  const keyMap = {
    q: "ް",
    w: "އ",
    e: "ެ",
    r: "ރ",
    t: "ތ",
    y: "ޔ",
    u: "ު",
    i: "ި",
    o: "ޮ",
    p: "ޕ",
    a: "ަ",
    s: "ސ",
    d: "ދ",
    f: "ފ",
    g: "ގ",
    h: "ހ",
    j: "ޖ",
    k: "ކ",
    l: "ލ",
    z: "ޒ",
    x: "×",
    c: "ޗ",
    v: "ވ",
    b: "ބ",
    n: "ނ",
    m: "މ",
    Q: "ޤ",
    W: "ޢ",
    E: "ޭ",
    R: "ޜ",
    T: "ޓ",
    Y: "ޠ",
    U: "ޫ",
    I: "ީ",
    O: "ޯ",
    P: "÷",
    A: "ާ",
    S: "ށ",
    D: "ޑ",
    F: "ﷲ",
    G: "ޣ",
    H: "ޙ",
    J: "ޛ",
    K: "ޚ",
    L: "ޅ",
    Z: "ޡ",
    X: "ޘ",
    C: "ޝ",
    V: "ޥ",
    B: "ޞ",
    N: "ޏ",
    M: "ޟ",
    ",": "،",
    ";": "؛",
    "?": "؟",
    "<": ">",
    ">": "<",
    "[": "]",
    "]": "[",
    "(": ")",
    ")": "(",
    "{": "}",
    "}": "{",
  };

  return keyMap[char] || char;
};

export const imageLoader = ({ src, width, quality }: ImageLoaderProps) => {
  return `${process.env.CDN_URL}/${src}?w=${width}&q=${quality || 75}`;
};
