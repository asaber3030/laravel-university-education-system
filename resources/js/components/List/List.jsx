import { DataGrid } from "@mui/x-data-grid";

const List = ({ columns, rows, checkBox = true, perPage = 100, handleSelected, contentHeight = '600px' }) => {

  return (
    <div className="listing-content">
      <div className="table-content" style={{ height: contentHeight }}>
        <DataGrid
          columns={columns}
          rows={rows}
          checkboxSelection={checkBox}
          onSelectionModelChange={handleSelected}
          pageSize={perPage}
        />
      </div>
    </div>

  )
}

export default List
