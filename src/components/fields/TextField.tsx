"use client"

import { MdTextFields } from "react-icons/md";
import { ElementsType, FormElement, FormElementInstance } from "../FormElements"
import { Label } from "../ui/label";
import { Input } from "../ui/input";

const type: ElementsType = "TextField";

const extraAttributes = {
    label: "Text Field",
    helperText: "Helper text",
    required: false,
    placeHolder: "Value Here..."
}

export const TextFieldFormElement: FormElement = {
    type,

    construct: (id: string) => ({
        id,
        type,
        extraAttributes,
    }),

    designerBtnElement: {
        icon: MdTextFields,
        label: "Text Field"
    },

    designerComponent: DesignerComponent,
    formComponent: () => <div>Form Component</div>,
    propertiesComponent: () => <div>Properites Component</div>
}

type CustomInstance = FormElementInstance & {
    extraAttributes: typeof extraAttributes
}

function DesignerComponent({
    elementInstance,
}: { elementInstance: FormElementInstance }) {

    const element = elementInstance as CustomInstance;
    const { label, required, placeHolder, helperText } = element.extraAttributes;
    return (
        <div className="text-sm flex flex-col gap-3 w-full">
            <Label>{label}
                {required && "*"}
            </Label>
            <Input readOnly disabled placeholder={placeHolder} />
            {helperText && <p className="text-muted-foreground text-xs">{helperText}</p>}
        </div>
    );
}
