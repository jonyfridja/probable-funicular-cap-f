import { parse } from 'json2csv';

class _CSVService {
    jsonToCSV(data: any, fields: string[]) {
        const opts = { fields };
        try {
            return parse(data, opts);
        } catch (err) {
            console.error(err);
        }
    }

    CSVToFile(csv: string, fileName = 'compressed.csv'): File {
        const blob = new Blob([csv], { type: 'text/csv' });
        return new File([blob], fileName, { lastModified: Date.now(), type: blob.type })
    }
}

export const CSVService = new _CSVService();
