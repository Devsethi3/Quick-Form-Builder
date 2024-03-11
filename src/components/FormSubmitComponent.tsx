"use client"

import { HiCursorClick } from "react-icons/hi";
import { FormElementInstance, FormElements } from "./FormElements"
import { Button } from "./ui/button";
import { useCallback, useRef } from "react";

const FormSubmitComponent = ({ formUrl, content }: {
    content: FormElementInstance[];
    formUrl: string;
}) => {

    const formValues = useRef<{ [key: string]: string }>({})

    const submitValue = useCallback((key: string, value: string) => {
        formValues.current[key] = value;
    }, [])

    const submitForm = () => {
        console.log("form values", formValues.current);

    }

    return (
        <div className="flex items-center justify-center w-full h-full p-5">
            <div className="max-w-[620px] flex flex-col gap-3 flex-grow border bg-background w-full p-5 overflow-y-auto shadow-md dark:shadow-white/20 shadow-black/10 rounded-md">

                {content.map((element) => {
                    const FormElement = FormElements[element.type].formComponent;
                    return <FormElement key={element.id} elementInstance={element} submitValue={submitValue} />
                })}

                <Button className="mt-5" onClick={() => submitForm()}>
                    <HiCursorClick className="mr-2" />
                    Submit
                </Button>
            </div>
        </div>
    )
}

export default FormSubmitComponent