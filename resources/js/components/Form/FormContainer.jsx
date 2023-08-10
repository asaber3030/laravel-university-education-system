import InputLabel from "@/components/InputLabel";
import TextInput from "@/components/TextInput";
import InputError from "@/components/InputError";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faFile} from "@fortawesome/free-solid-svg-icons";

export const InputField = ({
 type = 'text',
 error = '',
 labelRequired = true,
 label,
 disabled=false,
 value = '',
 className,
 handleChange,
  placeholder = ''
}) => {
  return (
    <div className="form-group">
      <InputLabel  value={label} required={labelRequired} />
      <TextInput placeholder={placeholder} disabled={disabled} type={type} className={className} handleChange={handleChange} value={value} />
      <InputError message={error} />
    </div>
  )
}

export const FileInput = ({ label = '', labelRequired = true, handleChange, error }) => {
  return (
    <div className="form-file-group">
      <InputLabel value={label} required={labelRequired} />
      <TextInput handleChange={handleChange} type='file' />
      <FontAwesomeIcon icon={faFile} />
      <InputError message={error} />
    </div>
  )
}

export const TextArea = ({
   error = '',
   labelRequired = true,
   label,
   value = '',
   className,
   handleChange,
  height = '200px'
 }) => {
  return (
    <div className="form-group">
      <InputLabel value={label} required={labelRequired} />
      <textarea style={{ height: height }} className={`form-control ` + className} onChange={ handleChange }>
        {value}
      </textarea>
      <InputError message={error} />
    </div>
  )
}

export const CheckBox = ({ label, value, handleChange }) => {
  return (
    <div className="switch-container">
      <label className="switch">
        <input type="checkbox" onChange={handleChange} checked={value} />
        <span className="slider round"></span>
      </label>
      <div className="switch-text">
        {label}
      </div>
    </div>
  );
}


export const SelectBox = ({ disabled = false, selectedOptionValue, startingText = '----------', label, error = '', labelRequired = true, items = [], handleChange }) => {
  return (
    <div className="form-group">
      <InputLabel value={label} required={labelRequired} />
      <select disabled={disabled} className='form-select' onChange={handleChange}>
        <option value=''>{startingText}</option>
        {items.map(item => (
          <option selected={(selectedOptionValue == item.value) ? true : false} value={item.value}>{item.text}</option>
        ))}
      </select>
      <InputError message={error} />
    </div>
  )
}

export const SelectOptionGroup = ({ disabled = false, selectedOptionValue, startingText = '----------', label, error = '', labelRequired = true, items = [], handleChange }) => {
  return (
    <div className="form-group">
      <InputLabel value={label} required={labelRequired} />
      <select disabled={disabled} className='form-select' onChange={handleChange}>
        <option value=''>{startingText}</option>
        {items.map(item => (
          <optgroup label={item.groupTitle}>
            {item.list.map(i => (
              <option selected={(selectedOptionValue == i.value) ? true : false} value={i.value}>{i.text}</option>
            ))}
          </optgroup>
        ))}

      </select>
      <InputError message={error} />
    </div>
  )
}

export const FormContainer = ({ children }) => {
  return (
    <div className="form-container">
      <form encType='multipart/form-data'></form>
      {children}
    </div>
  )
}
