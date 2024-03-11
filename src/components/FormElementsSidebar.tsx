import React from 'react'
import SidebarBtnElement from './SidebarBtnElement'
import { FormElements } from './FormElements'
import { Separator } from './ui/separator'

const FormElementsSidebar = () => {
    return (
        <div>
            <p className='text-sm text-foreground/70'>Drag and drop elements</p>
            <Separator className='my-2' />
            <div className='grid grid-cols-1 md:grid-cols-2  gap-2 place-items-center'>

                <p className='text-sm text-muted-foreground col-span-1 md:col-span-2 my-2 place-self-start'>Layout Elements</p>

                <SidebarBtnElement formElement={FormElements.TextField} />
                <SidebarBtnElement formElement={FormElements.TitleField} />
            </div>
        </div>
    )
}

export default FormElementsSidebar