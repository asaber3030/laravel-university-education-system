import ExcelPicture from "@/assets/images/excel.svg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import {faFileImport} from "@fortawesome/free-solid-svg-icons";

export default function ImportExcel({ handleChange, handleSubmit, h1 = 'Click on the image to upload .csv file!' }) {
  return (
    <div className="import-excel">
      <div className="container-file">
        <input type='file' onChange={handleChange} />
        <img src={ExcelPicture} />
      </div>
      <div className="text-box">
        <h1>{h1}</h1>
        <button onClick={handleSubmit} className='btn btn-sm btn-primary'><FontAwesomeIcon icon={faFileImport} /> Upload!</button>
      </div>
    </div>
  )
}
