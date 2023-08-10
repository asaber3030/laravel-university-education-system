import ExcelPicture from "@/assets/images/excel.svg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import {faExclamationCircle, faFileImport} from "@fortawesome/free-solid-svg-icons";

export default function ErrorBox({ text, list, errors, icon = faExclamationCircle }) {
  return (
    <>
      {errors ? (
        <div className="error-box">
          <div className="left-error">
            <FontAwesomeIcon icon={icon} />
          </div>
          <div className="right-error">
            {text}
            <div className="boxes">
              {list.map(user => (
                <div className="box">{user.toLowerCase()}</div>
              ))}
            </div>
          </div>
        </div>
      ) : (
        <div></div>
      )}
    </>

  )
}
