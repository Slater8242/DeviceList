import { renderData } from './DynamicList'
import { RDM_Device } from './RDM_Device'

interface IState {
  data: RDM_Device[]
}

export const state: IState = {
  data: []
}

export const addDataToState = (item: RDM_Device) => {
  state.data.push(item)
}

export const updateDataInState = (item: RDM_Device) => {
  state.data = state.data.map(el => {
    if (el.uid === item.uid) {
      return item
    }

    return el
  })
}

// export const sortByUID = () => {
//   const sortedData = state.data.sort((a,b)=> a.uid_integer.valueOf() - b.uid_integer)
//   console.log(sortedData);
//   renderData(sortedData)
// }

export const filterTmb = (manufacturerName:string) => {
  const filteredData = state.data.filter(item => item.manufacturer === manufacturerName )
  console.log(filteredData);
  renderData(filteredData)
}

export const sortByAddress = () => {
  const sortedData = state.data.sort((a,b)=> a.address - b.address)
  console.log(sortedData);
  renderData(sortedData)
}

export const sortByManufacturer = () => {
  const sortedData = state.data.sort((a, b) => a.manufacturer.localeCompare(b.manufacturer));
  renderData(sortedData)
}
