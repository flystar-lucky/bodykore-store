import '@assets/main.css';
// import '@assets/chrome-bug.css'
import 'keen-slider/keen-slider.min.css';
import React, { useEffect, Suspense } from 'react';
import type { AppProps } from 'next/app';
import { RecoilRoot } from 'recoil';

function MyApp({ Component, pageProps }: AppProps) {
  /*const Layout = (Component as any).Layout || Noop

  useEffect(() => {
    document.body.classList?.remove('loading')
  }, [])*/

  return (
    <RecoilRoot>
          {/* Dynamic header and footer, they cannot be there, must be used on each page */}
          <Component {...pageProps} />
    </RecoilRoot>
  );
}

export default MyApp;
