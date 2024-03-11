import React from 'react'
import { GetFormById } from '../../../../actions/form'
import VisitBtn from '@/components/VisitBtn'
import FormLinkShare from '@/components/FormLinkShare'
import { StatsCard } from '@/app/(routes)/dashboard/page'
import { FaWpforms } from 'react-icons/fa'
import { HiCursorClick } from 'react-icons/hi'
import { TbArrowBounce } from 'react-icons/tb'
import { LuView } from 'react-icons/lu'

async function FormDetailPage({ params }: { params: { id: string } }) {

  const { id } = params
  const form = await GetFormById(Number(id))

  if (!form) {
    throw new Error("form not found")
  }

  const { visits, submissions } = form;

  let submissionRate = 0;

  if (visits > 0) {
    submissionRate = (submissions / visits) * 100;
  }

  const bounceRate = 100 - submissionRate;

  return (
    <>
      <div className='py-0 border-t border-b border-muted'>
        <div className='flex justify-between items-center container'>
          <h1 className='text-3xl font-bold truncate'>{form.name}</h1>
          <VisitBtn shareUrl={form.shareUrl} />
        </div>
      </div>
      <div className='py-4 border-b border-muted'>
        <div className='container flex gap-2 items-center justify-between'>
          <FormLinkShare shareUrl={form.shareUrl} />
        </div>
      </div>
      <div className='w-full pt-4 gap-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 container'>
        <StatsCard title="Total Visits" icon={<LuView className="text-blue-600" />} helperText="All Time Form Visits" value={visits.toLocaleString() || ""} loading={false} className="shadow-md shadow-blue-600" />

        <StatsCard title="Total Submissions" icon={<FaWpforms className="text-yellow-600" />} helperText="All Time Form Submissions" value={submissions.toLocaleString() || ""} loading={false} className="shadow-md shadow-yellow-600" />

        <StatsCard title="Submission Rate" icon={<HiCursorClick className="text-green-600" />} helperText="Visits that result in form submission" value={visits.toLocaleString() + "%" || ""} loading={false} className="shadow-md shadow-green-600" />

        <StatsCard title="Bounce Rate" icon={<TbArrowBounce className="text-red-600" />} helperText="Visits that leaves without interacting" value={visits.toLocaleString() + "%" || ""} loading={false} className="shadow-md shadow-red-600" />
      </div>

      <div className='container pt-4'>
        <SubmissionsTable id={form.id} />
      </div>
    </>
  )
}

export default FormDetailPage

function SubmissionsTable ({id}:{id:number}){
  return (
    <>
    <h1 className='text-2xl font-bold my-2'>Submissions</h1>
    </>
  )
}