import React from 'react'
import SidebarBtnElement from './SidebarBtnElement'
import { FormElements } from './FormElements'

const FormElementsSidebar = () => {
    return (
        <>
            Elements
            <SidebarBtnElement formElement={FormElements.TextField} />
        </>
    )
}

export default FormElementsSidebar