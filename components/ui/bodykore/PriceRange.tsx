import { useEffect, useState } from 'react';
import { Range } from 'react-range';

const MAX_VALUE = 1000;

interface PriceRangeParams {
  value?: number;
  setter: (value?: number) => void;
}

const PriceRange = ({ value, setter }: PriceRangeParams) => {
  const [state, setState] = useState({ values: [MAX_VALUE] });
  useEffect(() => {
    setState({ values: [value !== undefined ? value : MAX_VALUE] });
  }, [value]);
  return (
    <section>
      <div className="pb-3">
        <label
          className="block tracking-wide text-grey-848484 text-xs"
          htmlFor="grid-product-type"
        >
          Max Price
        </label>
      </div>
      <Range
        step={10}
        min={0}
        max={MAX_VALUE}
        values={state.values}
        onChange={(values) => setState({ values })}
        onFinalChange={(values) => {
          if (values[0] === MAX_VALUE) {
            setter();
          } else {
            setter(values[0]);
          }
        }}
        renderTrack={({ props, children }) => (
          <div
            {...props}
            style={{
              ...props.style,
              height: '6px',
              width: '100%',
              backgroundColor: '#ccc',
            }}
            className="rounded-md"
          >
            {children}
          </div>
        )}
        renderThumb={({ props }) => (
          <div
            {...props}
            style={{
              ...props.style,
              height: '12px',
              width: '12px',
              backgroundColor: '#BC2026',
            }}
            className="rounded-md"
          />
        )}
      />
      <div className="flex justify-between text-sm text-black-373933 pt-2">
        <span>
          {state.values[0] === MAX_VALUE ? 'No Max' : `${state.values[0]}$`}
        </span>
        <span>{MAX_VALUE}$</span> {/* Aqui va el valor del maximo */}
      </div>
    </section>
  );
};

export default PriceRange;
