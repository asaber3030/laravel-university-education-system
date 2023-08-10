import './style.scss'

import { useState } from "react";
import { usePage } from "@inertiajs/inertia-react";

import ProfessorSidebar from "@/components/Sidebars/ProfessorSidebar";
import ProfessorNavbar from "@/components/Navbars/ProfessorNavbar";

import { Alert, Snackbar } from "@mui/material";

const ProfessorLayout = ({ children }) => {

  const { professor, flash } = usePage().props
  const [flashMessageState, setFlashState] = useState(true)

  return (

   <div className='professor-layout'>

     {flash.message && (
       <Snackbar open={flashMessageState} autoHideDuration={3000} anchorOrigin={{ vertical: 'top', horizontal: 'right' }} onClose={ () => setFlashState(false) }>
         <Alert onClose={ () => setFlashState(false) } severity={flash.type} sx={{ width: '500px' }}>
           {flash.message}
         </Alert>
       </Snackbar>
     )}

     <div className="left-professor-content">

       <ProfessorSidebar />

     </div>


     <div className="right-professor-content">

      <ProfessorNavbar />

      <div className="main-content">{children}</div>

     </div>

   </div>
  )

}

export default ProfessorLayout
