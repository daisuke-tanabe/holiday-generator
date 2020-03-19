const fs = require('fs');

const csv = fs.readFileSync('./syukujitsu.csv', { encoding: 'utf-8' });

function csvToJson(csv) {
  const rows = csv.split('\r\n');

  return rows.reduce((result, row) => {
    const [ date, name ] = row.split(',');
    const [ year, month, day ] = date.match(/\d+/g);
    const key = `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`;
    result[key] = name;
    return result;
  }, {});
}

const json = csvToJson(csv);

fs.writeFileSync('./holiday.json', JSON.stringify(json), { encoding: 'utf-8' });