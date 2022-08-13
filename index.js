#!/usr/bin/env node

const chokidar = require('chokidar');
const program = require('caporal');

// console.log('Watching for changes...');

program
    .version('0.0.1')
    .argument('[filename]', 'Name of the file to watch')
    .action((args) => {
        console.log(args)
    });

program.parse(process.argv);

// chokidar.watch('.', {ignoreInitial: true})
//     .on('add', (path, stats) => {
//         const {atime} = stats;
//         console.log(`ADDED ${path} [${atime.getHours()}:${atime.getMinutes()}.${atime.getSeconds()}]`)
//     })
//     .on('change', (path, stats) => {
//         console.log(`CHANGED ${path} [Current size: ${stats.size} chars]`)
//     })
//     .on('unlink', () => console.log('FILE REMOVED'))