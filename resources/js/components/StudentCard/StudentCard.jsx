import { APP_URL } from "@/helpers/constants";
import { Link   } from "@inertiajs/inertia-react";

const StudentCard = ({ student }) => {
  return (
    <div className="student-card">
      <img src={APP_URL + student.picture} alt=""/>
      <span>{student.name} <span><Link href={route('professors.students.view', student.id)}>{student.username}</Link></span></span>
    </div>
  )
}

export default StudentCard
