import { RDM_Device } from './RDM_Device';

export class DynamicList {
    constructor(private _root: HTMLElement) { }
}

const table = document.getElementById("na-table") as HTMLTableElement;

export function sendData(data: RDM_Device) {
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

  const row = table.insertRow();
  row.classList.add("trStyle");

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
    <td><span class="addressStyle">${address}</span></td>`;
    
  row.innerHTML = cells;
  
}

export function updateData(data: RDM_Device) {
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

  const is_onlineSpanElem = document.getElementById(`is_online ${uid}`);
  const labelSpanElem = document.getElementById(`label ${uid}`);
  const manufacturerTdElem = document.getElementById(`manufacturer ${uid}`);
  const modelTdElem = document.getElementById(`model ${uid}`);
  const addressSpanElem = document.getElementById(`address ${uid}`);
  const selectElem = document.getElementById(`select ${uid}`) as HTMLSelectElement;

  for (let i = 1; i <= mode_count; i++) {
    i == mode_index ? (selectElem.value = `Mode #${i}`) : null;
  }
  console.log(selectElem.selectedIndex);
  
  labelSpanElem.textContent = label;
  manufacturerTdElem.textContent = manufacturer;
  modelTdElem.textContent = model;
  addressSpanElem.textContent = address.toString();

  if (is_online == true) {
   is_onlineSpanElem.classList.remove("danger") 
   is_onlineSpanElem.classList.add("success") 
  }else{
    is_onlineSpanElem.classList.remove("success");
    is_onlineSpanElem.classList.add("danger");
  }
}