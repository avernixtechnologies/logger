const fs = require('fs');
const path = require('path');

const directoryPath = path.join(__dirname, 'build/cjs');

// Function to recursively rename files
function renameFilesInDirectory(directory) {
    fs.readdir(directory, (err, files) => {
        if (err) {
            return console.log('Unable to scan directory: ' + err);
        }
        files.forEach((file) => {
            const filePath = path.join(directory, file);
            fs.stat(filePath, (error, stat) => {
                if (stat.isDirectory()) {
                    renameFilesInDirectory(filePath); // Recursive call for directories
                } else if (path.extname(file) === '.js') {
                    const newFilePath = filePath.replace('.js', '.cjs');
                    fs.rename(filePath, newFilePath, function (err) {
                        if (err) {
                            console.log('ERROR: ' + err);
                        } else {
                            console.log(`Renamed: ${filePath} to ${newFilePath}`);
                        }
                    });
                }
            });
        });
    });
}

renameFilesInDirectory(directoryPath);
