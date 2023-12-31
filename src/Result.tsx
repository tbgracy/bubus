import loadingAnimation from './assets/loading.gif'
import BusItem from './components/BusItem'
import Bus from './types/Bus'

type Props = {
    isLoading: boolean
    bus: Bus[],
}

export default function Result({ isLoading, bus }: Props) {
    return <section className="result">
        {isLoading
            ? <img src={loadingAnimation} />
            : <>
                <ul className='buses'>
                    {bus.map(b => <BusItem bus={b} />)}
                </ul>
            </>
        }
    </section>
}