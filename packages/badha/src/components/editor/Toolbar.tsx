/* eslint-disable react/display-name */
const PARAGRAPH_STYLES = ["h1", "h2", "h3", "h4", "paragraph", "multiple"];
const CHARACTER_STYLES = ["bold", "italic", "underline"];

import { useCallback } from "react";
import { useEditor, useSlateStatic } from "slate-react";

import {
  getActiveStyles,
  getTextBlockStyle,
  isLinkNodeAtSelection,
  toggleBlockType,
  toggleLinkAtSelection,
  toggleStyle,
} from "./utils/index";

const ToolBarButton = (props: any) => {
  const { icon, isActive, ...otherProps } = props;
  return (
    <button className={`px-3 text-black ${isActive ? "bg-red text-white" : "bg-white"}`} {...otherProps}>
      {/* {icon} */}
      {props.title}
    </button>
  );
};

const Toolbar = ({ selection }: { selection: any }) => {
  const editor = useSlateStatic();

  const onBlockTypeChange = useCallback(
    (targetType) => {
      if (targetType === "multiple") {
        return;
      }
      toggleBlockType(editor, targetType);
    },
    [editor]
  );

  const blockType = getTextBlockStyle(editor);

  return (
    <div className="flex items-center justify-center">
      <div className="py-4 m-2 mb-2" style={{ width: "700px" }}>
        {CHARACTER_STYLES.map((style) => (
          <ToolBarButton
            key={style}
            title={style}
            characterStyle={style}
            isActive={getActiveStyles(editor).has(style)}
            onMouseDown={(event: any) => {
              event.preventDefault();
              toggleStyle(editor, style);
            }}
          />
        ))}
        <ToolBarButton
          onMouseDown={() => toggleLinkAtSelection(editor)}
          isActive={isLinkNodeAtSelection(editor, editor.selection)}
          title="link"
        />
      </div>
    </div>
  );
};

export default Toolbar;
