const fs = require('fs');
const XLSX = require('xlsx');
const path = require('path');

const options = {
    hour: '2-digit',
    minute: '2-digit',
    day: '2-digit',
    month: '2-digit',
    year: 'numeric'
};

async function saveExcelFile(jsonData) {
    let dataSource = [
        "Date",
        "3 tháng",
        "6 tháng",
        "9 tháng",
        "1 năm",
        "2 năm",
        "3 năm",
        "5 năm",
        "7 năm",
        "10 năm",
        "15 năm",
        "20 năm",
    ];    

    const data = jsonData;
    const excelTable = [];

    excelTable.push(dataSource);
    
    for (let i = 0; i < data.length; i++) {
        const rowExcel = [];
        
        rowExcel.push(data[i].date);
        Object.keys(data[i].data).forEach(subKey => {
            const value = data[i].data[subKey];
            
            rowExcel.push(value);
        });
        if (rowExcel[1] === '' || rowExcel[1] == null) {
            continue;
        }
        excelTable.push(rowExcel);
    }

    const wb = XLSX.utils.book_new();

    const wsName = 'Sheet1';
    const ws = XLSX.utils.aoa_to_sheet(excelTable);

    XLSX.utils.book_append_sheet(wb, ws, wsName);

    const excelBuffer = XLSX.write(wb, { type: 'buffer', bookType: 'xlsx' });

    // lưu tên file là thời gian thực hiện crawl
    const timestamp = new Date().getTime();
    const formattedTimestamp = new Date(timestamp).toLocaleString('en-US', options).replace(/[/:]/g, '-');
    let fileName = 'hnx_crawled_data_' + formattedTimestamp + '.xlsx';
    const filePath = path.join('./crawled', fileName);

    fs.writeFileSync(filePath, excelBuffer);
}

module.exports = {
    saveExcelFile
};