import { useReducer } from 'react'

import './App.scss'

import ErrorMessage from './components/ErrorMessage';
import Footer from './components/Footer'
import Form from './components/Form';
import Result from './Result';
import reducer from './reducer';


function App() {
  const [state, dispatch] = useReducer(reducer, {
    loadingStops: true,
    loadingBuses: false,
    data: {},
    effects: ['FETCH_STOPS'],
  });

  return <>
    <aside className="error-message-container">
      {state.errorMessage && <ErrorMessage dispatch={dispatch} content={state.errorMessage} />}
    </aside>
    <main>
      <Form state={state} dispatch={dispatch} />
      <Result isLoading={state.loadingBuses} buses={state.data.buses} />
    </main>
    <Footer />
  </>
}

export default App