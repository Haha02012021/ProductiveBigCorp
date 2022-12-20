export const createDataTable = (columns, n) => {
  const dataTable = new Array();
  for (let j = 1; j <= n; j++) {
    const m = { key: j };
    for (let i = 0; i < columns.length; i++) {
      if (columns[i].render === undefined) {
        m[columns[i].key] = "store";
      }
    }
    dataTable.push(m);
  }
  return dataTable;
};
