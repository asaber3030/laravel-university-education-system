import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

const ProfessorLayoutHeader = ({ title, icon, children }) => {
  return (
    <div className="layout-header">
      <h5><FontAwesomeIcon icon={icon} /> {title}</h5>
      <div className="layout-actions">
        {children}
      </div>
    </div>
  )
}

export default ProfessorLayoutHeader
