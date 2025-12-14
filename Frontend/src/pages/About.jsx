import React from 'react'
import Title from '../components/Title'
import { assets } from '../assets/frontend_assets/assets'
import NewsLetterBox from '../components/NewsLetterBox'

const About = () => {
  return (
    <div>
      <div className="text-2xl text-center p-8 border-t">
        <Title text1={'ABOUT'} text2={'US'}/>
      </div>

      <div className="my-10 flex flex-col md:flex-row gap-16">
        <img src={assets.about_img} className='w-full md:max-w-[450px]' alt="" />
        <div className="flex flex-col justify-center gap-6 md:w-2/4">
          <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Deleniti debitis blanditiis non quae! Nemo suscipit unde aut praesentium consequuntur quisquam quia dolor, tempora modi odit ab ipsum fuga, perspiciatis quibusdam, possimus ipsa impedit nesciunt dignissimos iste facere. Debitis, in excepturi at voluptas consequatur, eveniet, laboriosam veritatis esse quam dolorum incidunt?</p>
          <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Iure, beatae. Ad delectus tempora eveniet alias, voluptates possimus. Libero ex consequuntur suscipit culpa omnis, quaerat aspernatur autem exercitationem nesciunt dolor porro delectus dicta, doloremque iste sit sed rem esse cumque? Nostrum deserunt alias esse magnam, sit doloribus neque aliquam debitis beatae accusamus consequuntur tenetur quam, nam aspernatur omnis quaerat eaque. Velit?</p>
          <b className='text-gray-800 '>Our Mission</b>
          <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Aut consectetur cum quisquam excepturi tempora rem nostrum cumque? Molestiae nulla nesciunt modi optio, officiis incidunt laborum dolores maiores? Velit, magni laboriosam?</p>
        </div>
      </div>

      <div className="text-xl py-4">
        <Title text1={"WHY"} text2={"CHOOSE US"}/>
      </div>

      <div className="flex flex-col md:flex-row text-sm mb-20">
        <div className="border px-10 md:px-16 py-8 sm:py20 flex flex-col gap-5">
          <b>Quality Assurence : </b>
          <p className=' text-gray-600'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Assumenda iusto illo magni quos officiis quia a maxime ipsa vitae quaerat.</p>
        </div>

        <div className="border px-10 md:px-16 py-8 sm:py20 flex flex-col gap-5">
          <b>Convenience : </b>
          <p className=' text-gray-600'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Assumenda iusto illo magni quos officiis quia a maxime ipsa vitae quaerat.</p>
        </div>

        <div className="border px-10 md:px-16 py-8 sm:py20 flex flex-col gap-5">
          <b>Exceptional Customer Service</b>
          <p className=' text-gray-600'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Assumenda iusto illo magni quos officiis quia a maxime ipsa vitae quaerat.</p>
        </div>
      </div>

      <NewsLetterBox/>
    </div>
  )
}

export default About
