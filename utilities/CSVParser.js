
class CSVParser {
    _data="";
    _noOfRows=0;
    _noOfColoumns=0;
    constructor(data) {
        this._data = data;
    }

    _parseCSVData() {
        let rowArray = this._data.split('\n');
        
    }

    
}

module.exports = CSVParser;