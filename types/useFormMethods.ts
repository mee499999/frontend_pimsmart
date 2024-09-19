import { UseFormReturn } from "react-hook-form";
import { Student } from "@/types/IResponse";

export const useFormMethods = (formMethods: UseFormReturn<Student>) => {
    const {
        control,
        register,
        handleSubmit,
        formState: { errors },
        setValue,
        setError,
        clearErrors,
        watch,
    } = formMethods;

    return {
        control,
        register,
        handleSubmit,
        errors,
        setValue,
        setError,
        clearErrors,
        watch,
    };
};
