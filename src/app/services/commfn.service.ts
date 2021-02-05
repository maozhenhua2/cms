import {Injectable} from '@angular/core';

import * as echarts from 'echarts';
// import * as langEN from 'echarts/lib/i18n/langEN';
import * as XLSX from 'xlsx';

@Injectable({
  providedIn: 'root'
})
export class CommfnService {

  constructor() {
  }

  static setToolBox(dom, id, option) {
    let _this = this;
    option.toolbox = {
      show: true,
      right: 20,
      feature: {
        myTool1: {
          show: true,
          title: 'Save image',
          icon: 'image://assets/img/file_img.svg',
          onclick: function(values) {
            console.log(values);
            _this.downloadImg(dom, values.option.series[0].name || id);
          }
        },
        myTool2: {
          show: true,
          title: 'Save csv',
          icon: 'image://assets/img/file_csv.svg',
          onclick: function(values) {
            _this.downloadExcel(values.option);
          }
        },
      }
    };
  }

  // convert base64
  static getFullCanvasDataURL(dom) {
    //将第一个画布作为基准。
    let baseCanvas: any = dom.querySelector('canvas');
    if (!baseCanvas) {
      return false;
    }
    //获取base64位的url
    return baseCanvas.toDataURL();
  }

  static downloadImg(dom, name) {
    let url = this.getFullCanvasDataURL(dom);
    let link = document.createElement('a');
    link.href = url;
    link.download = name + '.png';
    link.click();
  };

  static saveSvg(dom, name) {
    const content = dom.querySelector('svg').outerHTML;
    const blob = new Blob([content], {
      type: 'xml/svg'
    });
    let link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `${name}.svg`;
    link.click();
  }

  static downloadExcel(option, type: any = 'csv', fn = null, dl = false) {
    let header = [];
    if (option.xAxis) {
      header = option.xAxis[0].data;
    }
    // let header = option.xAxis[0].data;
    // header = header ? header : [];
    let series = [];

    option.series.map((serie, index) => {
      let obj = {};
      if (header.length) {
        serie.data.map((v, i) => {
          obj[header[i]] = (serie.data[i].value ? serie.data[i].value : serie.data[i]);
        });
      } else {
        serie.data.map((v, i) => {
          header[i] = serie.data[i].name;
          obj[header[i]] = serie.data[i].value;
        });

      }
      series.push(obj);

    });

    let ws1 = XLSX.utils.json_to_sheet(series, {
      header: header,
      skipHeader: false
    });
    let wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws1, 'Sheet1');
    return dl ?
      XLSX.write(wb, {
        bookType: type,
        bookSST: true,
        type: 'base64'
      }) :
      XLSX.writeFile(wb, fn || (option.series[0].name + '.' + (type || 'xlsx')));
  }

  // echarts, id, option, cb = function() {}
  static renderEchart({dom, id, option, cb = (chart) => null}) {
    let myChart = echarts.init(dom/*, null, {renderer: 'svg'}*/);
    this.setToolBox(dom, id, option);
    if (option.visualMap) {
      option.visualMap.top = 40;
    }
    myChart.setOption(option);
    myChart.resize();
    window.addEventListener('resize', function() {
      cb(myChart);
      myChart.resize();
    });
    return myChart;
  }
}
