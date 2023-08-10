export default function InputError({ message, className = '' }) {
    return message ? <p className={'text-sm text-red-600 input-error-text' + className}>{message}</p> : null;
}
