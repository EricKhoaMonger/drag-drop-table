const workerCode = `
function makeTable(n) {
  console.log('worker makeTable', n);
  let currentRowIndex = 0;
  const table = [];
  while (currentRowIndex < n) {
    const row = [];
    for (let i = 1; i <= n; i++) {
      const rowCell = i;
      if (rowCell === 1) {
        // first cell number
        const id = rowCell + currentRowIndex;
        row.push({
          id: id,
          value: id,
          row: currentRowIndex,
          col: rowCell
        });
      } else if (rowCell % 2 === 0) {
        // even cell number
        const id = n * rowCell - currentRowIndex;
        row.push({
          id: id,
          value: id,
          row: currentRowIndex,
          col: rowCell
        });
      } else {
        // odd cell number
        const id = n * (rowCell - 1) + 1 + currentRowIndex;
        row.push({
          id: id,
          value: id,
          row: currentRowIndex,
          col: rowCell
        });
      }
    }
    currentRowIndex += 1;
    table.push(row);
  }
  return table;
}

self.addEventListener('message', event => {
  const { type, payload } = event.data;

  if (type === 'make-table') {
    const result = makeTable(payload);
  
    postMessage({
      type: 'done',
      payload: result
    });
  }
});
`;

const workerURL = URL.createObjectURL(new Blob([workerCode]));

const worker = new Worker(workerURL);

export function makeTablePropsWithWorker(n: number, cb: Function) {
  console.log('makeTablePropsWithWorker n', n);
  worker.postMessage({
    type: 'make-table',
    payload: n
  });
  worker.onmessage = function(ev) {
    if (ev.data.type === 'done') {
      cb(ev.data.payload);
    }
  };
}

export function terminateWorker() {
  worker.terminate();
  URL.revokeObjectURL(workerURL);
}
