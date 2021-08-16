import '../styles/globals.css'
import Layout from '../components/layout';
import '@fortawesome/fontawesome-free/js/all.js';
import { Provider } from 'react-redux';
import store from '../store';

function MyApp({ Component, pageProps }) {

  return (
    <Provider store={store}>
         <Layout>
          <Component {...pageProps} />
         </Layout>
    </Provider>
  )
}

export default MyApp
