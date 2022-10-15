import React from 'react'
import { motion } from 'framer-motion';

type Props = {}

const ExperienceCard = (props: Props) => {
  return (
    <article className='flex flex-col rounded-lg items-center space-y-7 flex-shrink-0 w-[500px] md:w-[600px] xl:w-[900px] snap-center bg-[#292929] p-10 hover:opacity-100 opacity-40 cursor-pointer transition duration-200'>
        <motion.img 
        initial={{
            y: -100,
            opacity: 0,
        }}
        transition={{ duration: 1.2 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className='w-32 h-32 rounded-full xl:w-[200px] xl:h-[200px] object-cover object-center'
        src="https://images.pexels.com/photos/1308882/pexels-photo-1308882.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="" />

        <div className='px-0 md:px-10'>
            <h4 className='text-4xl font-light'>Web Developer</h4>
            <p className='font-bold text-2xl mt-1'>Joy Karmakar</p>
            <div className='flex space-x-2 my-2'>
                <img className='h-10 h-10 rounded-full' src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/61/HTML5_logo_and_wordmark.svg/1200px-HTML5_logo_and_wordmark.svg.png" alt="" />
            </div>
            <p className='uppcase py-5 text-gray-300'>Start with... - Ended...</p>

            <ul className='list-disc space-y-4 ml-5 text-lg'>
                <li>Summery</li>
                <li>Summery</li>
                <li>Summery</li>
                <li>Summery</li>
            </ul>
        </div>
    </article>
  )
}

export default ExperienceCard