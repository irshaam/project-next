import React, { useCallback, useEffect, useMemo, useState, createRef, useRef, forwardRef } from "react";
import { createEditor, BaseEditor, Editor, Transforms, Node, Range, Element as SlateElement } from "slate";
// import HoverToolBar from "./hover-toolbar";
import { withHistory } from "slate-history";
import { Slate, Editable, withReact, ReactEditor, useSlate, useFocused } from "slate-react";

import useSelection from "../../hooks/useSelection";

import useEditorConfig from "./editorConfig";
import SideMenu from "./side-menu";
import Toolbar from "./Toolbar";
/**
 * Thaana Transformation Stuff
 */

type CustomText = { text: string; bold?: boolean; italic?: boolean; underline?: boolean };

export type ParagraphElement = {
  type: "paragraph" | null;
  children: CustomText[];
};
export type HeadingElement = {
  type: "heading";
  children: CustomText[];
};
export type CodeElement = { type: "code" | null; children: CustomText[] };
export type CustomElement = ParagraphElement | CodeElement | HeadingElement;
declare module "slate" {
  interface CustomTypes {
    Editor: BaseEditor & ReactEditor;
    Eelememt: CustomElement;
    Text: CustomText;
  }
}

export const PostEditor = (props: any) => {
  const { document, onChange } = props;
  const sideMenu = createRef<any>();
  const editorRef = createRef<any>();
  const hoverMenu = createRef<any>();
  const editor = useMemo(() => withHistory(withReact(createEditor())), []);
  const { renderElement, KeyBindings, renderLeaf } = useEditorConfig(editor);

  const onKeyDown = useCallback((event) => KeyBindings.onKeyDown(editor, event), [KeyBindings, editor]);

  // const handleKeyDown = (event: any) => {
  //   if (event.ctrlKey) {
  //     switch (event.key) {
  //       case "b": {
  //         event.preventDefault();

  //         //do some bold actions
  //         break;
  //       }
  //       case "c": {
  //         event.preventDefault();

  //         // do some copy actions
  //         break;
  //       }
  //       case "i": {
  //         event.preventDefault();

  //         // do some italic
  //         break;
  //       }
  //       case "u": {
  //         event.preventDefault();

  //         // do some underline stuff here
  //         break;
  //       }
  //       case "v": {
  //         event.preventDefault();

  //         // do some paste
  //         break;
  //       }
  //     }
  //   } else {
  //     var transIndex = _transFrom.indexOf(event.key);
  //     // If pressed does not require translation, let default actions proceed
  //     if (transIndex == -1) return true;
  //     const transChar = _transToKbd.substr(transIndex, 1);
  //     event.preventDefault();
  //     editor.insertText(transChar);
  //   }
  // };

  const [previousSelection, selection, setSelection] = useSelection(editor);

  useEffect(() => {
    // if (!selection) return;
    // // console.log(Range.isCollapsed(selection));
    // if (selection && selection.anchor === null) return;
    // const selectedNode = editor.children[selection?.anchor.path[0]] as CustomElement;
    // // console.log("selectedNode:", selectedNode);
    // const isParagraph = selectedNode.type === "paragraph";
    // // console.log("isParagraph:", isParagraph);
    // const isEmptyText = selectedNode.children[0].text.length === 0;
    // // console.log("isEmptyText:", isEmptyText);
    // if (isParagraph && isEmptyText) {
    //   repositionSideMenu();
    // } else {
    //   sideMenu.current.removeAttribute("style");
    //   sideMenu.current.style.top = `-100000px`;
    //   sideMenu.current.style.left = `-100000px`;
    // }
    // const isTextSelected =
    //   ReactEditor.isFocused(editor) &&
    //   selection !== null &&
    //   !Range.isCollapsed(selection) &&
    //   Editor.string(editor, selection) !== "";
    // if (isTextSelected) {
    //   repositionMenu();
    // } else {
    //   hoverMenu.current.removeAttribute("style");
    //   hoverMenu.current.style.top = `-100000px`;
    //   hoverMenu.current.style.left = `-100000px`;
    // }
  });

  const getRangeBoundingClientRect = (range: any) => {
    var rects = range.getClientRects();
    var top = 0;
    var right = 0;
    var bottom = 0;
    var left = 0;

    if (rects.length) {
      ({ top, right, bottom, left } = rects[0]);
      for (var ii = 1; ii < rects.length; ii++) {
        var rect = rects[ii];

        if (rect.height !== 0 || rect.width !== 0) {
          top = Math.min(top, rect.top);
          right = Math.max(right, rect.right);
          bottom = Math.max(bottom, rect.bottom);
          left = Math.min(left, rect.left);
        }
      }
    }
    return {
      top,
      right,
      bottom,
      left,
      width: right - left,
      height: bottom - top,
    };
  };

  const getDomSelectionRange = () => {
    const domSelection = window.getSelection();
    if (domSelection === null || domSelection.rangeCount === 0) {
      return null;
    }
    return domSelection.getRangeAt(0);
  };

  const repositionMenu = () => {
    const menu = hoverMenu.current;
    if (!menu) return;

    const domRange = getDomSelectionRange();
    if (domRange === null) {
      return;
    }
    const childrenRect = domRange.getBoundingClientRect();
    const parentRect = editorRef.current.getBoundingClientRect();

    let rect = {
      ...childrenRect,
      top: childrenRect.top - parentRect.top,
      left: childrenRect.left - parentRect.left,
    };

    let top = rect.top - menu.offsetHeight;
    let left = rect.left - menu.offsetWidth / 2 + childrenRect.width / 2;
    menu.style.top = `${top}px`;
    menu.style.left = `${left < 0 ? 0 : left}px`;

    console.log(top, left);
    // const menu = hoverMenu.current;
    // if (!menu) return;
    // const childrenRect = getRangeBoundingClientRect(selection.getRangeAt(0));
    // // This is a fix for the link doing weird things
    // if (childrenRect.top === 0 && childrenRect.left === 0) {
    //   return;
    // }
    // const parentRect = editorRef.current.getBoundingClientRect();
    // const rect = {
    //   ...childrenRect,
    //   top: childrenRect.top - parentRect.top,
    //   left: childrenRect.left - parentRect.left,
    // };
    // let top = rect.top - menu.offsetHeight;
    // let left = rect.left - menu.offsetWidth / 2 + rect.width / 2;
    // const $menuArrow = menu.querySelector("#menu-arrow");
    // menu.style.opacity = 1;

    // $menuArrow.style.left = left < 0 ? `calc(50% + ${left}px)` : "50%";
  };

  const repositionSideMenu = () => {
    console.log(editor);
    // const { editorId = 0 } = this.props;

    // const sideMenu = this.sideMenu;
    // if (!sideMenu) return;
    const selection = window.getSelection();
    if (!selection) return;
    // if (selection.rangeCount === 0) return;

    const childrenRect = getRangeBoundingClientRect(selection.getRangeAt(0));
    const parentRect = editorRef.current.getBoundingClientRect();

    const rect = {
      ...childrenRect,
      top: childrenRect.top - parentRect.top,
      left: childrenRect.left - parentRect.left,
    };

    const top = rect.top - (15 - rect.height / 2);
    const left = rect.left;

    let menu = sideMenu.current;

    if (menu) {
      menu.style.opacity = "1";
      menu.style.color = "red";
      menu.style.top = `${top}px`;
      menu.style.left = `${left}px`;
    }
  };
  /**
   * Handle Editor Changes
   */
  const onChangeHandler = useCallback(
    (document) => {
      onChange(document);
      setSelection(editor.selection);
      // console.log(editor);
    },
    [onChange, setSelection, editor]
  );

  const LIST_TYPES = ["numbered-list", "bulleted-list"];

  const isBlockActive = (editor, format) => {
    const [match] = Editor.nodes(editor, {
      match: (n) => !Editor.isEditor(n) && SlateElement.isElement(n) && n.type === format,
    });

    return !!match;
  };

  const toggleBlock = (editor, format) => {
    const isActive = isBlockActive(editor, format);
    const isList = LIST_TYPES.includes(format);

    Transforms.unwrapNodes(editor, {
      match: (n) => LIST_TYPES.includes(!Editor.isEditor(n) && SlateElement.isElement(n) && n.type),
      split: true,
    });
    const newProperties: Partial<SlateElement> = {
      type: isActive ? "paragraph" : isList ? "list-item" : format,
    };
    Transforms.setNodes(editor, newProperties);

    if (!isActive && isList) {
      const block = { type: format, children: [] };
      Transforms.wrapNodes(editor, block);
    }
  };

  const BlockButton = ({ format, icon }) => {
    const editor = useSlate();
    return (
      <button
        className="bg-gray-500 p-4 m-2"
        type="submit"
        onMouseDown={(event) => {
          event.preventDefault();
          toggleBlock(editor, format);
        }}
      >
        {format}
      </button>
    );
    // return (
    //   <Button
    //     active={isBlockActive(editor, format)}
    //     onMouseDown={(event) => {
    //       event.preventDefault();
    //       toggleBlock(editor, format);
    //     }}
    //   >
    //     <Icon>{icon}</Icon>
    //   </Button>
    // );
  };

  return (
    // <div style={{ width: "800px" }} className="relative" >
    <div style={{ width: "1400px" }} className="relative" ref={editorRef}>
      <Slate editor={editor} value={document} onChange={onChangeHandler}>
        {/* <div ref={hoverMenu} className="p-4 bg-black rounded-sm shadow-md text-white absolute z-50 ">
          Hover Menu
        </div> */}
        <Toolbar selection={selection} />

        {/* <BlockButton format="numbered-list" icon="format_list_numbered" />
        <BlockButton format="bulleted-list" icon="format_list_bulleted" />
        <BlockButton format="block-quote" icon="format_list_bulleted" /> */}

        <SideMenu
          open={true}
          ref={sideMenu}
          selection={selection}
          previousSelection={previousSelection}
          editor={editor}
        />
        <Editable
          onSelect={(e) => {
            /**
             * Chrome doesn't scroll at bottom of the page. This fixes that.
             */
            if (!(window as any).chrome) return;
            if (editor.selection == null) return;
            try {
              /**
               * Need a try/catch because sometimes you get an error like:
               *
               * Error: Cannot resolve a DOM node from Slate node: {"type":"p","children":[{"text":"","by":-1,"at":-1}]}
               */
              const domPoint = ReactEditor.toDOMPoint(editor, editor.selection.focus);
              const node = domPoint[0];
              if (node == null) return;
              const element = node.parentElement;
              if (element == null) return;
              element.scrollIntoView({ behavior: "smooth", block: "center" });
            } catch (e) {
              /**
               * Empty catch. Do nothing if there is an error.
               */
            }
          }}
          renderElement={renderElement}
          renderLeaf={renderLeaf}
          placeholder="..."
          spellCheck={false}
          dir="rtl"
          style={{ fontSize: "22px", lineHeight: "44px" }}
          className="thaana font-mv-typewriter"
          // className="border border-gray-600 thaana font-mv-typewriter"
          onKeyDown={onKeyDown}
          autoFocus
        ></Editable>
      </Slate>
    </div>
  );
};

// const editor = withReact(createEditor());

// const CustomEditor = {
//   isCodeBlockActive(editor: any) {
//     const [match]: any = Editor.nodes(editor, {
//       match: (n: any) => n.type === "code",
//     });

//     return !!match;
//   },

//   toggleCodeBlock(editor: any) {
//     const isActive = CustomEditor.isCodeBlockActive(editor);
//     Transforms.setNodes(editor, { type: isActive ? null : "code" }, { match: (n) => Editor.isBlock(editor, n) });
//   },
// };
