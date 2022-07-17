import { Dialog, Transition } from '@headlessui/react'
import { useRecoilState } from 'recoil';
import { menuSidebarOpenState } from '../state/atoms';
import {
    XIcon,
} from '@heroicons/react/outline'
import { Fragment } from 'react';

interface CategoriesProps {
    title: string
    icon: string
    href: string
}

interface SearchFormProps {
    categories: CategoriesProps []
}

export default function MobileMenu1({ categories }: SearchFormProps) {

    const [sidebarOpen, setSidebarOpen] = useRecoilState(menuSidebarOpenState);
    return (
        <Transition.Root show={sidebarOpen} as={Fragment}>
            <Dialog as="div" className="fixed inset-0 flex z-50 xl:hidden" onClose={setSidebarOpen}>
                <Transition.Child
                    as={Fragment}
                    enter="transition-opacity ease-linear duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="transition-opacity ease-linear duration-300"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <Dialog.Overlay className="fixed inset-0 bg-gray-600 bg-opacity-75" />
                </Transition.Child>
                <Transition.Child
                    as={Fragment}
                    enter="transition ease-in-out duration-300 transform"
                    enterFrom="-translate-x-full"
                    enterTo="translate-x-0"
                    leave="transition ease-in-out duration-300 transform"
                    leaveFrom="translate-x-0"
                    leaveTo="-translate-x-full"
                >
                    <div className="relative flex-1 flex flex-col max-w-sm w-full bg-white">
                        <Transition.Child
                            as={Fragment}
                            enter="ease-in-out duration-300"
                            enterFrom="opacity-0"
                            enterTo="opacity-100"
                            leave="ease-in-out duration-300"
                            leaveFrom="opacity-100"
                            leaveTo="opacity-0"
                        >
                            <div className="absolute top-0 right-0 -mr-12 pt-2">
                                <button
                                    type="button"
                                    className="ml-1 flex items-center justify-center h-10 w-10 rounded-full"
                                    onClick={() => setSidebarOpen(false)}
                                >
                                    <span className="sr-only">Close sidebar</span>
                                    <XIcon className="h-6 w-6 text-white" aria-hidden="true" />
                                </button>
                            </div>
                        </Transition.Child>
                        <div className="flex-1 h-0 pt-5 pb-4 overflow-y-auto">
                            <div className="flex-shrink-0 flex items-center px-4 pb-4">
                                <img
                                    className="h-auto w-auto"
                                    style={{ maxWidth: '180px' }}
                                    src="/header/logo.png"
                                    alt="Logo BodyKore"
                                />
                            </div>
                            <div>

                            <div className="h-3 bg-red-bc2026"></div>

                            </div>
                            <nav className="mt-5 space-y-1 px-4">
                                {categories.map((item, i) => (
                                    <div key={i}>
                                        <a
                                            href={item.href}
                                            className={'group flex items-center px-2 py-2 text-base font-medium hover:text-red-bc2026 rounded-md'}
                                        >
                                            <div className='flex justify-between items-center w-full'>
                                                {item.title}
                                                <img src={item.icon} alt="" className='h-5 w-5' />
                                            </div>
                                        </a>
                                            <div className='border-t border-gray-300 mt-2'></div>
                                    </div>
                                ))}
                            </nav>
                        </div>
                    </div>
                </Transition.Child>
                <div className="flex-shrink-0 w-14">{/* Force sidebar to shrink to fit close icon */}</div>
            </Dialog>
        </Transition.Root>
    )
}