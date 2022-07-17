interface DoubleTextProps {
  title1?: string;
  title2?: string;
  title3?: string;
  items?: string[];
}

export default function DoubleText({
  title1,
  title2,
  title3,
  items,
}: DoubleTextProps) {
  const mapItems = () => {
    return items?.map((item, index) => (
      <li key={index}>
        <div className="text-black">{item}</div>
      </li>
    ));
  };
  return (
    <>
      <section className="max-w-7xl m-auto">
        <div className="flex flex-wrap justify-center lg:justify-start py-6 gap-16 lg:gap-28 pt-16">
          <div className="lg:pl-24 w-7/12">
            <h1 className="text-black-373933 text-5xl font-bebas font-bold italic text-center md:text-left">
              {title1}
            </h1>
            <h2 className="text-black-373933 text-2xl font-bebas text-center md:text-left">
              {title2}
            </h2>
            <p className="text-black-373933 text-sm font-roboto text-center md:text-left">
              In the beachy city of Malibu, Los Angeles, a new family with a
              custom house decided to build out a sunroom along the hillside
              overlooking the Pacific Ocean. After deciding to put in a gym in
              the sunroom, the family needed a set of equipment that would help
              meet their training goals without compromising their beachfront
              view. We were able to recommend an MX1162 Universal Trainer,
              5-50lb Dumbbell Set, G206 Adjustable Bench, among others. With
              this equipment, the family now has access to a versatile and
              satisfying workout in the brightest spot in their home.
            </p>
          </div>
          <div>
            <h2 className="text-black-373933 text-2xl font-bebas pb-2 text-center md:text-left">
              EQUIPMENT
            </h2>
            <ul className="text-red leading-6 list-disc font-roboto font-bold text-sm">
              {mapItems()}
            </ul>
          </div>
        </div>
      </section>
    </>
  );
}
