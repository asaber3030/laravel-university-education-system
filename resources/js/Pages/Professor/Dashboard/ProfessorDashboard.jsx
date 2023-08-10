import { usePage } from "@inertiajs/inertia-react";
import ProfessorLayout from "@/Layouts/Professor/ProfessorLayout";

const ProfessorDashboard = () => {

  const { professor } = usePage().props

  return (
    <ProfessorLayout>
      <div>Hello world</div>
    </ProfessorLayout>
  )
}

export default ProfessorDashboard
