import { placeInfo } from './body';

let showingTooltip;

export function overTipListener () {
  const parsedTable = document.getElementById('parsed-table');
  parsedTable.addEventListener('mouseover', event => overTipStruct(event));
}

export function outTipListener () {
  const parsedTable = document.getElementById('parsed-table');
  parsedTable.addEventListener('mouseout', outTipStruct);
}

function overTipStruct ({ target }) {
  try {
    while (target !== this) {
      const id = target.getAttribute('id');
      var information = placeInfo[id];

      if (information) break;
      target = target.parentNode;
    }
  } catch (e) {
    console.log("Doesn't have an attribute 'ID'");
  }
  if (!information) return;
  showingTooltip = showTooltip(information, target);
}

function outTipStruct () {
  if (showingTooltip) {
    document.body.removeChild(showingTooltip);
    showingTooltip = false;
  }
}

function showTooltip (information, elem) {
  const tooltipElem = document.createElement('div');
  tooltipElem.style.height = `${292}px`;
  const widthRegulation = document.documentElement.clientWidth;
  tooltipElem.style.width = `${widthRegulation - elem.offsetWidth - 10}px`;

  tooltipElem.className = 'tooltip';
  tooltipElem.innerHTML += `INFORMATION: ${information[0]}`;
  tooltipElem.innerHTML += `<br><br>ADDRESS: ${information[1]}`;
  tooltipElem.innerHTML += `<br><br>SHEDULE: ${information[2]}`;

  document.body.appendChild(tooltipElem);

  const heightRegulation = document.documentElement.clientHeight / 6;
  const elemCoordinates = elem.getBoundingClientRect();

  const left = elemCoordinates.right + 2;
  let { top } = elemCoordinates;

  if (top < 0) top += elem.offsetHeight;
  if (top > heightRegulation) top = heightRegulation;

  tooltipElem.style.left = `${left}px`;
  tooltipElem.style.top = `${top}px`;
  tooltipElem.style.backgroundColor = '#FEECD0';

  return tooltipElem;
}
