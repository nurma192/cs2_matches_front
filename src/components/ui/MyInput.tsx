import {useEffect, useState} from 'react';
import {Input as NextInput} from "@nextui-org/react";
import {useController} from "react-hook-form";

type Props = {
    name: string;
    label: string;
    placeholder?: string;
    type?: string;
    control: any;
    required?: boolean;
    patternValue?: RegExp;
    patternErrorMessage?: string;
    labelPlacement?: "inside" | "outside" | "outside-left"
    maxLength?: number;
    maxLengthErrorMessage?: string;
    minLength?: number;
    minLengthErrorMessage?: string;
    endContent?: JSX.Element;
    className?: string;
    classNames?: any;
}

const MyInput = ({className, classNames, name, label, placeholder, type, control, required, patternValue, patternErrorMessage = 'Invalid pattern', maxLength, maxLengthErrorMessage = 'Input text exceeds limit', minLength, minLengthErrorMessage='Input the text does`t reach the desired size', endContent, labelPlacement = "inside", ...props}: Props) => {
    const [rules, setRules] = useState({});

    useEffect(()=> {
        const updatedRules = {
            pattern: {},
            maxLength: {},
            required: '',
            minLength: {},
        };

        if (patternValue) {
            updatedRules.pattern = {
                value: patternValue,
                message: patternErrorMessage,
            };
        }
        if (maxLength) {
            updatedRules.maxLength = {
                value: maxLength,
                message: maxLengthErrorMessage,
            };
        }
        if (required) {
            updatedRules.required = "Обязательное поле";
        }
        if (minLength) {
            updatedRules.minLength = {
                value: minLength,
                message: minLengthErrorMessage,
            };
        }

        if (Object.keys(updatedRules).length > 0) {
            setRules(prevState => ({
                ...prevState,
                ...updatedRules
            }));
        }
    },[])

    const {field, fieldState: {invalid}, formState: {errors},} = useController({
        name,
        control,
        rules
    })
    return (
        <NextInput
            id={name}
            label={label}
            placeholder={placeholder}
            type={type}
            value={field.value}
            name={field.name}
            labelPlacement={labelPlacement}
            isInvalid={invalid}
            onChange={field.onChange}
            onBlur={field.onBlur}
            errorMessage={`${errors[name]?.message ?? ''}`}
            endContent={endContent}
            className={className}
            classNames={classNames}
            {...props}
        />
    );
};

export default MyInput;