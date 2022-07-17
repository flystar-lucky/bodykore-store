import { Dispatch } from 'react';

interface NavOptionsParams {
  title1: string;
  titles: {
    text: string;
    id?: string;
  }[];
  type?: string;
  setter?: (value: { page: number; category: string }) => void /* Dispatch<
    React.SetStateAction<{
      page: number;
      category: string;
    }>
  >; */;
}

export default function NavOptions({
  title1,
  titles,
  type,
  setter,
}: NavOptionsParams) {
  const scrollDown = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({
        behavior: 'smooth',
      });
    }
  };

  function setCategory(category: string) {
    if (setter) {
      setter({ page: 1, category: category });
    }
  }

  return (
    <>
      {/*Main Image*/}
      <div
        className="flex justify-center flex-wrap gap-4 lg:gap-8 font-bebas font-bold text-xl lg:text-2xl italic pt-10 lg:pt-20 pb-8"
        style={{ letterSpacing: '1px' }}
      >
        <h1
          className={
            type === '' || type === undefined
              ? 'text-red-bc2026'
              : 'cursor-pointer'
          }
          onClick={() => {
            if (type !== '') {
              setCategory('');
            }
          }}
        >
          {title1}
        </h1>
        {titles.map((t, i) => {
          return (
            <h1
              key={i}
              className={type === t.id ? 'text-black-373933' : 'cursor-pointer'}
              onClick={() => {
                if (t.id && type !== t.id) {
                  scrollDown(t.id);
                  setCategory(t.id);
                }
              }}
            >
              {t.text}
            </h1>
          );
        })}
      </div>
    </>
  );
}
