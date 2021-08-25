import { SearchIcon, UploadIcon } from "@heroicons/react/outline";
import isHotkey from "is-hotkey";
import { useSession } from "next-auth/client";
import { useRef, createRef, useCallback, useState } from "react";
import { Editor, Transforms } from "slate";
import { useSlateStatic, useFocused, useSelected } from "slate-react";

import client from "@/api/client";

/* eslint-disable @next/next/no-img-element */
export const ImageElement = ({ attributes, children, element }) => {
  const [isEditingCaption, setEditingCaption] = useState(false);
  const [caption, setCaption] = useState(element.caption);
  const captionInput = useRef<any>();
  const editor = useSlateStatic();
  const selected = useSelected();
  const focused = useFocused();
  const inputFile = useRef<any>(null);
  const [session] = useSession();

  const applyCaptionChange = useCallback(
    (captionInput) => {
      const imageNodeEntry = Editor.above(editor, {
        match: (n) => n.type === "image",
      });
      if (imageNodeEntry == null) {
        return;
      }

      if (captionInput != null) {
        setCaption(captionInput);
      }

      Transforms.setNodes(editor, { caption: captionInput }, { at: imageNodeEntry[1] });
    },
    [editor, setCaption]
  );

  const onCaptionChange = useCallback(
    (event) => {
      setCaption(event.target.value);
    },
    [editor.selection, setCaption]
  );

  const onKeyDown = useCallback(
    (event) => {
      if (!isHotkey("enter", event)) {
        return;
      }

      applyCaptionChange(event.target.value);
      setEditingCaption(false);
    },
    [applyCaptionChange, setEditingCaption]
  );

  const onToggleCaptionEditMode = useCallback(
    (event) => {
      const wasEditing = isEditingCaption;
      setEditingCaption(!isEditingCaption);
      wasEditing && applyCaptionChange(caption);
    },
    [editor.selection, isEditingCaption, applyCaptionChange, caption]
  );

  const handleMediaUpload = async (file: any) => {
    const formData = new FormData();

    formData.append("file", file);
    formData.append("type", "media");

    const uploadMedia = client.post("/media/upload", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${session?.access_token}`,
      },
    });

    // toast.promise(uploadMedia, {
    //   loading: "Upload  media...",
    //   success: <b>Media uploaded!</b>,
    //   error: <b>Upload Media failed.</b>,
    // });

    const { data: response } = await uploadMedia;

    const media = {
      url: `${process.env.NEXT_PUBLIC_IMGIX_CDN_URL}/${response.path}`,
      type: response.type,
      path: `/${response.path}`,
      meta: {
        thumbnail: `${process.env.NEXT_PUBLIC_IMGIX_CDN_URL}/${response.path}`,
        caption: {
          text: "",
          creditsTo: "",
        },
      },
    };
    // setMedia(media);
    // props.onChange(media);
    // setImage(`${process.env.NEXT_PUBLIC_CDN_URL}/${upload.data.path}`);
  };
  return (
    <div className="flex items-center justify-center" contentEditable={false} {...attributes}>
      <div
        // className={classNames({
        //   "image-container": true,
        // })}
        className=" w-editor"
      >
        <button className="bg-black text-white px-2" onClick={onToggleCaptionEditMode} type="button">
          Caption
        </button>

        <div>
          <input
            type="file"
            name="file"
            className="hidden"
            ref={inputFile}
            onChange={(event: any) => handleMediaUpload(event.currentTarget?.files[0])}
          />
        </div>

        {/*upload thingy */}

        <div className="w-full h-full  flex items-center justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
          <div className="space-y-1 text-center">
            <svg
              className="mx-auto h-12 w-12 text-gray-400"
              stroke="currentColor"
              fill="none"
              viewBox="0 0 48 48"
              aria-hidden="true"
            >
              <path
                d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <div className="flex mt-5 text-sm text-gray-600">
              <button
                disabled
                type="button"
                className=" disabled:opacity-50 mr-3 inline-flex items-center px-2 py-1.5 border border-gray-300 shadow-sm text-xs font-medium rounded text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                <SearchIcon className="-ml-1 mr-2 h-4 w-4 text-gray-400" />
                Search
              </button>

              {/* manual uploads */}

              <button
                onClick={() => {
                  inputFile.current?.click();
                }}
                type="button"
                className=" ml-2 inline-flex items-center px-2 py-1.5 border border-gray-300 rounded-md shadow-sm text-xs font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-50 focus:ring-purple-500"
              >
                <UploadIcon className="-ml-1 mr-2 h-4 w-4 text-gray-400" />
                Upload
              </button>

              {/* manual upload  */}
            </div>
          </div>
        </div>
        <img src={String(element.url)} alt={element.caption} className={"image"} />
        <div className={"image-caption-read-mode"}>
          {isEditingCaption ? (
            <input
              ref={captionInput}
              type="text"
              autoFocus={true}
              defaultValue={element.caption}
              onKeyDown={onKeyDown}
              onChange={onCaptionChange}
              onBlur={onToggleCaptionEditMode}
              className="w-full"
              placeholder="ކެޕްޝަން"
            />
          ) : (
            <div className={"image-caption-read-mode"} onClick={onToggleCaptionEditMode}>
              {caption}
            </div>
          )}
        </div>
      </div>
      {children}
    </div>
  );
};
