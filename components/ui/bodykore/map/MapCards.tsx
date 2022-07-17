export interface CardsProps {
  title: string;
  direction: string;
  distance?: number;
  latitude: number;
  longitude: number;
}
interface MapCardsProps {
  cards: CardsProps[];
  setter: (latitude: number, longitude: number) => void;
}

export default function MapCards({ cards, setter }: MapCardsProps) {
  return (
    <>
      <section className="max-w-7xl m-auto">
        {cards.map((c, i) => {
          return (
            <div className="py-3" key={i}>
              <div className="flex flex-row pb-2 gap-20 lg:gap-0">
                <div className="w-2/3">
                  <h1 className="text-black-373933 text-4xl font-bebas font-bold italic text-left">
                    {c.title}
                  </h1>
                </div>
                <div className="flex justify-end w-1/3 lg:mr-28">
                  <button
                    type="button"
                    className="flex items-center gap-2 px-6 py-2 border border-red-bc2026 text-red-bc2026 font-bold text-sm leading-tight rounded"
                    onClick={() => {
                      setter(c.latitude, c.longitude);
                    }}
                  >
                    <img src="/svg/btnMarker.svg" alt="" />
                    DIRECTIONS
                  </button>
                </div>
              </div>
              <div className="flex flex-row">
                <div className="w-2/3">
                  <p className="font-roboto text-black-1c2023">{c.direction}</p>
                </div>
                <div className="w-1/3 flex justify-end mr-28 pt-4">
                  <p className="font-roboto text-red-bc2026">
                    {c.distance !== undefined
                      ? c.distance?.toFixed(1) + ' mi'
                      : null}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </section>
    </>
  );
}
