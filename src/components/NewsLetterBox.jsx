import React from 'react'

const NewsLetterBox = () => {
  const onSubmitHandler =((event)=>{
    event.preventDefault()
  })
  return (
    <div className='text-center mb-2 '>
      <p className='text-2xl font-medium text-gray-800'>
        Subscribe now and get 20% off
      </p>
      <p className="text-gray-400 mt-4">Lorem, ipsum dolor sit amet consectetur adipisicing elit. Repudiandae repellendus ex, saepe similique qui a ullam laborum explicabo nemo? Laboriosam.</p>
      <form onSubmit={onSubmitHandler} className='w-full sm:w-1/2 flex items-center gap-3 mx-auto border pl-3 mt-4' >
        <input type="email" placeholder='Enter your email' className='w-full sm:flex-1 outline-none' required />
        <button type='submit' className='bg-black text-white text-xs px-10 py-4'>SUBSCRIBE</button>
      </form>
    </div>
  )
}

export default NewsLetterBox
