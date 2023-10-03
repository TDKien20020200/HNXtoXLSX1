const axios = require('axios');

process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = 0;

function convertDay(day) {
    if (day < 0 || day > 31) {
        return '00';
    }
    if (day < 10) {
        return '0' + day;
    } else {
        return day;
    }
} 

function convertMonth(month) {
    if (month < 0 || month > 12) {
        return "00";
    }
    if (month < 10) {
        return '0' + month;
    } else {
        return month;
    }
}

async function postData(day, month, year) {
  try {
    const url = 'https://www.hnx.vn/ModuleReportBonds/Bond_YieldCurve/SearchAndNextPageDuLieuTT_Indicator'; // Replace with the URL you want to send the POST request to
    const rawRequestBody = 'p_keysearch=' + convertDay(day) 
    + '%2F' + convertMonth(month) + '%2F' + year + '%7C&pColOrder=col_a&pOrderType=ASC&pCurrentPage=1&pIsSearch=1';

    const headers = {
        'Accept': '*/*',
      'Accept-Encoding': 'gzip, deflate, br',
      'Accept-Language': 'en-US,en;q=0.9,vi-VN;q=0.8,vi;q=0.7',
      'Connection': 'keep-alive',
      'Content-Length': rawRequestBody.length,
      'Content-Type': 'application/x-www-form-urlencoded',
      'Cookie': 'language=vi-VN; 616a3745ee32423b8ef6bed543a12282=kxurdkckncj4piyiqlkz5ubm; __RequestVerificationToken_4TPT=h6ZIWclZa36BCQqV6kUZ-TZS0YWUMO6WuMKnAndtR9MAjXcqndZgFPX8btN_yKRejCyZEmiic3GfIxDfgqQVXr7nUIqMyG9ejAzF_AkfdFc1',
      'Host': 'www.hnx.vn',
      'Origin': 'https://www.hnx.vn',
      'Referer': 'https://www.hnx.vn/vi-vn/trai-phieu/duong-cong-loi-suat.html?site=in',
      'Sec-Fetch-Dest': 'empty',
      'Sec-Fetch-Mode': 'cors',
      'Sec-Fetch-Site': 'same-origin',
      'User-Agent': 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/115.0.0.0 Safari/537.36',
      'X-Requested-With': 'XMLHttpRequest',
      '__RequestVerificationToken': 'W5iPr4LGB913Chx72MilYOBB-LcsbSFdGqKqjDTTrMdX1kIdzHgVc4hXKdekiRcs-LYWlVSoKnes5kTXQ8NAZVJsPv2wCQmNIUYoLwDmNcY1',
      'sec-ch-ua': '"Not/A)Brand";v="99", "Google Chrome";v="115", "Chromium";v="115"',
      'sec-ch-ua-mobile': '?0',
      'sec-ch-ua-platform': '"Linux"'
    };

    const response = await axios.post(url, rawRequestBody, { headers });

    return response.data;
  } catch (error) {
    console.error('Error:', error.message);
  }
}

module.exports = {
    postData
};