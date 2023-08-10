export default function createBreadCrumb(key, title, bold, active, url, params) {
  return { key: key, isActive: active, title: title, bold: bold, url: url, params: params }
}
