const { rawDataFilter } = require('./rawDataFilter.js');
const { saveExcelFile } = require('./exportExcel.js');

async function promptUser(question) {
    const readline = require('readline').createInterface({
      input: process.stdin,
      output: process.stdout
    });
  
    return new Promise((resolve, reject) => {
      readline.question(question, (input) => {
        resolve(input);
        readline.close();
      });
    });
  }
  

// const startDate = new Date('2022-12-01'); 
// const endDate = new Date('2022-12-31');

async function workCrawlData() {
    const sd = await promptUser('Nhập ngày bắt đầu (năm-tháng-ngày): ');
    const ed = await promptUser('Nhập ngày kết thúc (năm-tháng-ngày): ');

    const startDate = new Date(sd); 
    const endDate = new Date(ed);

    const fullCrawlData = [];
    for (let date = startDate; date <= endDate; date.setDate(date.getDate() + 1)) {
        const jsonDataByDate = await rawDataFilter(date.getDate(), date.getMonth() + 1, date.getFullYear());
        fullCrawlData.push(jsonDataByDate)
    } 
    saveExcelFile(fullCrawlData);
}

workCrawlData();