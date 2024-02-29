import { BiRefresh } from 'react-icons/bi';
import { Action } from '../reducer';
export default function ErrorMessage({ content, dispatch }: { content: string, dispatch: React.Dispatch<Action> }) {
    function handleReload() {
        dispatch({
            type: 'CHANGE_TOWN'
        })
    }

    return <article className="error-message">
        {content}
        <span className='reload-button' onClick={handleReload}>
            <BiRefresh size={24}/>
        </span>
    </article>
}