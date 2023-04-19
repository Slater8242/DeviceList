import { RDM_Device } from './RDM_Device';
import { ISort, SortField } from './ISort'
import { IFilter } from './IFilter'

export class DynamicList {
  private total: HTMLElement
  private rows: HTMLElement

  private data: RDM_Device[] = []
  private currentData: RDM_Device[] = []

  private sort: ISort = {
    field: null,
    direction: null
  }

  private filter: IFilter = {
    field: null,
    value: null
  }

  constructor(private _root: HTMLElement) {
    this.total = _root.querySelector('.table-total')
    this.rows = _root.querySelector('.table-rows')
  }

  private getTotal() {
    return `
      <span id="deviceFilterSort">
        RDM Device List (${this.currentData.length}/${this.data.length} |
        ${this.filter.field} |
        ${this.sort.field}:${this.sort.direction})
      </span>
    `
  }

  addData(item: RDM_Device) {
    this.data.push(item)
    this.render()
  }

  updateData(item: RDM_Device) {
    this.data = this.data.map(el => {
      if (el.uid === item.uid) {
        return item
      }

      return el
    })
  }

  setFilter(filter: IFilter) {
    this.filter = filter
    this.render()
  }

  setSort(field: SortField) {
    if (this.sort.field === field) {
      this.sort.direction = this.sort.direction === 'ASC' ? 'DESC' : 'ASC'
    } else {
      this.sort = {
        field,
        direction: 'ASC'
      }
    }

    this.render()
  }

  private processData() {
    this.currentData = [...this.data]

    if (this.filter.field && this.filter.value) {
      this.currentData = this.data.filter((item) => item[this.filter.field] === this.filter.value)
    }

    if (this.sort.field) {
      switch(this.sort.field) {
        case 'manufacturer':
          this.currentData.sort((a, b) => {
            if (this.sort.direction === 'ASC') {
              return a.manufacturer.localeCompare(b.manufacturer)
            } else {
              return b.manufacturer.localeCompare(a.manufacturer)
            }
          })

          break

        case 'uid': {
          this.currentData.sort((a, b) => {
            if (this.sort.direction === 'ASC') {
              return a.uid.localeCompare(b.uid)
            } else {
              return b.uid.localeCompare(a.uid)
            }
          })
          break
        }

        case 'uid_integer':
          console.log(...this.currentData)
          const dir = this.sort.direction === 'ASC' ? 1 : -1
          this.currentData.sort((a, b) => {
            if (b.uid_integer > a.uid_integer) {
              return dir;
            } else if (a.uid_integer < b.uid_integer) {
              return dir * -1;
            } else {
              return 0;
            }
          })
          console.log(...this.currentData)
          break
      }
    }
  }

  private render() {
    this.processData()

    let rows = ''
    this.currentData.forEach(item => {
      rows += `
        <tr class="trStyle" id="row-${item.uid}">
          ${this.renderRow(item)}
        </tr>
      `
    })

    this.rows.innerHTML = rows
    this.total.innerHTML = this.getTotal()
  }

  private renderRow(data: RDM_Device){
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
}



