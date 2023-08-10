export default function formatTime(time, format = {
  hour: '2-digit',
  minute: '2-digit',
}) {
  return new Date(`August 19, ${time}`).toLocaleTimeString("en-US", format)
}
