#!/usr/bin/env node

const chokidar = require('chokidar');
const program = require('caporal');
const fs = require('fs');
const {spawn} = require('child_process');
const { inherits } = require('util');

console.log('\x1b[36m%s\x1b[0m', 'Watching for changes...');

program
    .version('0.0.1')
    .argument('[filename]', 'Name of the file to watch')
    .action(async ({filename}) => {
        try{
            await fs.promises.access(filename)
        } catch {
            throw new Error(`Could not find the file ${filename}`)
        };

        spawn('node', [filename], {stdio: 'inherit'});
        chokidar.watch(filename || process.cwd(), {ignoreInitial: true})
            .on('add', (path, {atime}) => {
                console.log('\x1b[32m', `ADDED ${path} [${atime.getHours()}:${atime.getMinutes()}.${atime.getSeconds()}]`);
                spawn('node', [filename], {stdio: 'inherit'});

            })
            .on('change', (path, stats) => {
                console.log('\x1b[33m', `CHANGED ${path} [Current size: ${stats.size} chars]`)
                spawn('node', [filename], {stdio: 'inherit'});
            })
            .on('unlink', (path) => console.log('\x1b[31m', `FILE REMOVED [${path}]`));
    });

program.parse(process.argv);