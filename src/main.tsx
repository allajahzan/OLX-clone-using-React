import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import { AuthProvider } from './context/authContext.tsx'
import { ItemsContextProvider } from './context/itemsContext.tsx'


createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <ItemsContextProvider >
          <App />
        </ItemsContextProvider>
      </AuthProvider>
    </BrowserRouter>
  </StrictMode>,
)
