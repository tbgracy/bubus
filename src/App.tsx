import { useState } from 'react'
import './App.scss'
import Footer from './components/Footer'
import Result from './Result';
import TextInput from './components/TextInput';
import SelectInput from './components/SelectInput';

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
          <SelectInput id='town' label='Ville' options={[['110', 'Antsirabe'], ['401', 'Mahajanga']]} />
          <TextInput id='start' label='Arrivé' />
          <TextInput id='end' label='Départ' />
          <button type="submit">Rechercher</button>
        </form>
      </section>
      <Result isLoading={isLoading} />
    </main>
    <Footer />
  </>
}

export default App