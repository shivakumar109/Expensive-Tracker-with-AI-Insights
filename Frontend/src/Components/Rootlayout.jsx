import Header from './Header.jsx'
import Footer from './Footer.jsx' 
import { Outlet } from 'react-router'
import { useEffect } from 'react'
const Rootlayout = () => {
  return (
    <div>
      <Header/>
          {/* component placeholder */}
          <div className='mx-20 min-h-screen'>
               <Outlet/>
          </div>
          <Footer/> 
    </div>
  )

};

export default Rootlayout;
