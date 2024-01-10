import { useRef, useState, useEffect } from "react";

import AntsirabeApiService from "../services/antsirabeApiService";
import TownApiService from "../services/apiService";
import MahajangaApiService from "../services/mahajangaApiService";
import MockApiService from "../services/mockService";
import Bus from "../types/Bus";
import BusStop from "../types/BusStop";
import SelectInput from "./SelectInput";

const towns = [['110', 'Antsirabe'], ['401', 'Mahajanga'], ['666', 'Imaginary']]

export default function Form({ setIsLoading, setErrors, setBus }: { setIsLoading: (arg: boolean) => void, setErrors: (arg: string[]) => void, setBus: (arg: Bus[]) => void }) {
    const townInput = useRef<HTMLSelectElement>(null);
    const startInput = useRef<HTMLSelectElement>(null);
    const endInput = useRef<HTMLSelectElement>(null);
    const [currentTown, setCurrentTown] = useState(towns[0]);
    const [stops, setStops] = useState<BusStop[]>([]);
    const aRef = useRef<HTMLAnchorElement>(null);
  
    const [service, setService] = useState<TownApiService>(new AntsirabeApiService());
  
    useEffect(() => {
      let s: TownApiService;
  
      if (currentTown.includes('110')) {
        s = new AntsirabeApiService()
      } else if (currentTown.includes('401')) {
        s = new MahajangaApiService()
      } else {
        s = new MockApiService();
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
  
    function searchBus(e: React.FormEvent) {
      e.preventDefault();

      aRef.current!.click();

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
  
    return <section>
      <h2>Trouvez le bus pour votre destination</h2>
      <form onSubmit={searchBus}>
        <SelectInput ref={townInput} id='town' label='Ville' options={towns} onChange={changeTown} />
        <SelectInput ref={startInput} id='start' label='Départ' options={stops} />
        <SelectInput ref={endInput} id='end' label='Arrivé' options={stops} />
        <a ref={aRef} href="#result" hidden></a>
        <button type="submit">Rechercher</button>
      </form>
    </section>
  }