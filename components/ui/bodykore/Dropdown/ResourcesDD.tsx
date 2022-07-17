/* This example requires Tailwind CSS v2.0+ */
import { Fragment } from 'react'
import { Popover, Transition } from '@headlessui/react'
import Link from 'next/link';

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ')
}

interface OptionsProps {
  text: string
  link: string
  newTab?: string
}

interface SubCategoryProps {
  name: string
  id?: string
  options: OptionsProps[]
}

interface ResourcesDDProps {
  category: string,
  subCategories: SubCategoryProps[][]
}

export default function ResourcesDD({ category, subCategories}: ResourcesDDProps) {
  return (
    <Popover className="z-0 relative">
      {({ open }) => (
        <>
          <div className="relative z-10 bg-white">
            <div className="max-w-7xl mx-auto flex px-4 py-6 sm:px-6 lg:px-8">
              <Popover.Button
                className={classNames(
                  open ? 'text-gray-900' : 'text-gray-500',
                  'group bg-white rounded-md inline-flex items-center text-base font-medium hover:text-gray-900 focus:outline-none'
                )}
              >
                <span className='hover:text-red-bc2026'>{category}</span>
              </Popover.Button>
            </div>
          </div>

          <Transition
            as={Fragment}
            enter="transition ease-out duration-200"
            enterFrom="opacity-0 -translate-y-1"
            enterTo="opacity-100 translate-y-0"
            leave="transition ease-in duration-150"
            leaveFrom="opacity-100 translate-y-0"
            leaveTo="opacity-0 -translate-y-1"
          >
            <Popover.Panel className="absolute transform shadow-lg w-fit">
              <div className="bg-white">
                <div className={`max-w-7xl mx-auto flex justify-between gap-10 px-10 py-8`}>
                  {subCategories.map(([item]) => (
                    <a
                      key={item.name}
                    >
                    <h1 className="text-base font-medium text-gray-900 uppercase pb-2">{item.name}</h1>
                    {item.options.map((o, i) => {
                      return (
                        <div className='w-44 py-2' key={i}>
                          <Link href={o.link} passHref>
                            <a target={`${o.newTab}`} className='cursor-pointer hover:text-red-bc2026 font-medium text-sm'>{o.text}</a>
                          </Link>
                        </div>
                      )
                    })}
                    </a>
                  ))}
                </div>
              </div>
            </Popover.Panel>
          </Transition>
        </>
      )}
    </Popover>
  )
}