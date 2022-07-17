import Document, { Head, Html, Main, NextScript } from 'next/document';

class MyDocument extends Document {
  render() {
    return (
      <Html>
        <Head>
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link rel="preconnect" href="https://fonts.gstatic.com" />
          <link
            href="https://fonts.googleapis.com/css2?family=Bebas+Neue&display=swap"
            rel="stylesheet"
          />
          <link
            href="https://fonts.googleapis.com/css2?family=Roboto&display=swap"
            rel="stylesheet"
          />
          {/*Acumin Pro bold*/}
          <link rel="stylesheet" href="https://use.typekit.net/azn1mni.css" />
          <script
            src="https://script.tapfiliate.com/tapfiliate.js"
            type="text/javascript"
            async
          ></script>
          <script
            type="text/javascript"
            dangerouslySetInnerHTML={{
              __html: `
            (function(t,a,p){t.TapfiliateObject=a;t[a]=t[a]||function(){ (t[a].q=t[a].q||[]).push(arguments)}})(window,'tap');
  
            tap('create', '${process.env.TAPFILIATE_ACCOUNT_ID}', { integration: "javascript" });
            tap('detect', {cookie_domain: 'localhost'});
            `,
            }}
            // TODO: set the correct domain for the cookie in
            // tap('detect', {cookie_domain: 'your-main-domain.com'});
          />
        </Head>
        <body className="loading">
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
