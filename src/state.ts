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
