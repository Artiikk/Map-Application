export const placeInfo = {};

export function tableBody (parsedJSON) {
  const fragment = document.createDocumentFragment();
  const table = document.getElementById('parsed-table');

  for (let i = 0; i < parsedJSON.length; i++) {
    const {
      urls,
      title,
      location: {
        longitude,
        latitude,
        city,
        adress,
        zipcode,
      },
      dates: {
        startdate,
      },
      details: {
        en: {
          shortdescription,
          calendarsummary,
        },
      },
    } = parsedJSON[i];

    const long = Number(longitude.replace(',', '.'));
    const lat = Number(latitude.replace(',', '.'));

    const BODY_DATA = [{
      size: 'table-row-xl',
      title: `<a href="${urls}" target="_blank">${title}</a>`
    }, {
      size: 'table-row-md',
      title: `${city}`
    }, {
      size: 'table-row-lg',
      title: `${startdate}`
    }, {
      size: 'table-row-xs',
      title: `${zipcode}`
    }];

    let html = '';
    BODY_DATA.forEach(row => {
      html += `<td class="${row.size}">${row.title}</td>`.trim();
    });

    const tr = document.createElement('tr');
    tr.setAttribute('id', i);
    const id = tr.getAttribute('id');
    placeInfo[id] = [shortdescription, adress, calendarsummary, long, lat];

    tr.insertAdjacentHTML('afterbegin', html);
    fragment.append(tr);
  }

  table.append(fragment);
  dateStruct();
}

function dateStruct () {
  const table = document.getElementById('parsed-table');
  const tableRows = [...table.querySelectorAll('tr:not(.header)')];
  const options = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  };

  for (let i = 0; i < tableRows.length; i++) {
    const date = tableRows[i].children[2].textContent.split('-');

    const elemDate = date[2];
    date[2] = date[0];
    date[0] = elemDate;
    date.join(',');

    tableRows[i].children[2].textContent = date;
    const parsedDate = Date.parse(tableRows[i].children[2].textContent);

    tableRows[i].children[2].textContent = isNaN(parsedDate)
      ? 'No information'
      : new Date(parsedDate).toLocaleString('en-US', options);
  }
}
