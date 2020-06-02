const Logger = require('./utilities/Logger');
const FileReader = require('./utilities/FileReader');

Logger.info(process.argv);

var fileName = process.argv[2]? process.argv[2].split('=')[1]: '';

if (fileName.length > 0) {
    FileReader.readFile(fileName).then((data)=> {
        Logger.info(data);
    })
    .catch((err) => {
        Logger.error(err);
    });
} else {
    Logger.error(`You have not included CSV file name with the run command.
     please include it like given below. \n
     ndoe .\index.js --file=[Your file name]`);
}


