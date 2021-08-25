import React, { useCallback, useEffect, useMemo, useState, createRef, useRef, forwardRef } from "react";
import { createEditor, BaseEditor, Editor, Transforms, Node, Range, Element as SlateElement, KeyUtils } from "slate";
import { withHistory } from "slate-history";
import { Slate, Editable, withReact, ReactEditor, useSlate, useFocused, useSlateStatic } from "slate-react";

import { useEditorConfig, useSelection } from "./hooks";
import { HoverToolbar } from "./hover-toolbar";
import { withNodeId } from "./normalizers/create-node-id";
import { withList } from "./normalizers/list-insert-break";
import { withDeleteEmptyBlock } from "./plugins/delete-empty-block";
import { SideToolbar } from "./side-toolbar";

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

  const editor = useMemo(() => withDeleteEmptyBlock(withNodeId(withList(withHistory(withReact(createEditor()))))), []);

  const { renderElement, KeyBindings, renderLeaf } = useEditorConfig(editor);

  const onKeyDown = useCallback((event) => KeyBindings.onKeyDown(editor, event), [KeyBindings, editor]);

  const [previousSelection, selection, setSelection] = useSelection(editor);

  /**
   * Handle Editor Changes
   */
  const onChangeHandler = useCallback(
    (document) => {
      onChange(document);
      setSelection(editor.selection);
    },
    [onChange, setSelection, editor]
  );

  // const handleFocus = useCallback((event, editor) => {
  //   editor.focus();
  //   onfocus?.(editor);
  // }, []);

  return (
    <div style={{ width: "1400px" }} className="relative" ref={editorRef}>
      <Slate editor={editor} value={document} onChange={onChangeHandler}>
        <HoverToolbar selection={selection} />

        {/* <BlockButton format="numbered-list" icon="format_list_numbered" /> */}
        {/* <BlockButton format="bulleted-list" icon="format_list_bulleted" /> */}
        {/* <BlockButton format="block-quote" icon="format_list_bulleted" /> */}

        <SideToolbar
          open={true}
          ref={sideMenu}
          selection={selection}
          previousSelection={previousSelection}
          editor={editor}
          parent={editorRef}
        />
        <Editable
          // onDOMBeforeInput={(event: InputEvent) => {
          //   event.preventDefault();
          //   switch (event.inputType) {
          //     case "formatBold":
          //       return toggleBlock(editor, "bold");
          //     case "formatItalic":
          //       return toggleBlock(editor, "italic");
          //     case "formatUnderline":
          //       return toggleBlock(editor, "underlined");
          //   }
          // }}
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
              element.scrollIntoView({ behavior: "smooth", block: "nearest" });
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
          // onFocus={handleFocus}
          autoFocus={true}
        ></Editable>
      </Slate>
    </div>
  );
};
