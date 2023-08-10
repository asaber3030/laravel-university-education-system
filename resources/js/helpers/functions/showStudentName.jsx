import {Link} from "@inertiajs/inertia-react";
import {nationalID} from "@/helpers/functions/student";

export default function showStudentName(student) {
  return (
    <span className="student-name-span">
      <span className="inner-student-name">{student.name}</span>
      <span className="inner-student-id"><Link href={route('professors.students.view', student.id)}>{nationalID(student.national_id)}</Link></span>
    </span>
  )
}
