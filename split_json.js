/* eslint-disable no-console */
const fs = require('fs');
const path = require('path');

// create a function named LOG to console log with a timestamp
const LOG = (message, reuse = false) => {
  if (reuse) {
    process.stdout.clearLine(0);
    process.stdout.cursorTo(0);
  } else {
    process.stdout.write('\n');
  }
  // just the time portion of the ISO string
  process.stdout.write(new Date().toISOString().slice(11, 19));
  process.stdout.write(' ' + message + (reuse ? '' : '\n'));
};

// name of original JSON file to read in
const jsonFile = './large_test_data.json';

// name of directory to write output files to
const outputDir = 'output';

// Create the "output" directory if it doesn't exist
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir);
}

// Read the entire JSON file into memory
LOG(`Reading ${jsonFile}...`);
const jsonData = JSON.parse(fs.readFileSync(jsonFile, 'utf8'));

// put the items data into a separate variable
const itemsData = jsonData.Data.PullData.Masters.Items;

// remove the items from the original object
delete jsonData.Data.PullData.Masters.Items;

// write out the original object to `output_000.json`
const jsonString = JSON.stringify(jsonData);
let outputFile = path.join(outputDir, `output_000.json`);

LOG(`Writing ${outputFile}...`);
fs.writeFileSync(outputFile, jsonString);

// Set the maximum size for each output file (20 MB)
const maxFileSize = 20 * 1024 * 1024;

// an optimization: number of items to add before checking file size
const NUM_ITEMS_TO_TRY = 10000;

// now loop over itemsData and write to file in chunks
let currentSegment = [];
let outputString = '';
let filenum = 1;
let filenumString = '';
let bufSize = 0;

for (const item of itemsData) {
  currentSegment.push(item);
  if (currentSegment.length % NUM_ITEMS_TO_TRY === 0) {
    outputString = JSON.stringify(currentSegment);
    bufSize = Buffer.from(outputString).length;

    LOG(`  processing item #${currentSegment.length} : ${bufSize} bytes`, true);

    if (bufSize >= maxFileSize) {
      // write out the current segment to a file
      // pad the filenum with leading zeroes
      filenumString = filenum.toString().padStart(3, '0');
      outputFile = path.join(outputDir, `output_${filenumString}.json`);
      LOG(`Writing ${outputFile}...`);
      fs.writeFileSync(outputFile, outputString);
      filenum++;

      currentSegment = [];
      outputString = '';
    }
  }
}

filenumString = filenum.toString().padStart(3, '0');
outputFile = path.join(outputDir, `output_${filenumString}.json`);
fs.writeFileSync(outputFile, outputString);

LOG('Done.');
