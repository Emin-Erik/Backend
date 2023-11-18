'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import {Slider} from "@nextui-org/react";
import { z } from 'zod'
import { FormDataSchema } from '../lib/schema'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm, SubmitHandler } from 'react-hook-form'
import GewichtSlider from './signUp/GewichtSlider';
import GroeßeSlider from './signUp/GroeßeSlider';
import GeschlechtSelection from './signUp/GeschlechtSelection';
import PlanSelection from './signUp/PlanSelection';
import BewegungSelection from './signUp/BewegungSelection';
import InputEmail from './signUp/InputEmail';
import InputPassword from './signUp/InputPassword';
import InputName from './signUp/InputName';
import InputPasswordSecond from './signUp/InputPasswordSecond';

type Inputs = z.infer<typeof FormDataSchema>

const steps = [
  {
    id: 'Step 1',
    name: 'Meine Informationen',
    fields: ['Name', 'Email', 'Password']
  },
  {
    id: 'Step 2',
    name: 'Mein Plan',
    fields: ['Geschlecht', 'Gewicht', 'Groeße', 'Plan', 'Zeit']
  },
  { id: 'Step 3', name: 'Complete' }
]

export default function Form() {
  const [previousStep, setPreviousStep] = useState(0)
  const [currentStep, setCurrentStep] = useState(0)
  const delta = currentStep - previousStep

  const {
    register,
    handleSubmit,
    watch,
    reset,
    trigger,
    formState: { errors }
  } = useForm<Inputs>({
    resolver: zodResolver(FormDataSchema)
  })

  const processForm: SubmitHandler<Inputs> = data => {
    console.log(data)
    reset()
  }

  type FieldName = keyof Inputs

  const next = async () => {
    const fields = steps[currentStep].fields
    const output = await trigger(fields as FieldName[], { shouldFocus: true })

    if (!output) return

    if (currentStep < steps.length - 1) {
      if (currentStep === steps.length - 2) {
        await handleSubmit(processForm)()
      }
      setPreviousStep(currentStep)
      setCurrentStep(step => step + 1)
    }
  }

  const prev = () => {
    if (currentStep > 0) {
      setPreviousStep(currentStep)
      setCurrentStep(step => step - 1)
    }
  }

  return (
    <section className='absolute inset-0 flex flex-col justify-between p-24'>
      {/* steps */}
      <nav aria-label='Progress'>
        <ol role='list' className='space-y-4 md:flex md:space-x-8 md:space-y-0'>
          {steps.map((step, index) => (
            <li key={step.name} className='md:flex-1'>
              {currentStep > index ? (
                <div className='group flex w-full flex-col border-l-4 border-primary-50 py-2 pl-4 transition-colors md:border-l-0 md:border-t-4 md:pb-0 md:pl-0 md:pt-4'>
                  <span className='text-sm font-medium text-primary-50 transition-colors '>
                    {step.id}
                  </span>
                  <span className='text-sm font-medium'>{step.name}</span>
                </div>
              ) : currentStep === index ? (
                <div
                  className='flex w-full flex-col border-l-4 border-primary-50 py-2 pl-4 md:border-l-0 md:border-t-4 md:pb-0 md:pl-0 md:pt-4'
                  aria-current='step'
                >
                  <span className='text-sm font-medium text-primary-50'>
                    {step.id}
                  </span>
                  <span className='text-sm font-medium'>{step.name}</span>
                </div>
              ) : (
                <div className='group flex w-full flex-col border-l-4 border-gray-200 py-2 pl-4 transition-colors md:border-l-0 md:border-t-4 md:pb-0 md:pl-0 md:pt-4'>
                  <span className='text-sm font-medium text-gray-500 transition-colors'>
                    {step.id}
                  </span>
                  <span className='text-sm font-medium'>{step.name}</span>
                </div>
              )}
            </li>
          ))}
        </ol>
      </nav>

      {/* Form */}
      <form className='mt-12 py-12' onSubmit={handleSubmit(processForm)}>
        {currentStep === 0 && (
          <motion.div
            initial={{ x: delta >= 0 ? '50%' : '-50%', opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
          >
            <h2 className='text-base font-semibold leading-7 text-white'>
              Persönliche Informationen
            </h2>
            <p className='mt-1 text-sm leading-6 text-gray-600'>
              Teile uns deine Informationen mit.
            </p>
            <div className=''>
              <div className='sm:col-span-3'>
                <div className='mt-2'>
               <InputName/>
                </div>
              </div>

              <div className='sm:col-span-3'>
                
                <div className='mt-2'>
                  <InputPassword/>
                </div>
              </div>

              <div className='sm:col-span-3'>
                
                <div className='mt-2'>
                  <InputPasswordSecond/>
                </div>
              </div>

              <div className='sm:col-span-4'>
              <InputEmail/>
              </div>
            </div>
          </motion.div>
        )}

        {currentStep === 1 && (
          <motion.div
            initial={{ x: delta >= 0 ? '50%' : '-50%', opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
          >
            <h2 className='text-base font-semibold leading-7 text-white'>
              Dein Plan
            </h2>
            <p className='mt-1 text-sm leading-6 text-white'>
              Gebe an unter welchen Vorraussetzungen du starten möchtest.
            </p>

            <div className='mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6'>
              <div className='sm:col-span-3'>
                <label
                  htmlFor='Geschlecht'
                  className='block text-sm font-medium leading-6 text-white'
                >
                  Geschlecht
                </label>
                <div className='mt-2'>
                <GeschlechtSelection/>
                  {errors.Geschlecht?.message && (
                    <p className='mt-2 text-sm text-red-400'>
                      {errors.Geschlecht.message}
                    </p>
                  )}
                </div>
              </div>

              <div className='col-span-full'>
                <div className='mt-2'>
                <GewichtSlider />
                </div>
              </div>

              <div className='sm:col-span-2 sm:col-start-1'>
              <div className='mt-2'>
                <GroeßeSlider />
                </div>
              </div>
<div>
                <div className='mt-2'>
                <PlanSelection />
                </div>
              </div>
              <div className='mt-2'>
                <BewegungSelection />
                </div>
            </div>
          </motion.div>
        )}

        {currentStep === 2 && (
          <>
            <h2 className='text-base font-semibold leading-7 text-gray-900'>
              Complete
            </h2>
            <p className='mt-1 text-sm leading-6 text-gray-600'>
              Thank you for your submission.
            </p>
          </>
        )}
      </form>

      {/* Navigation */}
      <div className='mt-8 pt-5'>
        <div className='flex justify-between'>
          <button
            type='button'
            onClick={prev}
            disabled={currentStep === 0}
            className='rounded bg-primary-50 px-2 py-1 text-sm font-semibold text-background shadow-sm ring-1 ring-inset ring-primary-foreground hover:bg-sky-50 disabled:cursor-not-allowed disabled:opacity-50'
          >
            <svg
              xmlns='http://www.w3.org/2000/svg'
              fill='none'
              viewBox='0 0 24 24'
              strokeWidth='1.5'
              stroke='currentColor'
              className='h-6 w-6'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                d='M15.75 19.5L8.25 12l7.5-7.5'
              />
            </svg>
          </button>
          <button
            type='button'
            onClick={next}
            disabled={currentStep === steps.length - 1}
            className='rounded bg-primary-50 px-2 py-1 text-sm font-semibold text-background shadow-sm ring-1 ring-inset ring-primary-foreground hover:bg-sky-50 disabled:cursor-not-allowed disabled:opacity-50'
          >
            <svg
              xmlns='http://www.w3.org/2000/svg'
              fill='none'
              viewBox='0 0 24 24'
              strokeWidth='1.5'
              stroke='currentColor'
              className='h-6 w-6'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                d='M8.25 4.5l7.5 7.5-7.5 7.5'
              />
            </svg>
          </button>
        </div>
      </div>
    </section>
  )
}
