#!/usr/bin/env node

const inquirer = require('inquirer');
const { exec } = require('child_process');
const path = require('path')
const currentDir = process.cwd();
const fs = require('fs')

async function CreateClientFolderandMoveFiles() {
    try{
        if (!fs.existsSync(clientDir)) {
            fs.mkdirSync(clientDir);
        }

        const files = fs.readdirSync(currentDir);

        files.forEach(file => {
            if (file !== 'client') {
              const oldPath = path.join(currentDir, file);
              const newPath = path.join(clientDir, file);
              
              fs.renameSync(oldPath, newPath);
            }
        });

        console.log('All files moved to "client" folder.');
        process.chdir(clientDir); 
    }
    catch(err){
        console.log(err)
    }
}

async function CreateReactViteProject () {
    try{


        exec('npm create vite@latest client -- --template react cd client', (error, stdout, stderr) => {
            if (error) {
                console.error(`Error executing command: ${error.message}`);
                return;
            }
        
            if (stderr) {
                console.error(`Error: ${stderr}`);
                return;
            }
        
            console.log(`Output: ${stdout}`);
        })

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
            fs.rm(nodeModulesPath, { recursive: true, force: true }, (err) => {
                if (err) {
                    console.error(`Error deleting folder: ${err.message}`);
                } else {
                    console.log(`Folder deleted: ${nodeModulesPath}`);
                }
            });
        }
    }
    catch(err){
        console.log(err)
    }
}

async function MovetoClientAndInstallNPMs () {
    try{

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
                await DeleteUnnecessaryFilesandFolders()
                await MovetoClientAndInstallNPMs()
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