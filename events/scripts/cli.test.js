const fs = require("fs");
const path = require('path');
const prompt = require("prompt-sync")();

function isNodemonProcess() {
    return process.env.hasOwnProperty('NODEMON');
}

function isNodeProcess() {
    if (process.argv[0].endsWith("node") || process.argv[0].endsWith("node.exe")) {
        return true;
    } else {
        return false;
    }
}

function listFilesAndDirectories(directory) {
    const items = fs.readdirSync(directory);

    items.forEach((item) => {
        const itemPath = path.join(directory, item);
        const stats = fs.statSync(itemPath);

        if (stats.isDirectory()) {
            if (item !== 'node_modules' || '.git') {
                listFilesAndDirectories(itemPath);
            }
        } else {
            console.log(itemPath);
        }
    });
}

function createDirectory(directoryName) {
    const directoryPath = path.join(process.cwd(), directoryName);
    
    if (!fs.existsSync(directoryPath)) {
        fs.mkdirSync(directoryPath);
        console.log(`Diretório '${directoryName}' criado com sucesso.`);
    } else {
        console.log(`O diretório '${directoryName}' já existe.`);
    }
}

function deleteFileOrDirectory(itemName) {
    const itemPath = path.join(process.cwd(), itemName);
    
    if (fs.existsSync(itemPath)) {
        const stats = fs.statSync(itemPath);
        
        if (stats.isDirectory()) {
            fs.rmdirSync(itemPath, { recursive: true });
            console.log(`Diretório '${itemName}' e seu conteúdo foram excluídos.`);
        } else {
            fs.unlinkSync(itemPath);
            console.log(`Arquivo '${itemName}' foi excluído.`);
        }
    } else {
        console.log(`O item '${itemName}' não existe.`);
    }
}

function changeDirectory(directoryName) {
    const newDirectory = path.join(process.cwd(), directoryName);
    
    if (fs.existsSync(newDirectory)) {
        process.chdir(newDirectory);
        console.log(`Diretório alterado para '${newDirectory}'.`);
    } else {
        console.log(`O diretório '${directoryName}' não existe.`);
    }
}

function showHelp() {
    console.log(`
Comandos disponíveis:
- ls: Listar arquivos e diretórios no diretório atual.
- mkdir <nome>: Criar um novo diretório com o nome especificado.
- rmdir <nome>: Excluir um diretório (e seu conteúdo) pelo nome.
- cd <nome>: Alterar o diretório atual para o especificado.
- rm <nome>: Excluir um arquivo ou diretório pelo nome.
- help: Exibir esta mensagem de ajuda.
- exit: Sair do programa.
`);
}

function main() {
    // Verifica se o processo é do nodemon e exibe uma mensagem apropriada
    if (isNodemonProcess() || isNodeProcess() == false) {
        console.log("Este é um processo invalido. Os comandos estão desativados.");
        return;
    } else {
        while (true) {
            const input = prompt("> ");
            const [command, ...args] = input.split(" ");

            if (command === "ls") {
                listFilesAndDirectories(process.cwd());
            } else if (command === "mkdir" && args.length === 1) {
                createDirectory(args[0]);
            } else if (command === "rmdir" && args.length === 1) {
                deleteFileOrDirectory(args[0]);
            } else if (command === "cd" && args.length === 1) {
                changeDirectory(args[0]);
            } else if (command === "rm" && args.length === 1) {
                deleteFileOrDirectory(args[0]);
            } else if (command === "help") {
                showHelp();
            } else if (command === "exit") {
                break;
            } else {
                console.log("Comando não reconhecido. Digite 'help' para ver os comandos disponíveis.");
            }
        }
    }
}

main();