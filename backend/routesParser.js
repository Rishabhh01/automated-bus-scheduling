const fs = require('fs');
const path = require('path');
const csv = require('csv-parser');

const parseRoutes = () => {
    return new Promise((resolve, reject) => {
        const routes = [];
        const filePath = path.join(__dirname, 'data', 'routes.txt'); // File path

        fs.createReadStream(filePath)
            .pipe(csv())
            .on('data', (row) => {
                routes.push({
                    route_id: row.route_id,
                    route_long_name: row.route_long_name,
                });
            })
            .on('end', () => {
                resolve(routes);
            })
            .on('error', (error) => {
                reject(error);
            });
    });
};

module.exports = parseRoutes;
