const Logger = require('./utilities/Logger');

Logger.info(process.argv);

var fileName = process.argv[2]? process.argv[2].split('=')[1]: '';

if (fileName.length > 0) {
    //processFile();
} else {
    Logger.error(`You have not included CSV file name with the run command.
     please include it like given below. \n
     ndoe .\station.js --file=[Your file name]`);
}


