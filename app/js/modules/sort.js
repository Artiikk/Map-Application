const table = document.getElementById('parsed-table');

function sortBy(sort) {
  const tableRows = [...document.querySelectorAll('tr:not(.header)')];

  tableRows.sort(sort);

  for (let i = 0; i < tableRows.length; i++) {
    table.appendChild(tableRows[i]);
  }
}

function getContent(a, b, i) {
  const elemA = a.children[i].textContent;
  const elemB = b.children[i].textContent;

  return [elemA, elemB];
}

function titleSort(a, b) {
  const [elemA, elemB] = getContent(a, b, 0);

  return elemA.localeCompare(elemB);
}

function citySort(a, b) {
  const [elemA, elemB] = getContent(a, b, 1);

  return elemA.localeCompare(elemB);
}

function defaultSort(a, b) {
  const [elemA, elemB] = getContent(a, b, 0);

  return elemB.localeCompare(elemA);
}

function numberSort(a, b) {
  const [elemA, elemB] = getContent(a, b, 3);

  return parseInt(elemA) - parseInt(elemB);
}


function dateSort(a, b) {
  const [elemA, elemB] = getContent(a, b, 2);

  const parsedA = Date.parse(elemA);
  const parsedB = Date.parse(elemB);

  const dateA = isNaN(parsedA)
    ? Date.now()
    : new Date(a.children[2].textContent);
  const dateB = isNaN(parsedB)
    ? Date.now()
    : new Date(b.children[2].textContent);

  return dateA - dateB;
}

export const SORT_METHODS = {
  title: () => sortBy(titleSort),
  city: () => sortBy(citySort),
  date: () => sortBy(dateSort),
  number: () => sortBy(numberSort),
  default: () => sortBy(defaultSort),
};
