// create a file and open it for writing
const fs = require('fs');
const outputFile = './large_test_data.json';
const file = fs.createWriteStream(outputFile);

// write the following JSON structure to the file:

file.write('{\n');
file.write('  "Data": {\n');
file.write('    "GUID": "",\n');
file.write('    "PullData": {\n');
file.write('      "Masters": {\n');
file.write('        "Items": [\n');
for (let i = 0; i < 1000000; i++) {
  // how to output an interger with leading zeros
  const theId = i.toString().padStart(8, '0');
  file.write(
    '          { "Id": "id-' +
      theId +
      '", "ItemGroup": "BK ", "ISBN13": "9780471203759", "ISBN10": "0471203750", "Barcode": null, "Uacode": "BK 0018262          " }'
  );
  file.write(i < 999999 ? ',' : '' + '\n');
}
file.write('        ],\n');
file.write('        "PaymentMethods": [\n');
file.write(
  '          {"Id": 1, "Description": "Cash", "IsCash": true, "CreatedBy": 0, "CreataedOn": "0001-01-01T00:00:00.000", "LastModifiedBy": null, "LastModifiedOn": null}\n'
);
file.write('        ],\n');
file.write('        "Fairs": [],\n');
file.write('        "ItemSets": []\n');
file.write('      },\n');
file.write('      "Transactions": {\n');
file.write('        "BillReturnItems": [],\n');
file.write('        "BillReturns": []\n');
file.write('      }\n');
file.write('    },\n');
file.write('    "ItemGroups": []\n');
file.write('  }\n');
file.write('}\n');

// close the stream
file.end();

console.log(`Wrote ${outputFile}`);