import { Range, Transforms, Editor, Element as SlateElement } from "slate";

import { CustomElement } from "../index";

const isBlockActive = (editor, format) => {
  const [match] = Editor.nodes(editor, {
    match: (n) => !Editor.isEditor(n) && SlateElement.isElement(n) && n.type === format,
  });

  return !!match;
};

const LIST_TYPES = ["numbered-list", "bulleted-list"];
export const toggleBlock = (editor, format) => {
  console.log(format);
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
    // <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    //   <path
    //     strokeLinecap="round"
    //     strokeLinejoin="round"
    //     strokeWidth={2}
    //     d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"
    //   />
    // </svg>;
    const block = { type: format, children: [] };
    Transforms.wrapNodes(editor, block);
  }
};

export const withDeleteEmptyBlock = (editor: any) => {
  const { deleteBackward } = editor;

  editor.deleteBackward = (unit: any) => {
    const { selection } = editor;

    if (selection && selection.focus.offset === 0 && selection.anchor.offset === 0 && Range.isCollapsed(selection)) {
      const node = editor.children[selection.anchor.path[0]] as CustomElement | undefined;
      if (LIST_TYPES.includes(node?.type) && node.children.length === 1) {
        toggleBlock(editor, "paragraph");
      }
      deleteBackward(unit);
    } else {
      deleteBackward(unit);
    }
  };

  return editor;
};
