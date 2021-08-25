import { UploadIcon, SearchIcon } from "@heroicons/react/outline";
import { useSession } from "next-auth/client";
import Image from "next/image";
import { useRef, useState, useEffect } from "react";
import toast, { Toaster } from "react-hot-toast";

import ThaanaInput from "../../components/form/input-thaana";

import client from "@/api/client";

// Caption for a media elem
export interface Caption {
  text: string;
  creditsTo: string;
  creditsToUrl?: string;
}

// Meta details for media elemn
export interface MediaMeta {
  thumbnail: string;
  time?: number; // video or audio length
  caption?: Caption;
}

// Base Media
export interface Media {
  url: string;
  type: string;
  meta: MediaMeta;
}

const FeaturedMedia = (props: any) => {
  const [media, setMedia] = useState<any>({});
  const [session] = useSession();
  const inputFile = useRef<any>(null);

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

    toast.promise(uploadMedia, {
      loading: "Upload  media...",
      success: <b>Media uploaded!</b>,
      error: <b>Upload Media failed.</b>,
    });

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
    setMedia(media);
    props.onChange(media);
    // setImage(`${process.env.NEXT_PUBLIC_CDN_URL}/${upload.data.path}`);
  };

  useEffect(() => {
    if (props.default) {
      setMedia(props.default);
    }
  }, []);
  return (
    <div className="w-editor pt-2 pb-1 px-2 " style={{ minHeight: "200px" }}>
      {/* <pre>{JSON.stringify(media, null, 2)}</pre> */}
      <input
        type="file"
        name="file"
        className="hidden"
        ref={inputFile}
        onChange={(event: any) => handleMediaUpload(event.currentTarget?.files[0])}
      />
      {media && media.path ? (
        <div className="w-full h-full relative block group cursor-pointer bg-black">
          <div>
            <button
              onClick={() => {
                inputFile.current?.click();
              }}
              type="button"
              className="absolute z-20  right-0 left-0 top-0 ml-2 inline-flex items-center px-1 py-1 border border-gray-300 rounded-md shadow-sm text-xxs font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-50 focus:ring-purple-500"
            >
              <UploadIcon className="h-5 w-5 text-gray-400" />
            </button>
          </div>
          <Image
            layout="intrinsic"
            objectFit="cover"
            width={680}
            height={500}
            src={media.path}
            alt="Picture of the author"
            className="group-hover:opacity-70 transition-all  "
          />
          <div
            className="absolute bg-black px-4 py-4 bg-opacity-50 bottom-1  mt-4 flex flex-row w-full"
            style={{ fontSize: "18px", direction: "rtl" }}
          >
            <div className=" w-full ml-2">
              <ThaanaInput
                name="featuredMedia.meta.caption.text"
                type="text"
                placeholder="..."
                label="ކެޕްޝަން"
                className="font-mv-typewriter-bold"
                // value={media.meta.caption.text}
                // onChange={(e) => {
                //   setMedia((prevMedia: Media) => ({
                //     ...prevMedia,
                //     meta: {
                //       ...prevMedia.meta,
                //       caption: {
                //         ...prevMedia.meta.caption,
                //         text: e.target.value,
                //       },
                //     },
                //   }));
                //   props.onChange(media);
                // }}
              />
            </div>
            <div>
              <ThaanaInput
                name="featuredMedia.meta.caption.creditsTo"
                type="text"
                placeholder="..."
                label="ފޮޓޯ"
                className="font-mv-typewriter-bold"
                // value={media.meta.caption.creditsTo}
                // onChange={(e) => {
                //   setMedia((prevMedia: Media) => ({
                //     ...prevMedia,
                //     meta: {
                //       ...prevMedia.meta,
                //       caption: {
                //         ...prevMedia.meta.caption,
                //         creditsTo: e.target.value,
                //       },
                //     },
                //   }));
                //   props.onChange(media);
                // }}
              />
            </div>
          </div>
        </div>
      ) : (
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
      )}
      <Toaster position="bottom-left" />
    </div>
  );
};
export default FeaturedMedia;
