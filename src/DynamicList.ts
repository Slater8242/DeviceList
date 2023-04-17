import { RDM_Device } from './RDM_Device';

export class DynamicList {
    constructor(private _root: HTMLElement) { }
}

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

  const table = document.getElementById("na-table") as HTMLTableElement;
  const row = table.insertRow();

  const is_onlineTd = row.insertCell();
  const uidTd = row.insertCell();
  const labelTd = row.insertCell();
  const manufacturerTd = row.insertCell();
  const modelTd = row.insertCell();
  const mode_indexTd = row.insertCell();
  const addressTd = row.insertCell();
  const select = document.createElement("select");
  const is_onlineSpan = document.createElement("span");
  const labelSpan = document.createElement("span");
  const addressSpan = document.createElement("span");
  const uidMatch = uid.match(/^\d\w{3}/gm);

  is_onlineSpan.setAttribute("id", `is_online ${uid}`);
  labelSpan.setAttribute("id", `label ${uid}`);
  manufacturerTd.setAttribute("id", `manufacturer ${uid}`);
  modelTd.setAttribute("id", `model ${uid}`);
  addressSpan.setAttribute("id", `address ${uid}`);
  select.setAttribute("id", `select ${uid}`);
  
  select.classList.add("selectStyle");
  
  for (let i = 1; i <= mode_count; i++) {
    let option = document.createElement("option");
    option.text = `Mode #${i}`;
    select.appendChild(option);
    i == mode_index ? select.value = `${i}` : null
  }
  console.log(select.options[2]);

  labelSpan.classList.add("box");
  addressSpan.classList.add("box");

  labelSpan.style.display = "inline-block";
  labelSpan.style.width = "210px";
  addressSpan.style.display = "inline-block";
  addressSpan.style.width = "50px";
  
  addressTd.appendChild(addressSpan);
  labelTd.appendChild(labelSpan);
  is_onlineTd.appendChild(is_onlineSpan);
  mode_indexTd.appendChild(select);

  uidTd.textContent = uid.replace(/^\d\w{3}/gm, uidMatch[0] + ":");
  labelSpan.textContent = label;
  manufacturerTd.textContent = manufacturer;
  modelTd.textContent = model;
  addressSpan.textContent = address.toString();

  is_online == true
    ? is_onlineSpan.classList.add("success")
    : is_onlineSpan.classList.add("danger");
  
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