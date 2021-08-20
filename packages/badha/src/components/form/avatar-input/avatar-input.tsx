import { Field, useField } from "formik";

import { AvatarUpload } from "./avatar-upload";

export const AvatarInput = (props: any) => {
  const [field, meta] = useField(props);
  return (
    <div>
      <Field {...field} {...props} component={AvatarUpload} />
    </div>
  );
};
