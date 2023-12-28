import { useEffect, useRef, useState } from 'react'

import './App.scss'

import AntsirabeApiService from './services/antsirabeApiService';
import ErrorMessage from './components/ErrorMessage';
import SelectInput from './components/SelectInput';
import Footer from './components/Footer'
import BusStop from './types/BusStop';
import Result from './Result';
import MahajangaApiService from './services/mahajangaApiService';
import TownApiService from './services/apiService';
import Bus from './types/Bus';

const towns = [['110', 'Antsirabe'], ['401', 'Mahajanga']]

function App() {
  const townInput = useRef<HTMLSelectElement>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [stops, setStops] = useState<BusStop[]>([]);
  const [errors, setErrors] = useState<string[]>([]);
  const startInput = useRef<HTMLSelectElement>(null);
  const endInput = useRef<HTMLSelectElement>(null);
  const [currentTown, setCurrentTown] = useState(towns[0]);
  const [service, setService] = useState<TownApiService>(new AntsirabeApiService());
  const [bus, setBus] = useState<Bus[]>([]);

  useEffect(() => {
    let s: TownApiService;

    if (currentTown.includes('110')) {
      s = new AntsirabeApiService()
    } else {
      s = new MahajangaApiService()
    }

    setService(s);

    setIsLoading(true);
    s.getStops().then(e => {
      setIsLoading(false);
      if (e instanceof Error) {
        setErrors([e.message])
        setTimeout(() => {
          setErrors([])
        }, 4000)
      } else {
        setStops(e)
      }
    });

  }, [currentTown])

  function changeTown() {
    const newTown = towns.filter(t => t[0] === townInput.current!.value)[0]
    setCurrentTown(newTown);
  }

  function search(e: React.FormEvent) {
    e.preventDefault()
    setIsLoading(true);
    let start: string | number = startInput.current!.value;
    let end: string | number = endInput.current!.value;
    if (service instanceof AntsirabeApiService) {
      start = parseInt(start);
      end = parseInt(end);
    }
    service.search(start, end).then(res => {
      setIsLoading(false);
      if (res instanceof Error) {
        setErrors([res.message])
      } else {
        setBus(res);
      }
    });
  }

  return <>
    <aside className="error-message-container">
      {errors.map(eM => <ErrorMessage content={eM} />)}
    </aside>
    <main>
      <section>
        <h2>Trouvez le bus pour votre destination</h2>
        <form onSubmit={search}>
          <SelectInput ref={townInput} id='town' label='Ville' options={towns} onChange={changeTown} />
          <SelectInput ref={startInput} id='start' label='Départ' options={stops} />
          <SelectInput ref={endInput} id='end' label='Arrivé' options={stops} />
          <button type="submit">Rechercher</button>
        </form>
      </section>
      <Result isLoading={isLoading} bus={bus} />
    </main>
    <Footer />
  </>
}

export default App