import { FieldProps } from "formik";
import React from "react";
import Select, { OptionsType, ValueType } from "react-select";

interface Option {
  id: string;
  name: string;
}

interface CustomSelectProps extends FieldProps {
  options: OptionsType<Option>;
  isMulti?: boolean;
  className?: string;
  placeholder?: string;
}

export const CustomSelect = ({ className, placeholder, field, form, options, isMulti = false }: CustomSelectProps) => {
  const onChange = (option: ValueType<Option | Option[]>) => {
    form.setFieldValue(
      field.name,
      isMulti ? (option as Option[]).map((item: Option) => ({ id: item.id })) : (option as Option).id
    );
  };

  const getValue = () => {
    if (options) {
      console.log(field.value);
      return isMulti
        ? options.filter((option: Option) => field.value.findIndex((value: any) => value.id === option.id) >= 0)
        : options.find((option: Option) => option.id === field.value);
    } else {
      return isMulti ? [] : ("" as any);
    }
  };

  return (
    <Select
      menuPortalTarget={typeof document !== "undefined" ? document.body : null}
      styles={{ menuPortal: (base) => ({ ...base, zIndex: 9999 }) }}
      instanceId="long-value-select"
      className={className}
      name={field.name}
      value={getValue()}
      onChange={onChange}
      placeholder={placeholder}
      options={options}
      isMulti={isMulti}
      getOptionValue={(option: any) => option["id"]}
      getOptionLabel={(option: any) => `${option.nameEn}`}
    />
  );
};

export default CustomSelect;
