import {createBrowserRouter, RouterProvider} from 'react-router-dom'
import App from '../App'
import About from '../Component/About'
import Blog from '../Component/Blog'
import Home from '../Home/Home'
import Shop from '../Shop/Shopr'

const router =createBrowserRouter([{
    path:'/',
    element:<App />,
    children:[
        {
        path:'/',
        element: <Home />
    },
    {
        path:'/shop',
        element: <Shop />
    },
    {
        path:'/about',
        element: <About />
    },
    {
        path:'/blog',
        element: <Blog/>
    },
    {
        path:'/',
        element: <Shop />
    },
]
}])

export default router