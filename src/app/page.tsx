import Navbar from '@/components/ui/Navbar'
import { Button } from '@/components/ui/button'
import Image from 'next/image'
import Link from 'next/link'

const HomePage = () => {

  return (
    <>
      <Navbar />
      <div>
        <div className="bg-[url(/paper.svg)] dark:bg-[url(/paper-dark.svg)] lg:min-h-[100vh] h-full">
          <div className='flex flex-col items-center justify-center lg:min-h-[150vh] h-[88vh]'>

            <div className="mx-auto text-center">
              <h1
                className="font-semibold text-4xl sm:text-4xl lg:text-7xl"
              >
                Create Your Custom Forms
                <span className="block text-[#884DEE]">With Drag-and-Drop Ease.</span>
              </h1>

              <p className="lg:mx-auto mx-4 text-sm lg:text-base my-12 max-w-xl text text-black/80 dark:text-white/80">
                Streamline your data collection process effortlessly. Our intuitive drag-and-drop interface allows you to build
                custom forms tailored to your exact needs, without any coding required.
              </p>
              <div className='flex mt-8 items-center justify-center gap-8'>
                <Link href="/dashboard">
                  <Button variant="secondary">Create Your Form</Button>
                </Link>
                <Link href="/sign-up">
                  <Button>Get Started</Button>
                </Link>
              </div>
            </div>
            <div className='md:block hidden'>
              <Image src="/showcase-1.png" className='mt-12 mx-auto' width={1400} height={1400} alt='showcase' />
              <div className='flex mx-auto w-[90%] gap-12'>
                <div className='w-[45%] h-[15vh] p-4'>
                  <p className='text-xl font-medium'>1. Intrigue from the Get-Go! Craft a Captivating Title & Enticing Description.</p>
                </div>
                <div className='w-[65%] h-[15vh] p-4'>
                  <p className='text-xl font-medium'>2. Effortlessly Build Modern Forms: Utilize our intuitive drag-and-drop interface to craft stunning, user-friendly forms.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default HomePage

