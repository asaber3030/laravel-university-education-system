import { Link } from "@inertiajs/inertia-react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const PageHeader = ({
  allowBreadcrumb = false,
  breadCrumbs = [],
  pageTitle = '',
  pageIcon,
  pageRightComponent,
  customClasses
 }) => {
  return (
    <div className={`page-header ${customClasses}`}>

      {allowBreadcrumb && (
        <nav aria-label="breadcrumb">
          <ol className="breadcrumb">
            {breadCrumbs.map(bread => (
              <li key={bread.key} className={`breadcrumb-item ${bread.isActive && 'active'}`} aria-current={bread.isActive && "active"}>
                {bread.bold ? (
                  <Link href={route(bread.url, bread.params)}><b>{bread.title}</b></Link>
                ) : (
                  <Link href={route(bread.url, bread.params)}>{bread.title}</Link>
                )}
              </li>
            ))}
          </ol>
        </nav>
      )}
      <div className="page-header-top">

        <div className="left-items">
          <FontAwesomeIcon icon={pageIcon} />
          <h6>{pageTitle}</h6>
        </div>

        <div className="right-items">
          {pageRightComponent}
        </div>

      </div>

    </div>
  )
}

export default PageHeader
