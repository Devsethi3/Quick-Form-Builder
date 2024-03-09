"use client"

import { Form } from "@prisma/client"
import PreviewDialogBtn from "./PreviewDialogBtn"
import SaveFormBtn from "./SaveFormBtn"
import PublishFormBtn from "./PublishFormBtn"
import Designer from "./Designer"
import { DndContext } from "@dnd-kit/core"
import DragOverlayWrapper from "./DragOverlayWrapper"

const FormBuilder = ({ form }: { form: Form }) => {

    return (
        <DndContext>
            <main className="flex flex-col min-h-screen w-full">
                <nav className="flex h-[4rem] px-7 items-center justify-between border-b-2 gap-3">
                    <h2 className="truncate font-medium">
                        <span className="text-muted-foreground mr-2">Form:</span>
                        {form.name}
                    </h2>
                    <div className="flex items-center gap-2">
                        <PreviewDialogBtn />
                        {!form.published && (
                            <>
                                <SaveFormBtn />
                                <PublishFormBtn />
                            </>
                        )}
                    </div>
                </nav>
                <div className="flex w-full flex-grow items-center justify-center relative overflow-y-auto h-[200px] bg-accent bg-[url(/paper.svg)] dark:bg-[url(/paper-dark.svg)]">
                    <Designer />
                </div>
            </main>
            <DragOverlayWrapper />
        </DndContext>
    )
}

export default FormBuilder