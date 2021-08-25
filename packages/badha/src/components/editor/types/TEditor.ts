import { Editor } from "slate";

import { AnyObject } from "../utils/any-objects";

import { TDescendant } from "./TDescendant";

export type TEditor<TExtension = AnyObject> = Editor &
  TExtension &
  AnyObject & {
    children: TDescendant[];
  };
