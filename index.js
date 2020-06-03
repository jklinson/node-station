const Logger = require('./utilities/Logger');
const FileReader = require('./utilities/FileReader');
const CSVParser = require('./utilities/CSVParser');

Logger.info(process.argv);

var fileName = process.argv[2]? process.argv[2].split('=')[1]: '';

if (fileName.length > 0) {
    try {
        FileReader.readFile(fileName).then((data)=> {
            let parser = new CSVParser(data);
            let stationDetails = parser.getTableObject();
            Logger.info(stationDetails);
            let routes = {source: {}, destination: {}};
            stationDetails.forEach((item, index) => {
                let sourceStation = {};
                if (routes.source[item.column_1]) {
                    sourceStation = routes.source[item.column_1];                    
                }
                sourceStation[item.column_2] = item.column_3;
                routes.source[item.column_1] = sourceStation;

                let destStation = [];
                if (routes.destination[item.column_2]) {
                    destStation = routes.destination[item.column_2];                    
                }
                destStation.push(item.column_1);
                routes.destination[item.column_2] = destStation;

            });
            Logger.info(routes);
        })
        .catch((err) => {
            Logger.error(err);
        });
    } catch (error) {
        Logger.error(error);
    }
} else {
    Logger.error(`You have not included CSV file name with the run command.
     please include it like given below. \n
     node .\index.js --file=[Your file name]`);
}


