import { useState } from 'react'

import './App.scss'

import ErrorMessage from './components/ErrorMessage';
import Footer from './components/Footer'
import Form from './components/Form';
import Result from './Result';
import Bus from './types/Bus';

function App() {
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<string[]>([]);
  const [bus, setBus] = useState<Bus[]>([]);

  return <>
    <aside className="error-message-container">
      {errors.map(eM => <ErrorMessage content={eM} />)}
    </aside>
    <main>
      <Form setIsLoading={setIsLoading} setErrors={setErrors} setBus={setBus} />
      <Result isLoading={isLoading} bus={bus} />
    </main>
    <Footer />
  </>
}



export default App