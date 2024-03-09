"use client"

import { MdTextFields } from "react-icons/md";
import { ElementsType, FormElement } from "../FormElements"

const type: ElementsType = "TextField";

export const TextFieldFormElement: FormElement = {
    type,

    construct: (id: string) => ({
        id,
        type,
        extraAttributes: {
            label: "Text Field",
            helperText: "Helper text",
            required: false,
            placeHolder: "Value Here..."
        }
    }),

    designerBtnElement: {
        icon: MdTextFields,
        label: "Text Field"
    },

    designerComponent: () => <div className="text-white text-sm">Desinger Component</div>,
    formComponent: () => <div>Form Component</div>,
    propertiesComponent: () => <div>Properites Component</div>
}