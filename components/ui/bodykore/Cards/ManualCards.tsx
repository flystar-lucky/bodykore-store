import Image from 'next/image';

interface ManualCardsParams {
  card: {
    image?: string;
    category?: string;
    title: string;
    ref: string;
    file?: string;
  }[];
}

export default function ManualCards({ card }: ManualCardsParams) {
  return (
    <>
      <div className="max-w-7xl m-auto pt-16">
        <div className="flex flex-wrap justify-center lg:justify-between lg:px-16">
          {/*Manual Cards*/}
          {card.map((c, i) => {
            return (
              <div key={i} className="pb-12 px-8 lg:px-0">
                <div className="bg-white w-64">
                  <div
                    className={`flex justify-between bg-no-repeat bg-center h-64 bg-cover`}
                  >
                    {c.image ? (
                      <Image
                        src={c.image}
                        width="256"
                        height="256"
                        objectFit="contain"
                        alt=""
                      />
                    ) : null}
                  </div>
                  <div className="px-3">
                    <p className="text-grey-848484 font-roboto text-sm pt-2">
                      {c.category}
                    </p>
                    
                    <div className='h-24'>
                      <span
                        className="text-black-1c2023 font-bebas text-3xl font-bold italic pr-2"
                        style={{ letterSpacing: '1px' }}
                      >{`${c.title} -`}</span>
                      <span
                        className="text-red-bc2026 font-bebas text-3xl font-bold italic"
                        style={{ letterSpacing: '1px' }}
                      >
                        {c.ref}
                      </span>
                    </div>

                    <p className="text-black-1c2023 font-roboto text-sm mb-4 h-14">{`Assembly instructions for the BodyKore ${c.title} - ${c.ref}`}</p>
                    <a href={c.file} target="_blank" rel="noreferrer">
                      <button
                        className="w-52 h-12 mb-2 bg-transparent text-black-373933 hover:text-red-bc2026 border-2 border-black-373933 hover:border-red-bc2026 rounded-lg font-bebas"
                        style={{ letterSpacing: '1.5px' }}
                      >
                        <h1 className="mr-2">DOWNLOAD MANUAL</h1>
                      </button>
                    </a>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}
