import { useSession } from "next-auth/client";
import Image from "next/image";
import { useRef, useState } from "react";

import client from "@/api/client";
const AvatarUpload = (props: any) => {
  const inputFile = useRef<any>(null);
  const [image, setImage] = useState<any>(null);
  const [session] = useSession();

  const handleFileUpload = async (file: any) => {
    const formData = new FormData();

    formData.append("file", file);
    formData.append("type", "avatar");
    const upload = await client.post("/media/upload", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${session?.access_token}`,
      },
    });

    setImage(`${process.env.NEXT_PUBLIC_CDN_URL}/${upload.data.path}`);
  };

  return (
    <div>
      <label htmlFor="photo" className="block text-sm font-medium text-gray-700">
        Photo
      </label>
      <div className="mt-1 flex items-center">
        <span className="h-12 w-12 rounded-full overflow-hidden bg-gray-100">
          {image ? (
            <Image
              className="h-full w-full text-gray-300"
              src={`${image}`}
              alt="Landscape picture"
              width={500}
              height={500}
            />
          ) : (
            <span className="h-12 w-12 rounded-full overflow-hidden bg-gray-100">
              <svg className="h-full w-full text-gray-300" fill="currentColor" viewBox="0 0 24 24">
                <path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
            </span>
          )}
        </span>
        <input
          type="file"
          ref={inputFile}
          onChange={(event: any) => handleFileUpload(event.currentTarget?.files[0])}
          name="testResultImage"
          className="hidden"
        />
        <button
          onClick={() => {
            inputFile.current?.click();
          }}
          type="button"
          className="ml-5 bg-white py-2 px-3 border border-gray-300 rounded-md shadow-sm text-sm leading-4 font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Change
        </button>
      </div>
    </div>
  );
};

export default AvatarUpload;
