import loadingAnimation from './assets/loading.gif'
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
                    {bus.map(b => <li>{b.name}</li>)}
                </ul>
            </>
        }
    </section>
}