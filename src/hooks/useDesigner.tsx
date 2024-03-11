"use client"

import { DesignerContext } from "@/context/DesignerContex"
import { useContext } from "react"

const useDesigner = () => {
    const context = useContext(DesignerContext)

    if (!context) {
        throw new Error("useDesigner must be used within a DesignerContext")
    }

    return context;
}

export default useDesigner