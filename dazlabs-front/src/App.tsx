import ItemsList from './pages/ItemsList'
import Login from './pages/Login';
import Register from './pages/Register';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import './App.css'

const router = createBrowserRouter([
  {
    path: "/",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/cat-list",
    element: <ItemsList />,
  },
]);

function App() {

  return (
    <RouterProvider router={router} />
  )
}

export default App
