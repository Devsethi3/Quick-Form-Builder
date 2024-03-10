"use client"
import { Active, DragOverlay, useDndMonitor } from '@dnd-kit/core'
import { SidebarBtnElementDragOverlay } from './SidebarBtnElement';
import { ElementsType, FormElements } from './FormElements';
import { useState } from 'react';
import useDesigner from '@/hooks/useDesigner';

const DragOverlayWrapper = () => {

    const { elements } = useDesigner()

    const [draggedItem, setDraggedItem] = useState<Active | null>(null);

    useDndMonitor({
        onDragStart: (event) => {
            setDraggedItem(event.active);
        },
        onDragCancel: () => {
            setDraggedItem(null);
        },
        onDragEnd: () => {
            setDraggedItem(null);
        },
    });

    if (!draggedItem) return null;

    let node = <div>No drag overlay</div>;
    const isSidebarBtnElement = draggedItem.data?.current?.isDesignerBtnElement;

    if (isSidebarBtnElement) {
        const type = draggedItem.data?.current?.type as ElementsType;
        node = <SidebarBtnElementDragOverlay formElement={FormElements[type]} />;
    }

    const isDesingerElement = draggedItem.data?.current?.isDesignerElement;

    if (isDesingerElement) {
        const elementId = draggedItem.data?.current?.elementId;
        const element = elements.find((elem) => elem.id === elementId);
        if (!element) node = <div>Element not found!</div>;
        else {
            const DesignerElementComponent = FormElements[element.type].designerComponent;

            node = (
                <div className='flex bg-accent border rounded-md h-[120px] w-full py-2 px-4 opacity-60 pointer-events-none'>
                    <DesignerElementComponent elementInstance={element} />
                </div>
            );
        }
    }

    return (
        <DragOverlay>{node}</DragOverlay>
    );
}

export default DragOverlayWrapper;