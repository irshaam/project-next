import React, { useEffect, useMemo, useState, useCallback } from "react";
``;
import { createEditor, BaseEditor, Transforms, Descendant, Editor, Text } from "slate";
import { Slate, Editable, withReact, ReactEditor } from "slate-react";

import SideMenu from "./side-menu";

export type CodeElement = { type: "code"; children: CustomText[] };

export type ParagraphElement = {
  type: "paragraph" | null;
  children: CustomText[];
};

export type CustomElement = ParagraphElement | CodeElement;

type CustomText = { text: string | null; bold?: boolean | null };

const _transFrom = "qwertyuiop[]\\asdfghjkl;'zxcvbnm,./QWERTYUIOP{}|ASDFGHJKL:\"ZXCVBNM<>?()";
const _transToKbd = "ްއެރތޔުިޮޕ][\\ަސދފގހޖކލ؛'ޒ×ޗވބނމ،./ޤޢޭޜޓޠޫީޯ÷}{|ާށޑﷲޣޙޛޚޅ:\"ޡޘޝޥޞޏޟ><؟)(";

declare module "slate" {
  interface CustomTypes {
    Editor: BaseEditor & ReactEditor;
    Element: CustomElement;
    Text: CustomText;
  }
}

const CustomEditor = {
  isBoldMarkActive(editor: any) {
    const [match]: any = Editor.nodes(editor, {
      match: (n: any) => n.bold === true,
      universal: true,
    });

    return !!match;
  },

  isCodeBlockActive(editor: any) {
    const [match]: any = Editor.nodes(editor, {
      match: (n: any) => n.type === "code",
    });

    return !!match;
  },

  toggleBoldMark(editor: any) {
    const isActive = CustomEditor.isBoldMarkActive(editor);
    Transforms.setNodes(editor, { bold: isActive ? null : true }, { match: (n) => Text.isText(n), split: true });
  },

  toggleCodeBlock(editor: any) {
    const isActive = CustomEditor.isCodeBlockActive(editor);
    Transforms.setNodes(editor, { type: isActive ? null : "code" }, { match: (n) => Editor.isBlock(editor, n) });
  },
};

const CodeElement = (props: any) => {
  return (
    <pre {...props.attributes}>
      <code>{props.children}</code>
    </pre>
  );
};

const DefaultElement = (props: any) => {
  return (
    <div className="flex items-center justify-center">
      <p {...props.attributes} style={{ width: "680px", marginBottom: "60px" }}>
        {props.children}
      </p>
    </div>
  );
};

const Leaf = (props: any) => {
  return (
    <span {...props.attributes} className={props.leaf.bold && "font-mv-typewriter-bold"}>
      {props.children}
    </span>
  );
};

export const PostEditor = (props: any) => {
  const { value } = props;
  const editor = useMemo(() => withReact(createEditor()), []);

  // const [value, setValue] = useState<any[]>([
  //   {
  //     type: "paragraph",
  //     children: [{ text: "" }],
  //   },
  // ]);

  const renderElement = useCallback((props) => {
    switch (props.element.type) {
      case "code":
        return <CodeElement {...props} />;
      default:
        return <DefaultElement {...props} />;
    }
  }, []);

  const renderLeaf = useCallback((props) => {
    return <Leaf className="bg-blue-500" {...props} />;
  }, []);
  const handleChange = (value: any) => props.onChange(value);
  return (
    <div style={{ width: "1400px" }} className="relative">
      {/* <div className="border border-gray-500" style={{ width: "1400px" }}> */}

      <SideMenu />
      <Slate editor={editor} value={value} onChange={handleChange}>
        {/* <div>
          <button
            className="bg-red text-sm mr-4 rounded-sm text-white"
            onMouseDown={(event) => {
              event.preventDefault();
              CustomEditor.toggleBoldMark(editor);
            }}
          >
            Bold
          </button>
          <button
            className="bg-red text-sm mr-4 rounded-sm text-white"
            onMouseDown={(event) => {
              event.preventDefault();
              CustomEditor.toggleCodeBlock(editor);
            }}
          >
            Code Block
          </button>
        </div> */}
      </Slate>
    </div>
  );
};
