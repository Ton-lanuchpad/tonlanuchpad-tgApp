import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { TonConnectUIProvider } from '@tonconnect/ui-react'
import { UserDataProvider } from './Context/userData.jsx'
import { PoolProvider } from "./providers/PoolProvider.tsx";

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <TonConnectUIProvider manifestUrl="https://scancoin.io/token/tonconnect-manifest.json">
      <UserDataProvider>
        <PoolProvider>
          <App />
        </PoolProvider>
      </UserDataProvider>
    </TonConnectUIProvider>
  </StrictMode>

)
