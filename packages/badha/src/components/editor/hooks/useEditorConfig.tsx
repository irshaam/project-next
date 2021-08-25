/* eslint-disable @next/next/no-img-element */
import isHotkey from "is-hotkey";
import { nanoid } from "nanoid";
import { useCallback } from "react";
import { Editor, Transforms, Element, Point, Range, Text } from "slate";
import { DefaultElement } from "slate-react";

import { CustomElement } from "../../index";
import {
  ParagraphElement,
  ListItemElement,
  HeadingElement,
  QuoteElement,
  BulletedListElement,
  NumberedListElement,
  LinkElement,
  ImageElement,
} from "../elements";
import StyledText from "../styled-text";
import { isLinkNodeAtSelection, toggleStyle } from "../utils";

import { _transFrom, _transToKbd } from "@utils/thaanaKeyboard";

const useEditorConfig = (editor: any) => {
  const { isVoid } = editor;
  editor.isInline = (element: any) => ["link"].includes(element.type);

  editor.isVoid = (element: any) => {
    return ["image"].includes(element.type) || isVoid(element);
  };

  return { renderElement, KeyBindings, renderLeaf };
};

const renderElement = (props: any) => {
  switch (props.element.type) {
    case "block-quote": {
      return <QuoteElement {...props} />;
    }
    case "link":
      return <LinkElement {...props} url={props.element.url} />;
    case "heading": {
      return <HeadingElement content {...props} />;
    }
    case "paragraph": {
      return <ParagraphElement {...props} />;
    }

    case "list-item":
      return <ListItemElement {...props} />;

    case "numbered-list": {
      return <NumberedListElement {...props} />;
    }
    case "bulleted-list": {
      return <BulletedListElement {...props} />;
    }

    case "image": {
      return <ImageElement {...props} />;
    }

    default:
      return;
  }
};

const renderLeaf = (props: any) => {
  return <StyledText {...props} />;
};

const KeyBindings = {
  onKeyDown: (editor: any, event: any) => {
    // console.log(event);
    if (isHotkey("mod+b", event)) {
      toggleStyle(editor, "bold");
      return;
    }
    if (isHotkey("mod+i", event)) {
      toggleStyle(editor, "italic");
      return;
    }
    if (isHotkey("mod+c", event)) {
      toggleStyle(editor, "code");
      return;
    }
    if (isHotkey("mod+u", event)) {
      toggleStyle(editor, "underline");
      return;
    }
    if (isHotkey("mod+z", event) || isHotkey("shift+mod+z", event)) {
      return;
    }

    if (isHotkey("enter", event)) {
      console.log(editor);
      return;
    }

    // if (isHotkey("enter", event)) {
    //   const [match] = Editor.nodes(editor, {
    //     match: (n) => n.type === "heading" || n.type === "block-quote",
    //   });

    //   if (match) {
    //     event.preventDefault();
    //     Transforms.insertNodes(editor, {
    //       type: "paragraph",
    //       children: [
    //         {
    //           text: "",
    //         },
    //       ],
    //     } as CustomElement);
    //   }
    // }

    if (isHotkey("mod+enter", event)) {
      event.preventDefault();

      Transforms.insertNodes(
        editor,
        {
          type: "paragraph",
          children: [
            {
              text: "",
            },
          ],
        } as CustomElement,
        { select: true, at: editor.selection }
      );

      // if (isLinkNodeAtSelection(editor, editor.selection)) {
      //   console.log(editor);
      //   console.log(editor.selection);
      //   Transforms.unwrapNodes(editor, {
      //     match: (n) => Element.isElement(n) && n.type === "link",
      //   });
      // }
    }

    // Check if key requires translation
    var transIndex = _transFrom.indexOf(event.key);

    // If pressed does not require translation, let default actions proceed
    if (transIndex == -1 || event.ctrlKey || event.metaKey) return true;

    // Update Key
    const transChar = _transToKbd.substr(transIndex, 1);
    event.preventDefault();
    editor.insertText(transChar);
  },
};

export default useEditorConfig;
