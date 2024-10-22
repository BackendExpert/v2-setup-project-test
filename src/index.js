#!/usr/bin/env node

const inquirer = require('inquirer');
const { exec } = require('child_process');

const currentDir = process.cwd();
const clientDir = path.join(currentDir, 'client');

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

async function NoFunc() {
    console.log("Create Clinet and Server in diffarace folders")
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
                await CreateClientFolderandMoveFiles()
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