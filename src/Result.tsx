import loadingAnimation from './assets/loading.gif'

type Props = {
    isLoading: boolean
}

export default function Result({ isLoading }: Props) {
    return <section className="result">
        {isLoading ? <img src={loadingAnimation} /> : <h2>Résultat</h2>}
    </section>
}