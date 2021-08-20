import { useSession } from "next-auth/client";
import Image from "next/image";
import { FormEvent, useRef, useState, useEffect } from "react";

import client from "@/api/client";

export const AvatarUpload = (props: any) => {
  const { name } = props.field;

  const inputFile = useRef<any>(null);
  const [image, setImage] = useState<any>(null);
  const [session] = useSession();

  const uploadImage = async (file: any) => {
    const formData = new FormData();
    formData.append("file", file);

    formData.append("type", "avatar");

    const { data } = await client.post("/media/upload", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${session?.access_token}`,
      },
    });

    return data;
  };

  const handleInputChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    let file = e.target.files;

    if (!file) return;

    const uploadedFile = await uploadImage(file[0]);

    setImage(`${process.env["NEXT_PUBLIC_CDN_URL"]}/${uploadedFile.path}`);
    props.form.setFieldValue(name, uploadedFile.id);
  };

  useEffect(() => {
    if (props.default) {
      console.log(props);
      setImage(`${process.env["NEXT_PUBLIC_CDN_URL"]}/${props.default.path}`);
    }
  }, []);
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
        <input type="file" ref={inputFile} onChange={handleInputChange} name="testResultImage" className="hidden" />
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
