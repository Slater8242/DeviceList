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

export const filterManufacturer = (manufacturerName:string, array: RDM_Device[]) => {
  return array.filter((item) => item.manufacturer === manufacturerName);
};

export const sortAddress = () => {
  return state.data.sort((a, b) => a.address - b.address);
}

export const sortManufacturer = () => {
  return state.data.sort((a, b) => a.manufacturer.localeCompare(b.manufacturer));
}

export const sortUid = () => {
  return state.data.sort((a, b) => {
    if (a.uid_integer > b.uid_integer) {
      return 1;
    } else if (a.uid_integer < b.uid_integer) {
      return -1;
    } else {
      return 0;
    }
  });
}