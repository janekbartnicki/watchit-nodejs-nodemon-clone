#!/usr/bin/env node

const chokidar = require('chokidar');
const program = require('caporal');
const fs = require('fs');
const {spawn} = require('child_process');
const {inherits} = require('util');

program
    .version('0.0.1')
    .argument('[filename]', 'Name of the file to watch')
    .action(async ({filename}) => {
        const name = filename || 'index.js';
        try{
            await fs.promises.access(name);
        } catch {
            throw new Error(`Could not find the file ${name}`)
        };

        let proc;
        const start = () => {
            if(proc) proc.kill();
            console.log('\x1b[36m%s\x1b[0m', 'Watching for changes...');
            proc = spawn('node', [name], {stdio: 'inherit'});
        };
        
        chokidar.watch('.', {ignoreInitial: true})
            .on('add', (path, {atime}) => {
                console.log('\x1b[32m', `ADDED ${path} [${atime.getHours()}:${atime.getMinutes()}.${atime.getSeconds()}]`);
                start();

            })
            .on('change', (path, stats) => {
                console.log('\x1b[33m', `CHANGED ${path} [Current size: ${stats.size} chars]`)
                start();
            })
            .on('unlink', (path) => console.log('\x1b[31m', `FILE REMOVED [${path}]`));
    });

program.parse(process.argv);