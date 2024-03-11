import { HiSaveAs } from "react-icons/hi"
import { Button } from "./ui/button"
import useDesigner from "@/hooks/useDesigner"
import { UpdateFormContent } from "../../actions/form";
import { toast } from "./ui/use-toast";
import { useTransition } from "react";
import { FaSpinner } from "react-icons/fa";

const SaveFormBtn = ({ id }: { id: number }) => {
  const { elements } = useDesigner();
  const [loading, startTransition] = useTransition()

  const updateFormContent = async () => {
    try {
      const JsonElements = JSON.stringify(elements);
      await UpdateFormContent(id, JsonElements);
      toast({
        title: "Success",
        description: "Your Form has been saved"
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "Something went wrong!",
        variant: "destructive"
      })
    }
  }

  return (
    <>
      <Button variant="outline" className='gap-2 text-sm' disabled={loading} onClick={() => startTransition(updateFormContent)}>
        <HiSaveAs />
        Save
        {loading && <FaSpinner className="animate-spin" />}
      </Button>
    </>
  )
}

export default SaveFormBtn