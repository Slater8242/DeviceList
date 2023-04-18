import { RDM_Device } from './RDM_Device';

export class DynamicList {
    constructor(private _root: HTMLElement) { }
}

const table = document.getElementById("na-table") as HTMLTableElement;

export function sendData(data: RDM_Device) {

  const row = table.insertRow();
  row.classList.add("trStyle");
  row.setAttribute("id",`row-${data.uid}`)

  rowData(data, row);
}

export function updateData(data: RDM_Device) {
  const row = document.getElementById(`row-${data.uid}`) || document.createElement('tr');

  rowData(data, row);
}

function rowData(data: RDM_Device, row: HTMLElement){
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

  let options = "";
  for (let i = 1; i <= mode_count; i++) {
    options += `<option ${
      mode_index === i ? "selected" : ""
    }>Mode #${i}</option>`;
  }

  const select = `<select>${options}</select>`;

  let cells = `
    <td>
      <span class="${is_online ? "success" : "danger"}"></span>
    </td>
    <td>${uid}</td>
    <td><span class="labelStyle">${label}</span></td>
    <td>${manufacturer}</td>
    <td>${model}</td>
    <td>${select}</td>
    <td><span class="addressStyle">${address}</span></td>
  `;

  row.innerHTML = cells;
}