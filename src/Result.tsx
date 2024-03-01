import BusItem from './components/BusItem'
import { GoUpBottom } from './components/GoUpButton'
import LoadingAnimation from './components/LoadingAnimation'
import Bus from './types/Bus'

type Props = {
    isLoading: boolean
    buses?: Bus[],
}

const noBusMessage = "Il n'y a pas de bus  pour ce trajet, veuillez choisir d'autre arrêts.";
const initialMessage = "Le résultat de recherche sera affiché ici.";

export default function Result({ isLoading, buses }: Props) {
    return <section id="result" className="result">
        {isLoading
            ? <LoadingAnimation />
            : buses === undefined ? <p>{initialMessage}</p> : <>
                {buses.length > 0 ? <ul className='buses'> {buses!.map(b => <BusItem bus={b} />)} </ul> : <p>{noBusMessage}</p>}
            </>
        }
        <GoUpBottom />
    </section>
}