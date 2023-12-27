import { useEffect, useRef, useState } from 'react'

import './App.scss'

import AntsirabeApiService from './services/antsirabeApiService';
import ErrorMessage from './components/ErrorMessage';
import SelectInput from './components/SelectInput';
import Footer from './components/Footer'
import BusStop from './types/BusStop';
import Result from './Result';

const towns = [['110', 'Antsirabe'], ['401', 'Mahajanga']]

function App() {
  const townInput = useRef<HTMLSelectElement>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [stops, setStops] = useState<BusStop[]>([]);
  const [errors, setErrors] = useState<string[]>([]);
  const startInput = useRef<HTMLSelectElement>(null);
  const endInput = useRef<HTMLSelectElement>(null);

  useEffect(() => {
    const s = new AntsirabeApiService();
    s.getStops().then(e => {
      if (e instanceof Error) {
        setErrors([e.message])
        setTimeout(() => {
          setErrors([])
        }, 4000)
      } else {
        setStops(e)
      }
    });
  }, [])

  function search(e: React.FormEvent) {
    e.preventDefault()
    setIsLoading(true);
  }

  return <>
    <aside className="error-message-container">
      {errors.map(eM => <ErrorMessage content={eM} />)}
    </aside>
    <main>
      <section>
        <h2>Trouvez le bus pour votre destination</h2>
        <form onSubmit={search}>
          <SelectInput ref={townInput} id='town' label='Ville' options={towns} />
          <SelectInput ref={startInput} id='start' label='Départ' options={stops} />
          <SelectInput ref={endInput} id='end' label='Arrivé' options={stops} />
          <button type="submit">Rechercher</button>
        </form>
      </section>
      <Result isLoading={isLoading} />
    </main>
    <Footer />
  </>
}

export default App