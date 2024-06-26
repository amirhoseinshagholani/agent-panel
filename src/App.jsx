import { RouterProvider } from 'react-router-dom'
import Login from './features/components/login'
import router from './router'
import { getToken } from './core/getToken';

function App() {
  const getBaseData =  getToken();
  return (
    <>
      <RouterProvider router={router}/> 
    </>
  )
}

export default App
