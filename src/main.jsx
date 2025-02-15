import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './style/index.css'
import App from './components/app/App.jsx'
import { Provider } from 'react-redux';
import store from './reducers/store.jsx';
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
        <App />
    </Provider>,
  </StrictMode>
)
