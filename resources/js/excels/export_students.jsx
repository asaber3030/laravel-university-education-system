const ExportStudents = [
  ["Equipment ID", "Equipment Code", "Equipment Name", "Type", "Productivity", "Created At", "Last Update", 'Status'],
  ...equipments.map(item => [
    item.eq_id,
    item.eq_tag,
    item.eq_name,
    item.eq_type,
    item.productivity,
    csvDate(item.created_at),
    csvDate(item.updated_at),
    item.deleted_at ? 'Deleted' : 'Available'
  ])
];
