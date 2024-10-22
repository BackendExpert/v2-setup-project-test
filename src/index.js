#!/usr/bin/env node

const inquirer = require('inquirer');
const { exec } = require('child_process');


async function YesFunc() {
    console.log("Create Clinet and Server in Samefolder")
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
                await YesFunc()
            
            case 'No':
                await NoFunc()
        }
    }
    catch(err){
        console.log(err)
    }
}

main()