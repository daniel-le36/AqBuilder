import Papa from "papaparse";
function doStuff(data) {
  //Data is usable here
  return data;
}

function parseData(url, callBack) {
  Papa.parse(url, {
    download: true,
    dynamicTyping: true,
    complete: function (results) {
      callBack(results.data);
    },
  });
}
export default DataImport;
