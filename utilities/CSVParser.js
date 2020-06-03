class CSVParser {
    _data = "";
    _noOfRows=0;
    _noOfColoumns=0;
    _tableObject = {};
    constructor(data) {
        this._data = data;
        this._parseCSVData();
    }

    _parseCSVData() {
        let rowArray = this._data.split('\n');
        if (rowArray && rowArray.length>0) {
            this._setNoOfRows(rowArray.length);
            let columnArray = rowArray[0].split(',');
            this._setNoOfColumns(columnArray.length);
            this._setTableObject(rowArray);
        } else {
            throw new CSV_ERROR(`Rows should not be empty`);
        }
        
    }

    getNoOfRows() {
        return this._noOfRows;
    }

    getNoOfColumns() {
        return this._noOfColoumns;
    }

    getTableObject() {
        return this._tableObject;
    }

    _setNoOfRows(length) {
        this._noOfRows = length;
    }
    
    _setNoOfColumns(length) {
        this._noOfColoumns = length;
    }
    
    _setTableObject(rowArray) {
        this._tableObject = rowArray.map((eachRow, rowIndex) => {
            if (this._validateCSVByColumn(eachRow)) {
                var rowObject = {};
                eachRow.replace('\r', '').split(',').forEach((val, index) => {
                    rowObject['column_'+(index+1)] = val;
                })
                return rowObject;
            } else {
                throw new CSV_ERROR(`Column mismatch at row number ${rowIndex}`);
            }
        });
    }

    _validateCSVByColumn(columnArray) {
        return this._noOfColoumns === columnArray.split(',').length;
    }

    
}


// Credits : https://rollbar.com/guides/javascript-throwing-exceptions/

function CSV_ERROR(msg) {
    const error = new Error(`INVALID CSV FORMAT: ${msg}`);
    return error
}
CSV_ERROR.prototype = Object.create(Error.prototype);

module.exports = CSVParser;