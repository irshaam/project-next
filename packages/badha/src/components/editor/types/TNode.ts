import { AnyObject } from "../utils/any-objects";

import { TEditor } from "./TEditor";
import { TElement } from "./TElement";
import { TText } from "./TText";

export type TNode<TExtension = AnyObject> = TEditor<TExtension> | TElement<TExtension> | TText<TExtension>;
