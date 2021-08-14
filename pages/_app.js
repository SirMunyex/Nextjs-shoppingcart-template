import '../styles/globals.css'
import Layout from '../components/layout';
import '@fortawesome/fontawesome-free/js/all.js';

function MyApp({ Component, pageProps }) {
  return <Layout>
          <Component {...pageProps} />
         </Layout>
}

export default MyApp
