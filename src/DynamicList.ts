import { RDM_Device } from './RDM_Device';

export class DynamicList {
    constructor(private _root: HTMLElement) { }
}

const table = document.getElementById("dataTable") as HTMLTableElement;
const deviceCountElem = document.getElementById(
  "deviceFilterSort"
) as HTMLSpanElement;

export function renderdeviceFilterSort(
  filterVisibleCount?: number,
  deviceCount?: number,
  filterSort?: string,
  filterSortname?: string
) {
  const deviceCountDom = `
    <span id="deviceFilterSort">
      RDM Device List (${filterVisibleCount}/${deviceCount} | 
      ${filterSort === "filter" ? filterSortname : "none"} | 
      ${filterSort === "sort" ? filterSortname : "none"})
    </span>
  `;
  
  deviceCountElem.innerHTML = deviceCountDom;
}

export function renderData(data: RDM_Device[]) {
  let rows = ''
  data.forEach(item => {
    rows += `
    <tr class="trStyle" id="row-${item.uid}">
      ${rowData(item)}
    </tr>
  `
  })

  table.innerHTML = rows
}

function rowData(data: RDM_Device){
  const {
    is_online,
    uid,
    label,
    manufacturer,
    model,
    mode_index,
    mode_count,
    address,
  } = data;
  const uidMatch = uid.match(/^\d\w{3}/gm);

    let options = "";
    for (let i = 0; i <= mode_count; i++) {
      options += `<option ${
        mode_index === i ? "selected" : ""
      }>Mode #${i}</option>`;
    }

    const select = `<select>${options}</select>`;

  return `
    <td>
      <span class="${is_online ? "success" : "danger"}"></span>
    </td>
    <td>${uid.replace(/^\d\w{3}/gm, uidMatch[0] + ":")}</td>
    <td><span class="labelStyle">${label}</span></td>
    <td>${manufacturer}</td>
    <td>${model}</td>
    <td>${select}</td>
    <td><span class="addressStyle">${address}</span></td>
  `;
}
