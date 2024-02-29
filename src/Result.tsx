import loadingAnimation from './assets/loading.gif'
import BusItem from './components/BusItem'
import { GoUpBottom } from './components/GoUpButton'
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
            ? <img src={loadingAnimation} />
            : buses === undefined ? <p>{initialMessage}</p> : <>
                <ul className='buses'>
                    {buses!.length > 0 ? buses!.map(b => <BusItem bus={b} />) : <p>{noBusMessage}</p>}
                </ul>
            </>
        }
        <GoUpBottom />
    </section>
}