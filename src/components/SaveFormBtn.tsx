import { HiSaveAs } from "react-icons/hi"
import { Button } from "./ui/button"

const SaveFormBtn = () => {
  return (
    <>
      <Button variant="outline" className='gap-2 text-sm'>
        <HiSaveAs />
        Save
      </Button>
    </>
  )
}

export default SaveFormBtn