import { withFormik, FormikProps, Form } from "formik";
import * as Yup from "yup";

// import DarkButton from "../../components/Form/DarkButton";
import { TextInput, PrimaryButton } from "../../../components";
interface FormValues {
  username: string;
  password: string;
}
interface OtherProps {
  handleSubmit(): void;
}

const InnerForm: React.FC<OtherProps & FormikProps<FormValues>> = (props: OtherProps & FormikProps<FormValues>) => {
  const { isSubmitting } = props;

  return (
    <Form autoComplete="off" autoCorrect="off" autoCapitalize="off" noValidate>
      <div>
        <TextInput name="username" type="email" autoCorrect="off" autoCapitalize="none" placeholder="E-Mail-Adresse" />
      </div>

      {/* Password */}
      <div className="relative">
        <TextInput name="password" type="password" placeholder="Passwort" autoComplete="off" />
      </div>

      <div>
        <PrimaryButton disabled={isSubmitting} type="submit" label="Login" />
      </div>

      {/* Login */}
      {/* <div>
        <DarkButton disabled={isSubmitting} type="submit" label="Login" />
      </div> */}

      {/* Remeber Me */}
      {/* <div className="py-4 mb-2" />
      <label class="flex justify-start items-start">
        <div class="bg-white border-2 border-rk-dark w-6 h-6 flex flex-shrink-0 justify-center items-center mr-2 focus-within:border-blue-500 no-select">
          <input type="checkbox" class="opacity-0 absolute " />
          <svg
            class="fill-current hidden w-4 h-4 text-rk-black pointer-events-none "
            viewBox="0 0 20 20"
          >
            <path d="M0 11l2-2 5 5L18 3l2 2L7 18z" />
          </svg>
        </div>
        <div class="select-none ">Anmeldedaten speichern</div>
      </label> */}
    </Form>
  );
};

interface MyFormProps {
  initialEmail?: string;
  handleSubmit(formData: FormValues): void;
}

const LoginSchema = Yup.object().shape({
  password: Yup.string().min(2, "Zu kurz!").max(70, "Zu lang!").required("Pflichtfeld"),
  username: Yup.string().email("Invalid email").required("Pflichtfeld"),
});

// Wrap our form with the withFormik HoC
const LoginForm = withFormik<MyFormProps, FormValues>({
  // Transform outer props into form values
  mapPropsToValues: () => {
    return {
      username: "",
      password: "",
    };
  },
  validationSchema: LoginSchema,
  handleSubmit: async (values, formikBag) => {
    formikBag.props.handleSubmit(values);
    formikBag.setSubmitting(false);
  },
})(InnerForm);

export default LoginForm;
