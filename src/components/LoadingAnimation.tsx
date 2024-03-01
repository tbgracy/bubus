import Lottie from 'react-lottie'
import animationData from '../assets/loading.json'

export default function LoadingAnimation() {
    const defaultOptions = {
        loop: true,
        autoplay: true,
        animationData: animationData,
    }
    return (
        <div>
            <Lottie options={defaultOptions}/>
        </div>
    )
}