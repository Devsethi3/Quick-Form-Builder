import Navbar from '@/components/ui/Navbar'
import { Button } from '@/components/ui/button'

const FormBuilderPage = () => {

  return (
    <>
      <Navbar />
      <div>
        <section className="">
          <div className="flex items-center justify-center h-[80vh]">
            <div className="mx-auto text-center">
              <h1
                className="font-semibold text-6xl"
              >
                Create Your Custom Forms
                <span className="block text-[#884DEE]">With Drag-and-Drop Ease.</span>
              </h1>

              <p className="mx-auto my-12 max-w-xl text text-black/80 dark:text-white/80">
                Streamline your data collection process effortlessly. Our intuitive drag-and-drop interface allows you to build
                custom forms tailored to your exact needs, without any coding required.
              </p>
              <div className='flex mt-8 items-center justify-center gap-8'>
                <Button variant="secondary">Create Your Form</Button>
                <Button>Get Started</Button>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  )
}

export default FormBuilderPage
