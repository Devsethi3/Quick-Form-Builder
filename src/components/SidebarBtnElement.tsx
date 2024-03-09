import React from 'react'
import { FormElement } from './FormElements'
import { Button } from './ui/button';
import { useDraggable } from '@dnd-kit/core';
import { cn } from '@/lib/utils';

const SidebarBtnElement = ({
    formElement
}: { formElement: FormElement }) => {

    const { label, icon: Icon } = formElement.designerBtnElement;

    const draggable = useDraggable({
        id: `designer-btn-${formElement.type}`,
        data: {
            type: formElement.type,
            isDesignerBtnElement: true
        }
    })

    return (
        <Button ref={draggable.setNodeRef} variant="outline" className={cn('flex flex-col gap-2 h-[90px] w-[90px] cursor-grab', draggable.isDragging && "ring-2 ring-primary")} {...draggable.listeners} {...draggable.attributes}>
            <Icon className="text-xl text-primary cursor-grab" />
            <p className='text-xs'>{label}</p>
        </Button>
    )
}

export const SidebarBtnElementDragOverlay = ({
    formElement
}: { formElement: FormElement }) => {

    const { label, icon: Icon } = formElement.designerBtnElement;

    const draggable = useDraggable({
        id: `designer-btn-${formElement.type}`,
        data: {
            type: formElement.type,
            isDesignerBtnElement: true
        }
    })

    return (
        <Button variant="outline" className="flex flex-col gap-2 h-[90px] w-[90px] cursor-grab">
            <Icon className="text-xl text-primary cursor-grab" />
            <p className='text-xs'>{label}</p>
        </Button>
    )
}

export default SidebarBtnElement