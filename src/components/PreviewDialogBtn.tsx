import React from 'react'
import { Button } from './ui/button'
import { MdPreview } from 'react-icons/md'
import useDesigner from '@/hooks/useDesigner'
import { Dialog, DialogContent, DialogTrigger } from './ui/dialog'
import { FormElements } from './FormElements'

const PreviewDialogBtn = () => {
  const { elements } = useDesigner();

  return (
    <>
      <Dialog>
        <DialogTrigger>
          <Button variant="outline" className='gap-2 text-sm'>
            <MdPreview />
            Preview
          </Button>
        </DialogTrigger>
        <DialogContent className='w-screen h-screen max-w-full flex flex-col flex-grow p-0 gap-0'>
          <div className='px-4 py-2 border-b'>
            <p className='text-lg font-bold text-muted-foreground'>Form Preview</p>
            <p className='text-sm text-muted-foreground'>
              This is how your form will look like to your users.
            </p>
          </div>
          <div className='bg-accent bg-[url(/paper.svg)] overflow-y-auto dark:bg-[url(/paper-dark.svg)] flex flex-col flex-grow items-center justify-center p-4'>
            <div className='max-w-[620px] flex flex-col gap-4 flex-grow bg-background h-full w-full rounded-md p-8 overflow-y-auto'>
              {elements.map((element) => {
                const FormCompoent = FormElements[element.type].formComponent;
                return <FormCompoent key={element.id} elementInstance={element} />
              })}
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}

export default PreviewDialogBtn