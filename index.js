#!/usr/bin/env node

const chokidar = require('chokidar');

chokidar.watch('.', {ignoreInitial: true})
    .on('add', (path, stats) => {
        const {atime} = stats;
        console.log(`ADDED ${path} [${atime.getHours()}:${atime.getMinutes()}.${atime.getSeconds()}]`)
    })
    .on('change', (path, stats) => {
        console.log(`CHANGED ${path} [Current size: ${stats.size} chars]`)
    })
    .on('unlink', () => console.log('FILE REMOVED'))