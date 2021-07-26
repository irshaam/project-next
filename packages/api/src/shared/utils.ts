import { alphanumeric } from 'nanoid-dictionary';
import { customAlphabet } from 'nanoid/async';

export const nanoid = customAlphabet(alphanumeric, 9);
