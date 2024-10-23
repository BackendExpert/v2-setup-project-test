#!/usr/bin/env node

const inquirer = require('inquirer');
const { exec } = require('child_process');
const path = require('path')
const currentDir = process.cwd();
const fs = require('fs');
const { exit } = require('process');

async function execPromise(command) {
    return new Promise((resolve, reject) => {
        exec(command, (error, stdout, stderr) => {
            if (error) {
                reject(`Error executing command: ${error.message}`);
            } else if (stderr) {
                reject(`Error: ${stderr}`);
            } else {
                resolve(stdout);
            }
        });
    });
}


async function CreateReactViteProject () {
    try{
        const output = await execPromise('npm create vite@latest client -- --template react');
        console.log(`Vite project created successfully: ${output}`);

        await DeleteUnnecessaryFilesandFolders();

    }

    catch(err){
        console.log(err)
    }
}

async function DeleteUnnecessaryFilesandFolders (){
    try{
        const packageJsonPath = path.join(currentDir, 'package.json');
        const packageLockJsonPath = path.join(currentDir, 'package-lock.json');
        const nodeModulesPath = path.join(currentDir, 'node_modules');

        if (fs.existsSync(packageJsonPath)) {
            fs.unlinkSync(packageJsonPath)
        }
        if (fs.existsSync(packageLockJsonPath)) {
            fs.unlinkSync(packageLockJsonPath)
        }
        if (fs.existsSync(nodeModulesPath)) {
            fs.rmSync(nodeModulesPath, { recursive: true, force: true });
            console.log(`Folder deleted: ${nodeModulesPath}`);    
            await MovetoClientAndInstallNPMs()
            await InstallTailwindCSS()
            console.log('Curent WD ' + process.cwd())        
        }
        else{
            await MovetoClientAndInstallNPMs()
            await InstallTailwindCSS()
            console.log('Curent WD ' + process.cwd())
        }
    }
    catch(err){
        console.log(err)
    }
}

async function MovetoClientAndInstallNPMs() {
    try {
        const clientDir = path.join(currentDir, 'client');

        if (fs.existsSync(clientDir)) {
            process.chdir(clientDir); 
            console.log(`Changed working directory to: ${process.cwd()}`);

            const output = await execPromise('npm install');
            console.log(`NPM packages installed in client directory: ${output}`);
        } else {
            console.error(`Client directory not found: ${clientDir}`);
        }
    } catch (err) {
        console.error(`Error during changing directory or installing NPM packages: ${err.message}`);
    }
}

async function InstallTailwindCSS () {
    try{
        const tailwindInstall = await execPromise('npm install -D tailwindcss postcss autoprefixer');
        const tailwindcssInit = await execPromise('npx tailwindcss init -p');
        console.log(`: ${output}`);
    }
    catch(err){
        console.log(err)
    }
}

async function main() {
    try{
        const answers = await inquirer.prompt([
            {
              type: 'list',
              name: 'createClientServer',
              message: 'Create Client and Server in Same Folder(Repo) :',
              choices: ['Yes', 'No'],
            },
        ]);   

        const { createClientServer } = answers;
        
        switch(createClientServer){
            case 'Yes':
                await CreateReactViteProject()
                exit;

                break
            
            case 'No':
                await NoFunc()
                break

            default:
                console.log('Invalid selection.');
        }
    }
    catch(err){
        console.log(err)
    }
}

main()