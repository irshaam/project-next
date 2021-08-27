import { PlusCircleIcon, XCircleIcon } from "@heroicons/react/outline";
import { forwardRef, useEffect, useRef, useState } from "react";
import { Editor, Range, Transforms, Element as SlateElement } from "slate";
import { ReactEditor, useFocused, useSelected, useSlateStatic } from "slate-react";

import { CustomElement } from "..";
import BulletList from "../icons/bullet-list.svg";
import Embed from "../icons/embed.svg";
import Heading from "../icons/heading.svg";
import ImageGallery from "../icons/image-gallery.svg";
import SingleImage from "../icons/image.svg";
import NumberList from "../icons/number-list.svg";
import Paragraph from "../icons/paragraph.svg";
import Quote from "../icons/top-quote.svg";
import Video from "../icons/video.svg";

import {
  BULLET_LIST,
  HEADING,
  IMAGE_GALLERY,
  IMAGE_SINGLE,
  insertNode,
  NUMBERED_LIST,
  PARAGRAPH,
  QUOTE,
} from "./defaults";
import MenuItem from "./menu-item";

// eslint-disable-next-line react/display-name
const SideToolbar = forwardRef((props: any, ref: any) => {
  const editor = useSlateStatic();
  const refEl = useRef<any>();
  const [open, setOpen] = useState<boolean>(false);
  const toggleMenu = () => {
    setOpen((open) => !open);
  };

  const { selection, previousSelection } = props;

  // const editor = useSlateStatic();
  const focused = useFocused();
  const selected = useSelected();

  const addNode = () => {
    // console.log("adding new node");

    // Transforms.setNodes(props.editor, { type: "heading", children: [{ text: "..." }] } as CustomElement, {
    //   at: props.selection,
    // });
    // console.log(editor);
    // Transforms.insertNodes(props.editor, { type: "heading", children: [{ text: "...." }] } as CustomElement, {
    //   at: props.previousSelection,
    //   select: true,
    // });

    Transforms.setNodes(editor, { type: "heading" } as Partial<SlateElement>);

    // Transforms.console.log(props);

    // Transforms.insertNodes(editor, heading);
  };

  const addParagraphNode = () => {
    console.log(editor);
    console.log(props.previousSelection);
    console.log(props.selection);

    Transforms.insertNodes(props.editor, { type: "paragraph", children: [{ text: "" }] } as CustomElement, {
      at: props.previousSelection != null ? props.previousSelection : props.selection,
      select: true,
    });

    const addBlock = (type: string) => {
      const node = insertNode(type);
      Transforms.insertNodes(props.editor, node as CustomElement, {
        at: props.previousSelection,
        select: true,
      });
    };
  };

  const addBlock = (type: string) => {
    const node = insertNode(type);
    Transforms.insertNodes(props.editor, node as CustomElement, {
      at: props.previousSelection,
      select: true,
    });
  };

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

    const getDomSelectionRange = () => {
      const domSelection = window.getSelection();
      if (domSelection === null || domSelection.rangeCount === 0) {
        return null;
      }
      return domSelection.getRangeAt(0);
    };

    return {
      top,
      right,
      bottom,
      left,
      width: right - left,
      height: bottom - top,
    };
  };
  useEffect(() => {
    const el = refEl.current;

    if (!el) {
      return;
    }

    // if (
    //   !selection ||
    //   !ReactEditor.isFocused(editor) ||
    //   Range.isCollapsed(selection) ||
    //   Editor.string(editor, selection) === ""
    // ) {
    //   el.removeAttribute("style");
    //   return;
    // }

    if (!selection) return;
    // console.log(Range.isCollapsed(selection));
    if (selection && selection.anchor === null) return;
    const selectedNode = editor.children[selection?.anchor.path[0]] as CustomElement;
    // console.log("selectedNode:", selectedNode);
    const isParagraph = selectedNode.type === "paragraph";
    // console.log("isParagraph:", isParagraph);
    const isEmptyText = selectedNode.children[0].text?.length === 0;
    // console.log("isEmptyText:", isEmptyText);
    if (isParagraph && isEmptyText) {
      // reposition menu
      // console.log(editor);
      // const { editorId = 0 } = this.props;

      // const sideMenu = this.sideMenu;
      // if (!sideMenu) return;
      const selection = window.getSelection();
      if (!selection) return;
      // if (selection.rangeCount === 0) return;

      const childrenRect = getRangeBoundingClientRect(selection.getRangeAt(0));

      const parentRect = props.parent.current.getBoundingClientRect();

      // console.log(parentRect);

      const rect = {
        ...childrenRect,
        top: childrenRect.top - parentRect.top,
        left: childrenRect.left - parentRect.left,
      };

      const top = rect.top - (15 - rect.height / 2);
      const left = rect.left + 10;

      let menu = el;

      if (menu) {
        menu.style.opacity = "1";
        // menu.style.color = "red";
        menu.style.top = `${top}px`;
        menu.style.left = `${left}px`;
      }
      // reposition menu
    } else {
      el.removeAttribute("style");
      el.style.top = `-100000px`;
      el.style.left = `-100000px`;
    }
  });

  return (
    <div
      ref={refEl}
      className="flex items-start absolute z-50"
      style={{ marginRight: "-32px", left: "-100000px", top: "-100000px" }}
    >
      <button
        type="button"
        onMouseDown={toggleMenu}
        // onClick={toggleMenu}
        className="text-gray-400 hover:text-red transition-colors delay-75 ease-linear focus:outline-none"
      >
        {open ? (
          <XCircleIcon className=" h-8 w-8" aria-hidden="true" />
        ) : (
          <PlusCircleIcon className=" h-8 w-8" aria-hidden="true" />
        )}
      </button>
      {open && (
        <div
          className="shadow px-4 py-2 sm:rounded-sm overflow-scroll "
          style={{ background: "#DBD2CD", width: "312px", maxHeight: "376px" }}
        >
          <div>
            {/* <div className="text-xs font-bold text-gray-500 py-2">PRIMARY</div>
            <button
              type="button"
              onMouseDown={(e) => {
                e.preventDefault();
                Transforms.insertNodes(props.editor, { type: "heading", children: [{ text: "" }] } as CustomElement, {
                  at: props.previousSelection != null ? props.previousSelection : props.selection,
                  select: true,
                });
              }}
            >
              Addd
            </button>
            <MenuItem addBlock={addNode} /> */}
            <div className="text-xs font-bold text-gray-500 py-2">BASIC BLOCKS</div>
            <MenuItem
              icon={<Paragraph />}
              name="Paragrph"
              description="Just start with a plain text."
              onAddBlock={() => addBlock(PARAGRAPH)}
            />
            <MenuItem
              icon={<Heading />}
              name="Heading"
              description="Big section heading"
              onAddBlock={() => addBlock(HEADING)}
            />
            <MenuItem
              icon={<Quote />}
              name="Blockquote"
              description="Capture a quote"
              onAddBlock={() => addBlock(QUOTE)}
            />
            <MenuItem
              icon={<NumberList />}
              name="Numbered List"
              description="Create a simple numbered list"
              onAddBlock={() => addBlock(NUMBERED_LIST)}
            />
            <MenuItem
              icon={<BulletList />}
              name="Bullet List"
              description="Create a simple bullet list"
              onAddBlock={() => addBlock(BULLET_LIST)}
            />

            <div className="text-xs font-bold text-gray-500 py-2">MEDIA</div>
            <MenuItem
              icon={<SingleImage />}
              name="Image"
              description="Add an image"
              onAddBlock={() => addBlock(IMAGE_SINGLE)}
            />
            {/* <MenuItem
              icon={<ImageGallery />}
              name="Image Gallery"
              description="Create simple image gallery"
              onAddBlock={() => addBlock(IMAGE_GALLERY)}
            /> */}
            {/* <MenuItem
              icon={<Video />}
              name="Video"
              description="Add a new video"
              onAddBlock={() => addBlock(SINGLE_VIDEO)}
            /> */}
            {/* <div className="text-xs font-bold text-gray-500 py-2">EMBED</div> */}
            {/* <MenuItem
              icon={<Embed />}
              name="Embed"
              description="Create a embed from link"
              onAddBlock={() => addBlock(EMBED)}
            /> */}
          </div>
        </div>
      )}
    </div>
  );
});

export default SideToolbar;
