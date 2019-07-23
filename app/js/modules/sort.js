export function sortBy (sort) {
  const table = document.getElementById('parsed-table');
  const tableRows = [...document.querySelectorAll('tr:not(.header)')];

  tableRows.sort(sort);

  for (let i = 0; i < tableRows.length; i++) {
    table.appendChild(tableRows[i]);
  }
}

export function titleSort (a, b) {
  const elemA = a.children[0].textContent;
  const elemB = b.children[0].textContent;

  return elemA.localeCompare(elemB);
}

export function citySort (a, b) {
  const elemA = a.children[1].textContent;
  const elemB = b.children[1].textContent;

  return elemA.localeCompare(elemB);
}

export function defaultSort (a, b) {
  const defaultA = a.children[0].textContent;
  const defaultB = b.children[0].textContent;

  return defaultB.localeCompare(defaultA);
}

export function numberSort (a, b) {
  const elemA = a.children[3].textContent;
  const elemB = b.children[3].textContent;

  return parseInt(elemA) - parseInt(elemB);
}


export function dateSort (a, b) {
  const parsedA = Date.parse(a.children[2].textContent);
  const parsedB = Date.parse(b.children[2].textContent);

  const dateA = isNaN(parsedA)
    ? Date.now()
    : new Date(a.children[2].textContent);
  const dateB = isNaN(parsedB)
    ? Date.now()
    : new Date(b.children[2].textContent);

  return dateA - dateB;
}
