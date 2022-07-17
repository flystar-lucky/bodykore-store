import { Dispatch } from 'react';

interface VFilterOptionsProps {
  title1: string;
  titles: {
    text: string;
    id?: string;
  }[];
  type?: string;
  setter?: (value: string) => void;
}

export default function VFilterOptions({
  title1,
  titles,
  type,
  setter,
}: VFilterOptionsProps) {
  function setCategory(category: string) {
    if (setter) {
      setter(category);
    }
  }

  return (
    <>
      {/*Main Image*/}
      <div className="flex flex-col gap-2" style={{ letterSpacing: '1px' }}>
        <div>
          <h1
            className={`font-roboto font-bold ${
              type !== ''
                ? 'cursor-pointer text-black-1c2023'
                : 'text-red-bc2026'
            }`}
            onClick={() => {
              if (type !== '') {
                setCategory('');
              }
            }}
          >
            {title1}
          </h1>
        </div>
        <div className="">
          {titles.map((t, i) => {
            return (
              <h1
                key={i}
                className={`font-roboto pl-2 py-1 ${
                  type !== t.id
                    ? 'cursor-pointer text-black-1c2023'
                    : 'text-red-bc2026'
                }`}
                onClick={() => {
                  if (t.id && type !== t.id) {
                    setCategory(t.id);
                  }
                }}
              >
                {t.text}
              </h1>
            );
          })}
        </div>
      </div>
    </>
  );
}
