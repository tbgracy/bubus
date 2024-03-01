import { useContext, useEffect, useRef } from "react";

import BusSelect from "./BusSelect";
import { Action, State } from "../reducer";
import TownSelect from "./TownSelect";
import RepositoryContext from "../context";


export default function Form({ state, dispatch }: { state: State, dispatch: React.Dispatch<Action> }) {
  const aRef = useRef<HTMLAnchorElement>(null);
  const townInput = useRef<HTMLSelectElement>(null);
  const startInput = useRef<HTMLSelectElement>(null);
  const endInput = useRef<HTMLSelectElement>(null);
  const { repository, towns } = useContext(RepositoryContext);

  useEffect(() => {
    if (state.effects.includes('FETCH_BUSES')) {
      const start = {
        id: startInput.current!.value,
        name: startInput.current!.value,
      }
      const end = {
        id: endInput.current!.value,
        name: endInput.current!.value,
      }
      repository.getBuses(
        start, end,
        { code: Number.parseInt(townInput.current!.value) },
      ).then((result) => {
        if (result instanceof Error) {
          dispatch({ type: 'ERROR', message: result.message })
        } else {
          dispatch({ type: 'DONE', data: result });
        }
      })
    }

    if (state.effects.includes('FETCH_STOPS')) {
      repository.getStops({ code: Number.parseInt(townInput.current!.value) }).then((result) => {
        if (result instanceof Error) {
          dispatch({ type: 'ERROR', message: result.message })
        } else {
          dispatch({ type: 'DONE', data: result });
        }
      });
    }

    return () => { };
  }, state.effects);

  function changeTown() {
    dispatch({
      type: 'CHANGE_TOWN',
    })
  }

  function searchBus(e: React.FormEvent) {
    e.preventDefault();
    dispatch({
      type: 'SEARCH'
    })
  }

  return <section>
    <h2>Trouvez le bus pour votre destination</h2>
    <form onSubmit={searchBus}>
      <TownSelect ref={townInput} id='town' label='Ville' options={towns} onChange={changeTown} />
      <BusSelect ref={startInput} id='start' label='Départ' options={state.data.stops} isLoading={state.loadingStops} />
      <BusSelect ref={endInput} id='end' label='Arrivé' options={state.data.stops} isLoading={state.loadingStops} />
      <a ref={aRef} href="#result" hidden></a>
      <button
        type="submit"
        disabled={state.loadingBuses || state.loadingStops || (!state.data.stops?.length ?? -1 > 0)}>
        {(state.loadingBuses || state.loadingStops) ? "..." : "Rechercher "}
      </button>
    </form>
  </section>
}