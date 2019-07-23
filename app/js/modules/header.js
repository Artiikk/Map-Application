import {
  sortBy,
  titleSort,
  citySort,
  defaultSort,
  dateSort,
  numberSort,
} from './sort';

const HEADER_DATA = [
  {
    title: 'Title',
    sortType: 'title',
    size: 'table-row-xl',
  },
  {
    title: 'City',
    sortType: 'city',
    size: 'table-row-md',
  },
  {
    title: 'Establishment',
    sortType: 'date',
    size: 'table-row-lg',
  },
  {
    title: 'Index',
    sortType: 'number',
    size: 'table-row-xs',
  },
];

export function tableHeader() {
  const parsedTable = document.getElementById('parsed-table');
  const trHeader = document.createElement('tr');
  trHeader.className = 'header';
  let html = '';

  HEADER_DATA.forEach(row => {
    html += `
      <th class="${row.size}">
      <input id="${row.sortType}"type="checkbox">
      <label for="${row.sortType}">${row.title}</label>
      </th>
    `.trim();
  });

  trHeader.insertAdjacentHTML('afterbegin', html);
  parsedTable.prepend(trHeader);
}

export function headerListener() {
  const trHeader = document.querySelector('.header');
  trHeader.addEventListener('click', headerStruct);
}

const SORT_METHODS = {
  title: () => sortBy(titleSort),
  city: () => sortBy(citySort),
  date: () => sortBy(dateSort),
  number: () => sortBy(numberSort),
};

function headerStruct({ target }) {
  target.checked ? SORT_METHODS[target.id]() : sortBy(defaultSort);
}
