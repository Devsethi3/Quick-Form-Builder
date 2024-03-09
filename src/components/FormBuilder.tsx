"use client"

import { Form } from "@prisma/client"
import PreviewDialogBtn from "./PreviewDialogBtn"
import SaveFormBtn from "./SaveFormBtn"
import PublishFormBtn from "./PublishFormBtn"

const FormBuilder = ({ form }: { form: Form }) => {

    return (
        <>
            <main className="flex flex-col w-full">
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
                <div className="flex w-full flex-grow items-center justify-center relative overflow-y-auto h-[200px] bg-accent bg-[url{/images/graph-paper.svg}]"></div>
            </main>
        </>
    )
}

export default FormBuilder