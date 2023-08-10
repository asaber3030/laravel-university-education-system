import DeleteImage from "@/assets/images/delete.svg";
import { Link } from "@inertiajs/inertia-react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faCheck, faTimes, faTrash} from "@fortawesome/free-solid-svg-icons";

const ActionAlert = ({ title, type, paragraph, children, submitAction, cancelRoute, cancelParams }) => {
  return (
    <>
      <div className="delete-alert">
        <div className="image">
          <img src={DeleteImage} alt="" />
        </div>
        <div className="text">
          <h6 className="header">{title}</h6>
          <p dangerouslySetInnerHTML={{ __html: paragraph }} />
          <p>{children}</p>
        </div>
        <div className="footer">
          <Link href={route(cancelRoute, [cancelParams])} className="btn btn-dark btn-sm"><FontAwesomeIcon icon={faTimes} /> Cancel</Link>
          <button onClick={submitAction} className={type == 'delete' ? 'btn btn-danger btn-sm' : 'btn btn-primary btn-sm'}><FontAwesomeIcon icon={faCheck} /> Submit</button>
        </div>
      </div>
    </>
  )
}

export default ActionAlert
