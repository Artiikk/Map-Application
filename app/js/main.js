import { tableHeader, headerListener } from './modules/header';
import { tableBody } from './modules/body';
import { SORT_METHODS } from './modules/sort';
import { mapListener } from './modules/map';
import { overTipListener, outTipListener } from './modules/tooltip';

fetch('./assets/establishment-data.json')
  .then(resolve => resolve.json())
  .then(result => mainTable(result));

(function searchListener () {
  const inputField = document.getElementById('input-field');
  inputField.addEventListener('input', searchFunc);
}());

function searchFunc () {
  const filter = document.getElementById('input-field').value.toUpperCase();
  const trs = document.querySelectorAll('#parsed-table tr:not(.header)');

  trs.forEach(tr => (tr.style.display = [...tr.children].find(td =>
    td.innerHTML.toUpperCase().includes(filter)) ? '' : 'none'));
}


function mainTable (jsonFormat) {
  tableHeader();
  headerListener();

  tableBody(jsonFormat);
  SORT_METHODS.default();

  overTipListener();
  outTipListener();
}
