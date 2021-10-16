import '../styles/globals.css'
import Layout from '../components/layout';
import '@fortawesome/fontawesome-free/js/all.js';
import store from '../store';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react'
import { persistStore } from 'redux-persist'

let persistor = persistStore(store);

function MyApp({ Component, pageProps }) {

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
         <Layout>
          <Component {...pageProps} />
         </Layout>
      </PersistGate>
    </Provider>
  )
}

export default MyApp