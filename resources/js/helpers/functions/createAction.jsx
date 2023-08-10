import { Tooltip } from "@mui/material";
import { Link } from "@inertiajs/inertia-react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export function createActionObject(url, params, tooltipTitle, icon, customClass = '') {
  return {
    key: Math.random() * 100000,
    url: url,
    params: params,
    tooltipTitle: tooltipTitle,
    icon: icon,
    customClass: customClass
  }
}

export function createAction(action) {
  return (
    <Tooltip followCursor={true} key={action.key} title={action.tooltipTitle} >
      <Link key={action.key} className={`btn btn-primary btn-sm ${action.customClass}`} href={ action.params ? route(action.url, action.params) : route(action.url) }>
        <FontAwesomeIcon icon={action.icon} />
      </Link>
    </Tooltip>
  )
}

export default function GridActionsContainer({ actions }) {
  return (
    <div className="table-actions">
      {actions.map(action => (
        <>
          {createAction(action)}
        </>
      ))}
    </div>
  )
}


