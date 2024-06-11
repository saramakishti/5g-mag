// import XMLParser from 'react-xml-parser';

// class XmlReportLoader {

//     constructor() {
//         // this.xml = this._loadSampleXml();
//         // this.json = this._convertToJson();
//         // this._populateReceptionReportTable();
//         // this._populateQoeReportTable();
//         // this._populateMpdInformationTable();
//         // this._createBufferLevelChart();
//         // this._createHttpListChart();
//         // this._createRepresentationSwitchChart();

//         // this.json = this.initialize();;
//     }

//     async initialize() {
//         // Simulate an async operation, such as fetching age from a server
//         this.json = await this._convertToJson();
//         this._createBufferLevelChart();
//     }

//     async _loadSampleXml() {
//         return  new Promise((resolve, reject) => {
//             fetch('samples/sample.xml')
//                 .then(response => response.text())
//                 .then(data => {
//                     resolve(data)
//                 })
//                 .catch((error) => {
//                     reject(error);
//                 })
//         })
//     }
//     async _convertToJson() {
//         const xml = await this._loadSampleXml();
//         var json = new XMLParser().parseFromString(xml);
//         return json;
//     }

//     _populateReceptionReportTable() {
//         const attributes = this.json.elements[0].attributes;
//         const id = `reception-report-table`;
//         ['clientID', 'contentURI'].forEach((key) => {
//             this._addTableRow([key, attributes[key]], id)
//         })
//     }

//     _populateQoeReportTable() {
//         const attributes = this.json.elements[0].elements[0].attributes;
//         ['recordingSessionId', 'reportPeriod', 'reportTime'].forEach((key) => {
//             this._addTableRow([key, attributes[key]], `qoe-report-table`)
//         })
//     }

//     _populateMpdInformationTable() {
//         const elements = this.json.elements[0].elements[0].elements.filter((element) => {
//             return element.elements[0].name === 'MPDInformation';
//         })[0].elements;
//         elements.forEach((element) => {
//             const representationId = element.attributes.representationId;
//             element.elements.forEach((innerElement) => {
//                 if (innerElement.name === 'Mpdinfo') {
//                     const bandwidth = innerElement.attributes.bandwidth;
//                     const codecs = innerElement.attributes.codecs;
//                     const mimeType = innerElement.attributes.mimeType;
//                     this._addTableRow([representationId, bandwidth, codecs, mimeType], 'mpd-information-table');
//                 }
//             })
//         })
//     }

//     _getElementsByName(elements, name, targetElements) {
//         if (!elements || elements.length === 0) {
//             return
//         }
//         const newElements = elements.filter((element) => {
//             return element.name === name;
//         })

//         if (newElements.length > 0) {
//             return targetElements.concat(newElements)
//         }

//         if (elements.length === 0) {
//             return
//         }

//         elements.map((element) => {
//             this._getElementsByName(element.elements, name, targetElements);
//         })

//     }

//     _addTableRow(data, tableId) {
//         const tbody = document.querySelector(`#${tableId} tbody`);

//         const newRow = tbody.insertRow();

//         data.forEach((value) => {
//             const cell = newRow.insertCell();
//             cell.innerHTML = value;
//         })
//     }

//     async _createBufferLevelChart() {
//         const labels = [];
//         const dataValues = [];
//         this.json = await this._convertToJson();
//         const elements = this.json.children[0].children[0].children[0].children
//         elements.forEach((dataPoint) => {
//             labels.push(dataPoint.attributes.t);
//             dataValues.push(dataPoint.attributes.level);
//         })

//         return {
//             labels,
//             dataValues
//         }
//         const ctx = document.getElementById('buffer-level-chart');
//         const data = {
//             labels,
//             datasets: [
//                 {
//                     label: 'Buffer Level',
//                     data: dataValues
//                 }
//             ]
//         };
//         const config = {
//             type: 'line',
//             data: data,
//             options: {
//                 responsive: true,
//                 plugins: {
//                     legend: {
//                         position: 'top',
//                     },
//                     title: {
//                         display: false,
//                         text: 'Buffer Level'
//                     }
//                 },
//                 scales: {
//                     y: {
//                         title: {
//                             display: true,
//                             text: 'Duration in ms'
//                         }
//                     },
//                     x: {
//                         title: {
//                             display: true,
//                             text: 'Timestamp'
//                         }
//                     }
//                 }
//             },
//         };

