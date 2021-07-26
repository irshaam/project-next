import React, { Fragment, useEffect, useState } from "react";
import { Editor, Range, Transforms } from "slate";
import { ReactEditor, useSlate } from "slate-react";

import { ReactComponent as AlignCenter } from "../assets/icons/align_center.svg";
import { ReactComponent as AlignJustify } from "../assets/icons/align_justify.svg";
import { ReactComponent as AlignLeft } from "../assets/icons/align_left.svg";
import { ReactComponent as AlignRight } from "../assets/icons/align_right.svg";
import { ReactComponent as FormatBold } from "../assets/icons/format_bold.svg";
import { ReactComponent as FormatItalic } from "../assets/icons/format_italic.svg";
import { ReactComponent as FormatLink } from "../assets/icons/format_link.svg";
import { ReactComponent as FormatListUl } from "../assets/icons/list_ul.svg";
import { ReactComponent as FormatQuote } from "../assets/icons/quote.svg";
import { ReactComponent as FormatH1 } from "../assets/icons/text_large.svg";
import { ReactComponent as FormatH2 } from "../assets/icons/text_small.svg";

const getDomSelectionRange = () => {
  const domSelection = window.getSelection();
  if (domSelection === null || domSelection.rangeCount === 0) {
    return null;
  }
  return domSelection.getRangeAt(0);
};

const HoverToolBar = () => {
  const editor = useSlate();

  const { selection } = editor;
  const selectionStr = JSON.stringify(selection);
  const [isToolbarOpen, setToolbarOpen] = useState(false);
  const [editMode, setEditMode] = useState<any>("toolbar");
  const [anchorEl, setAnchorEl] = useState<any["anchorEl"]>(null);

  /**
   * Render a mark-toggling toolbar button.
   *
   * @param {String} type
   * @param {String} icon
   * @return {Element}
   */

  const renderMarkButton = (type, Image) => {
    const isActive = false;
    // const isActive = hasMark(editor, type);

    return (
      <button>
        {/* <Button reversed active={isActive} onMouseDown={(event) => this.onClickMark(event, type)}> */}
        <div>
          <Image />
        </div>
      </button>
    );
  };

  const isTextSelected =
    ReactEditor.isFocused(editor) &&
    selection !== null &&
    !Range.isCollapsed(selection) &&
    Editor.string(editor, selection) !== "";

  useEffect(() => {
    if (editMode === "toolbar") {
      if (isTextSelected) {
        const domRange = getDomSelectionRange();
        if (domRange === null) {
          return;
        }
        const rect = domRange.getBoundingClientRect();
        setAnchorEl({
          clientWidth: rect.width,
          clientHeight: rect.height,
          /**
           * This function will be called by the popper to get the
           * bounding rectangle for the selection. Since the selection
           * can change when a toolbar button is clicked, we need to
           * get a fresh selection range before computing the bounding
           * rect. (see https://stackoverflow.com/questions/63747451)
           */
          getBoundingClientRect: () => {
            const innerDomRange = getDomSelectionRange();
            return innerDomRange === null ? new DOMRect() : innerDomRange.getBoundingClientRect();
          },
        });
        setToolbarOpen(true);
      } else {
        setToolbarOpen(false);
      }
    } else {
      setToolbarOpen(false);
    }
  }, [editMode, isTextSelected, selection, selectionStr]);

  console.log(selectionStr);
  console.log(anchorEl);
  return (
    <div className="p-4 bg-black rounded-sm shadow-md text-white absolute ">
      {" "}
      {renderMarkButton("bold", FormatBold)}
      {renderMarkButton("italic", FormatItalic)}
    </div>
  );
};

export default HoverToolBar;
