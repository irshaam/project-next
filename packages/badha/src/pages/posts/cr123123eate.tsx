import { CogIcon } from "@heroicons/react/outline";
import React, { useState } from "react";

export async function getStaticProps(context: any) {
  //  get tag types
  const tagsReponse = await fetch("http://localhost:5000/tags");
  const tags = await tagsReponse.json();

  return {
    props: {
      tags,
    }, // will be passed to the page component as props
  };
}

import { EditorLayout, PostEditor } from "../../components";
import ThaanaInput from "../../components/form/input-thaana";

import PostSettings from "./settings";

const CreatePost = ({ tags }) => {
  const [showSettings, setShowSettings] = useState<boolean>(true);
  const [document, updateDocument] = useState<any[]>([
    {
      type: "heading",
      children: [{ text: "އެއާ ޓްރެފިކް ކޮންޓްރޯލް ބޭރު މީހުންނަށް ދޭން ނިންމި ނިންމުން ބަދަލުކޮށްފި" }],
    },
    {
      type: "paragraph",
      children: [
        {
          text: "ބޭރުގެ 100 ޕަސެންޓް ހިއްސާވާ ކުންފުނިތަކަށް އެއާޕޯޓާ އެކު، އެއާ ޓްރެފިކް ކޮންޓްރޯލް ހިންގަން ހުއްދަ ދޭން އިއްޔެ ނިންމި ނިންމުން ސަރުކާރުން ބަދަލުކޮށްފި އެވެ",
        },
      ],
    },
  ]);

  // const handleChange = (value: any) => setValue(value);
  return (
    <EditorLayout>
      <div style={{ width: "1400px", paddingTop: "70px" }}>
        {/* EDITOR */}
        {/* <div className=" max-w-lg bg-gray-200 whitespace-normal fixed left-0 top-0 mt-24 ml-5">
          <pre>
            <code className="text-xs whitespace-code-wrap">{JSON.stringify(document, null, 2)}</code>
          </pre>
        </div> */}
        <div className="w-full flex items-center flex-col">
          {/* <div className="flex flex-col " style={{ width: "680px", marginBottom: "30px" }}>
            <input
              type="text"
              placeholder=" ސުރުޚީ"
              // value="ޓީޗަރަކު ދަރިވަރުންތަކަކަށް ޖިންސީ ގޯނާކުރި މައްސަލައެއް"
              className="thaana font-mv-waheed bg-transparent focus:outline-none focus:border-none border-none "
              style={{ fontSize: "46px", lineHeight: "65px" }}
            />
          </div> */}
          {/* <div className="flex flex-col " style={{ width: "680px", marginBottom: "30px" }}>
            <input
              type="text"
              placeholder="ަކުރު ސުރުޚީ"
              // value="ޓީޗަރަކު ދަރިވަރުންތަކަކަށް ޖިންސީ ގޯނާކުރި މައްސަލައެއް"
              className="thaana font-mv-waheed bg-transparent focus:outline-none focus:border-none border-none mb-8 "
              style={{ fontSize: "46px", lineHeight: "65px" }}
            />
          </div> */}

          {/* <div className="sm:col-span-3">
            <ThaanaInput
              label="ޓެގުގެ ނަން"
              name="name"
              type="text"
              placeholder="..."
              className="font-mv-typewriter-bold"
            />
          </div> */}

          <PostEditor document={document} onChange={updateDocument}></PostEditor>
        </div>
        {/* EDITOR OFF */}
      </div>
      {/* Show POST Settings */}
      <div className="fixed top-0 right-0 py-6 px-4 flex items-center justify-end" style={{ width: "350px" }}>
        <button
          type="button"
          onClick={(): void => setShowSettings(!showSettings)}
          className="ml-5 flex-shrink-0 rounded-full p-1 text-gray-400 hover:text-red focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red"
        >
          <CogIcon className="h-6 w-6" aria-hidden="true" />
        </button>
      </div>
      <PostSettings show={showSettings} onClose={(): void => setShowSettings(false)} tags={tags} />

      {/* End POST Settings */}
    </EditorLayout>
  );
};

export default CreatePost;
