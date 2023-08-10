import StudentNavbar from "@/Pages/Student/Layout/Navbar";
import StudentSidebar from "@/Pages/Student/Layout/Sidebar";

import { useState } from "react";
import { Alert, Snackbar } from "@mui/material";
import { usePage } from "@inertiajs/inertia-react";

const StudentLayout = ({ children, user }) => {
  const { flash } = usePage().props
  const [flashMessageState, setFlashState] = useState(true)

  return (
    <div className='student-layout-main'>

      {flash.message && (
        <Snackbar open={flashMessageState} autoHideDuration={3000} anchorOrigin={{ vertical: 'top', horizontal: 'right' }} onClose={ () => setFlashState(false) }>
          <Alert onClose={ () => setFlashState(false) } severity={flash.type} sx={{ width: '500px' }}>
            {flash.message}
          </Alert>
        </Snackbar>
      )}

      <div className="left-container">
        <StudentSidebar user={user} />
      </div>
      <div className="right-container">
        <StudentNavbar user={user} />
        <div className="student-content-main">
          {children}
        </div>
      </div>

    </div>
  )

}

export default StudentLayout
