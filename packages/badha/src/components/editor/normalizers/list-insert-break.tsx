import { Editor, Node, Range, Transforms, Path } from "slate";

import { isLastChild, isCollapsed, someNode, getNode } from "../queries";
import { isElement, TDescendant } from "../types";
const LIST_TYPES = ["numbered-list", "bulleted-list"];

export const withList = (editor: any) => {
  const { insertBreak, normalizeNode } = editor;
  editor.insertBreak = () => {
    console.log("break", editor);
    if (!editor.selection) return;

    let at = editor.selection;

    // Check if its a list item
    const isListItem = someNode(editor, { at, match: { type: "list-item" } });

    if (isListItem) {
      const selectionParent = Editor.parent(editor, at);
      if (!selectionParent) return;
      const [, paragraphPath] = selectionParent;

      // If selection range includes root list item
      if (Range.isRange(at) && !isCollapsed(at) && paragraphPath.length === 1) {
        at = at.focus.path;
      }

      const listItem =
        Editor.above(editor, {
          at,
          match: (n) => n.type === "list-item",
        }) || Editor.parent(editor, paragraphPath);

      if (!listItem) return;
      const [listItemNode, listItemPath] = listItem;

      if (listItemNode.type !== "list-item") return;

      const list = Editor.parent(editor, listItemPath);
      console.log("list", list);
      if (!list) return;

      const block = Editor.above(editor, {
        match: (n) => Editor.isBlock(editor, n),
      })?.[0];

      if (block) {
        const isAncestorEmpty = !Node.string(block) && !block.children.some((n) => Editor.isInline(editor, n));

        if (isAncestorEmpty) {
          const move = () => {
            const [listNode, listPath] = list;
            const [liNode, liPath] = listItem;
            const liParent = Editor.above(editor, {
              at: listPath,
              match: (node) => LIST_TYPES.includes(node?.type),
            });
            if (!liParent) {
              let toListPath;
              try {
                toListPath = Path.next(listPath);
              } catch (err) {
                return;
              }

              const cond = !isLastChild(list, liPath);
              if (cond) {
                const toListNode = getNode(editor, toListPath);
                if (!toListNode) return;
              }

              Transforms.setNodes(editor, {
                type: "paragraph",
                children: [
                  {
                    text: "",
                  },
                ],
              });

              Transforms.unwrapNodes(editor, { at: liPath.concat(0), match: (n) => n.type === "list-item" });
              Transforms.unwrapNodes(editor, {
                at: liPath.concat(0),
                match: (node) => LIST_TYPES.includes(node?.type),
                split: true,
              });
              // Transforms.setNodes(editor, { at: liPath.concat(0), match: (n) => n.type === "list-item" });
              return true;
            }
            const [, liParentPath] = liParent;

            const toListPath = liPath.concat([1]);

            const movedUpLiPath = Path.next(liParentPath);

            // Move li one level up: next to the li parent.
            Transforms.moveNodes(editor, {
              at: liPath,
              to: movedUpLiPath,
            });

            return true;
          };

          let moved: boolean | undefined = false;

          Editor.withoutNormalizing(editor, () => {
            moved = move();
          });

          return moved;
        }
      }

      // console.log("last child");

      // console.log("list", list);

      // console.log(isAncestorEmpty);
    }

    insertBreak();
  };

  // normlize
  editor.normalizeNode = (editor) => {
    console.log(editor);
    // if (!isElement(editor)) return;
    // console.log("asdasd", editor);
    // if (LIST_TYPES.includes(editor?.type)) {
    //   if (!node.children.length || !node.children.find((item) => (item as TDescendant).type === "list-item")) {
    //     return Transforms.removeNodes(editor, { at: path });
    //   }
    // }
    // return normalizeNode([node, path]);
  };

  return editor;
};
