import { DynamicList, renderData, renderdeviceFilterSort } from "./DynamicList";
import { RDM_Device } from "./RDM_Device";
import { Server } from "./Server";
import {
  state,
  addDataToState,
  updateDataInState,
  sortManufacturer,
  sortAddress,
  filterManufacturer,
  sortUid,
} from "./state";

window.onload = () => {
    main()
}

var g_Server: Server;
var g_DeviceList: DynamicList;

export function main() {
    g_Server = new Server({
        device_added_callback: (device_data: RDM_Device) => {
            // Called when a new RDM Device has been discovered.
            // Create an RDM Device entry in the RDM Device List with the values in device_data.
            addDataToState(device_data)
            renderData(state.data)
            renderdeviceFilterSort(
              g_Server.GetDeviceCount(),
              g_Server.GetDeviceCount()
            );
            // console.log("Add Device", device_data)
        },
        device_updated_callback: (device_data: RDM_Device) => {
            // Called when an RDM Device parameter change is detected.
            // Update existing associated RDM Device entry in the RDM Device List with the values in device_data.
            updateDataInState(device_data)
            renderData(state.data)
            renderdeviceFilterSort(
              g_Server.GetDeviceCount(),
              g_Server.GetDeviceCount()
            );
            // console.log("Update Device", device_data)
        }
    })

    // Use Server.GetDeviceCount() to get number of devices in backend device list
    console.log("Current Device Count: ", g_Server.GetDeviceCount())
    // Use Server.GetDeviceByIndex() to get backend device by index (index 0 - first added device, index 2 - third added device, ...)
    console.log("First Device: ", g_Server.GetDeviceByIndex(0))

    document.getElementById("filter_none").onclick = () => {
        renderData(state.data)
        renderdeviceFilterSort(
          g_Server.GetDeviceCount(),
          g_Server.GetDeviceCount()
        );
        console.log("Set DynamicList filter to show all devices")
    }

    document.getElementById("filter_na").onclick = () => {
        const filteredManufacturer = filterManufacturer("Company NA");
        renderData(filteredManufacturer);
        renderdeviceFilterSort(
          filteredManufacturer.length,
          g_Server.GetDeviceCount(),
          "filter",
          "Company NA"
        );
        console.log('Set DynamicList filter to show devices if RDM_Device.manufacturer == "Company NA"')
    }

    document.getElementById("filter_tmb").onclick = () => {
        const filteredManufacturer = filterManufacturer("TMB");
        renderData(filteredManufacturer);
        renderdeviceFilterSort(
          filteredManufacturer.length,
          g_Server.GetDeviceCount(),
          "filter",
          "TMB"
        );
        console.log('Set DynamicList filter to show devices if RDM_Device.manufacturer == "TMB"')
    }

    document.getElementById("sort_uid").onclick = () => {
        renderData(sortUid());
        renderdeviceFilterSort(
          sortUid().length,
          g_Server.GetDeviceCount(),
          "sort",
          "UID"
        );
        console.log("Set DynamicList sort mode to RDM_Device.uid_value")
    }

    document.getElementById("sort_address").onclick = () => {
        renderData(sortAddress());
        renderdeviceFilterSort(
          sortAddress().length,
          g_Server.GetDeviceCount(),
          "sort",
          "Address"
        );
        console.log("Set DynamicList sort mode to RDM_Device.address")
    }

    document.getElementById("sort_manufacturer").onclick = () => {
        renderData(sortManufacturer());
        renderdeviceFilterSort(
          sortManufacturer().length,
          g_Server.GetDeviceCount(),
          "sort",
          "Manufacturer"
        );
        console.log("Set DynamicList sort mode to RDM_Device.manufacturer")
    }

    g_DeviceList = new DynamicList(document.getElementById("rdm_device_list"))
}