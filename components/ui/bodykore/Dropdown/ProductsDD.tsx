/* This example requires Tailwind CSS v2.0+ */
import { Fragment } from 'react';
import { Popover, Transition } from '@headlessui/react';
import Link from 'next/link';
import Image from 'next/image';

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ');
}

interface OptionsProps {
  text: string;
  slug: string;
}

interface SubCategoryProps {
  name: string;
  img?: string;
  slug: string;
  options: OptionsProps[];
}

interface ProductsDDProps {
  category: string;
  subCategories: SubCategoryProps[];
}

export default function ProductsDD({
  category,
  subCategories,
}: ProductsDDProps) {
  return (
    <Popover className="z-0">
      {({ open }) => (
        <>
          <div className="z-10 bg-white">
            <div className="max-w-7xl mx-auto flex px-4 py-6 sm:px-6 lg:px-8">
              <Popover.Button
                className={classNames(
                  open ? 'text-gray-900' : 'text-gray-500',
                  'group bg-white rounded-md inline-flex items-center text-base font-medium hover:text-gray-900 focus:outline-none'
                )}
              >
                <span className="hover:text-red-bc2026">{category}</span>
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
            <Popover.Panel className="absolute transform shadow-lg w-full left-0">
              <div className="bg-white">
                <div
                  className={`max-w-7xl mx-auto flex justify-between gap-10 py-8`}
                >
                  {subCategories.map((item) => (
                    <a key={item.name}>
                      <Link href={item.slug} passHref>
                        <h1 className="text-md font-roboto font-bold text-gray-900 uppercase cursor-pointer">
                          {item.name}
                        </h1>
                      </Link>
                      <div className="py-3">
                        {item.img ? (
                          <Image src={item.img} height={78} width={153}/>
                        ) : null}
                      </div>
                      {item.options.map((o, i) => {
                        return (
                          <div className="w-44 py-2" key={i}>
                            <Link href={o.slug} passHref>
                              <p className="cursor-pointer hover:text-red-bc2026 font-medium text-sm">
                                {o.text}
                              </p>
                            </Link>
                          </div>
                        );
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
  );
}
