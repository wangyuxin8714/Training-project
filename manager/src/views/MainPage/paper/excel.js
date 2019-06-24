import React, {useState} from 'react';
import { Table, Upload, Button, Icon  } from 'antd';
import XLSX from 'xlsx';

const Excel=props=>{


  let [columns, setColumns] = useState([]);
  let [dataSource, setDataSource] = useState([]);

  function uploadExcel(info){
    console.log('info...', info);
    const reader = new FileReader();
    reader.onload = (evt) => {
      const bstr = evt.target.result;
      // 读出excel文件
      const wb = XLSX.read(bstr, {type:'binary'});
      // 读出第一张excel表
      const wsname = wb.SheetNames[0];
      const ws = wb.Sheets[wsname];
      // 把第一张表的数据转化为json对象
      const data = XLSX.utils.sheet_to_json(ws, {header:1});
      console.log('webbooks...', wb, data);
      // 处理表头数据
      setColumns(data[0].map((item, index)=>{
        return {
          title: item,
          dataIndex: index,
          key: index
        }
      }))

      // 处理表格数据
      setDataSource(data.slice(1).map((item, index)=>{
        let obj = {key: index};
        item.forEach((val, key)=>{
          obj[key] = val;
        })
        return obj;
      }))
    };
    reader.readAsBinaryString(info.file.originFileObj);
  }

  // 导出excel
  function exportExcel(){
    if (!dataSource.length){
      return;
    }

    console.log('dataSourece', dataSource, columns);
    let header = {};
    [...columns].forEach((item,index)=>{
      header[index] = item.title;
    })
    // 1.创建一个websheet
    let ws = XLSX.utils.json_to_sheet([header].concat(dataSource),
      {header: Object.keys(dataSource), skipHeader:true}
    );
    // 2.创建一个webbook
    var wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws);
    // 3.写到本地
    XLSX.writeFile(wb, 'out.xlsx');
  }

  return <div>
    {/* 上传excel */}
    <Upload onChange={info=>uploadExcel(info)} accept=".xlsx,.xls,.csv">
      <Button>
        <Icon type="upload" /> Click to Upload
      </Button>
    </Upload>
    {/* 导出excel */}
    <Button onClick={()=>exportExcel()}>导出excel</Button>
    {/* 列表 */}
    <Table dataSource={dataSource} columns={columns}/>


  </div>;


    


}

export default Excel