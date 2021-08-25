import { Text } from "slate";

import { AnyObject } from "../utils/any-objects";

export type TText<TExtension = AnyObject> = Text & TExtension & AnyObject;

export const isText: <TExtension = AnyObject>(value: any) => value is TText<TExtension> = Text.isText as any;