//         new Chart(ctx, config);
//     }

//     _createHttpListChart() {
//         // const rawData = this.json.elements[0].elements[0].elements.filter((element) => {
//         //     return element.name === 'QoeMetric' && element.elements[0].name === 'HttpList';
//         // })[0].elements[0].elements;

//         const rawData = this.json.children[0].children[1].children[0].children

//         const datasets = {}

//         rawData.forEach((dataPoint) => {
//             if (!datasets[dataPoint.attributes.type]) {
//                 datasets[dataPoint.attributes.type] = {
//                     label: dataPoint.attributes.type,
//                     data: []
//                 }
//             }
//             const traces = dataPoint.children.filter((element) => {
//                 return element.name === 'Trace'
//             });
//             let bytes = 0;
//             let duration = 0;
//             traces.forEach((trace) => {
//                 bytes += parseInt(trace.attributes.b);
//                 duration += parseInt(trace.attributes.d);
//             })
//             datasets[dataPoint.attributes.type].data.push([duration, bytes]);
//         })
//         return datasets;
//         //
//         const ctx = document.getElementById('http-list-chart');
//         const data = {
//             datasets: Object.keys(datasets).map((key) => {
//                 return datasets[key]
//             })
//         }
//         const config = {
//             type: 'scatter',
//             data: data,
//             options: {
//                 responsive: true,
//                 plugins: {
//                     legend: {
//                         position: 'top',
//                     },
//                     title: {
//                         display: true,
//                         text: 'HTTP Requests: Duration and bytes per type'
//                     }
//                 },
//                 scales: {
//                     y: {
//                         title: {
//                             display: true,
//                             text: 'Transferred Bytes'
//                         }
//                     },
//                     x: {
//                         title: {
//                             display: true,
//                             text: 'Request Duration in ms'
//                         }
//                     }
//                 }
//             },
//         };
//         new Chart(ctx, config);
//     }

//     _createRepresentationSwitchChart() {
//         const rawData = this.json.children[0].children[3].children[0].children
//         const labels = [];
//         const dataSets = {};
//         rawData.forEach((dataPoint) => {
//             const mpdInfo = this._getMpdInfoByRepresentationId(dataPoint.attributes.to);
//             const mimeType = mpdInfo.attributes.mimeType;
//             if (!dataSets[mimeType]) {
//                 dataSets[mimeType] = {
//                     label: mimeType,
//                     data: []
//                 }
//             }
//             if (labels.indexOf(dataPoint.attributes.t) === -1) {
//                 labels.push(dataPoint.attributes.t);
//             }
//             dataSets[mimeType].data.push(mpdInfo.attributes.bandwidth);
//         })
//         return {
//             labels,
//             dataSets
//         }

//         const ctx = document.getElementById('representation-switch-chart');
//         const data = {
//             labels,
//             datasets: Object.keys(dataSets).map((key) => {
//                 return dataSets[key]
//             })
//         };
//         const config = {
//             type: 'line',
//             data: data,
//             options: {
//                 responsive: true,
//                 plugins: {
//                     legend: {
//                         position: 'top',
//                     }
//                 },
//                 scales: {
//                     y: {
//                         title: {
//                             display: true,
//                             text: 'Bandwidth in bit/s'
//                         }
//                     },
//                     x: {
//                         title: {
//                             display: true,
//                             text: 'Timestamp'
//                         }
//                     }
//                 }
//             },
//         };

//         new Chart(ctx, config);
//     }

//     _getMpdInfoByRepresentationId(representationId) {
//         const rawData = this.json.children[0].children[2].children
//         const target = rawData.filter((element) => {
//             return representationId === element.attributes.representationId;
//         });

//         if (!target || target.length === 0 || !target[0].children || target[0].children.length === 0) {
//             return 0
//         }

//         return target[0].children[0];
//     }

// }
// export default XmlReportLoader;
