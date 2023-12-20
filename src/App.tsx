import { useState } from 'react'
import './App.scss'
import Footer from './components/Footer'
import loadingAnimation from './assets/loading.gif'

function App() {
  const [isLoading, setIsLoading] = useState(false);

  function search(e: React.FormEvent) {
    e.preventDefault()
    
    const loadingTimeout = 2000;

    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
    }, loadingTimeout);
  }

  return <>
    <main>
      <section>
        <h2>Trouvez le bus pour votre destination</h2>
        <form onSubmit={search}>
          <div className='input-group'>
            <label htmlFor="town">Ville</label>
            <select name="town" id="town">
              <option value="110">Antsirabe</option>
              <option value="401">Mahajanga</option>
            </select>
          </div>

          <div className='input-group'>
            <label htmlFor="start">Départ</label>
            <input type="text" id='start' />
          </div>

          <div className="input-group">
            <label htmlFor="end">Arrivé</label>
            <input type="text" id='end' />
          </div>

          <button type="submit">Rechercher</button>
        </form>
      </section>
      <section className="result">
        {isLoading ? <img src={loadingAnimation} /> : <h2>Résultat</h2>}
      </section>
    </main>
    <Footer />
  </>
}

export default App