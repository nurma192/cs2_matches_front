import React from 'react';
import {Input} from "@nextui-org/react";
import {FaEye, FaEyeSlash} from "react-icons/fa";
import {type Control, useController} from "react-hook-form";

interface Props {
    name: string;
    label: string;
    placeholder?: string;
    control: Control<any>;
    required?: string;
    validate?: (value: any) => string | boolean;
}

export const MyPasswordInput: React.FC<Props> = ({
                                                     name,
                                                     label,
                                                     placeholder,
                                                     control,
                                                     required = '',
                                                     validate
                                                 }
) => {
    const {field, fieldState: {invalid}, formState: {errors}} = useController({
        name,
        control,
        rules: {
            required,
            validate
        }
    })

    const [isVisible, setIsVisible] = React.useState(false);
    const toggleVisibility = () => setIsVisible(!isVisible);

    return (

        <Input
            id={name}
            label={label}
            type={isVisible ? "text" : "password"}
            isRequired={!!required}
            placeholder={placeholder}
            value={field.value}
            name={field.name}
            isInvalid={invalid}
            onChange={field.onChange}
            onBlur={field.onBlur}
            errorMessage={`${errors[name]?.message ?? ''}`}
            classNames={{
                inputWrapper: `rounded border border-neural-700 bg-white`,
                input: `${!isVisible && 'tracking-widest'}`
            }}
            endContent={
                <button
                    aria-label="toggle password visibility"
                    className="focus:outline-none rounded-xl transition p-1 hover:bg-white"
                    type="button"
                    onClick={toggleVisibility}
                >
                    {isVisible ? (
                        <FaEyeSlash className="text-xl text-default-400 pointer-events-none"/>
                    ) : (
                        <FaEye className="text-xl text-default-400 pointer-events-none"/>
                    )}
                </button>
            }
        />
    );
}
