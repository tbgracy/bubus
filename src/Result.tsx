import loadingAnimation from './assets/loading.gif'
import Bus from './types/Bus'

type Props = {
    isLoading: boolean
    bus: Bus[],
}

export default function Result({ isLoading, bus }: Props) {
    return <section className="result">
        {isLoading ? <img src={loadingAnimation} /> : <h2>Résultat</h2>}
        <ul>
            {bus.map(b => <li>{b.name}</li>)}
        </ul>
    </section>
}