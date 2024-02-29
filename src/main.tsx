import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import RepositoryContext, { initialValue } from './context.ts'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RepositoryContext.Provider value={initialValue}>
      <App />
    </RepositoryContext.Provider>
  </React.StrictMode>,
)
