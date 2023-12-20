import './App.scss'
import Footer from './components/Footer'

function App() {
  return <>
    <main>
      <section>
        <h2>Trouvez le bus pour votre destination</h2>
        <form>
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
        {/* <h2>Résultat</h2> */}
      </section>
    </main>
    <Footer />
  </>
}

export default App