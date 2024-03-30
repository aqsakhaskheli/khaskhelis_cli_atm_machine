#! /usr/bin/env node
import inquirer from "inquirer";
import chalk from "chalk";
// Initialize user balance and pin code.
let myBalance = 10000;
let myPin = 2503;
// Printing welcome message
console.log(chalk.blue("\n \tWelcome to Khaskheli's - ATM Machine\n"));
let pinAnswer = await inquirer.prompt([
    {
        name: "pin",
        type: "number",
        message: chalk.yellow("Enter your pin code: ")
    }
]);
if (pinAnswer.pin === myPin) {
    console.log(chalk.green("\nPin is Correct, Login Successfully!\n"));
    // console.log(`Your Current Account Balances is ${myBalance} `)
    let operationAns = await inquirer.prompt([
        {
            name: "operation",
            type: "list",
            message: chalk.gray("Select an Operation"),
            choices: ["Withdraw Amount", "Check Balance", "Exit"]
        }
    ]);
    if (operationAns.operation === "Withdraw Amount") {
        let withdrawAns = await inquirer.prompt([
            {
                name: "withdrawMethod",
                type: "list",
                message: chalk.gray("Select a withdrawal method"),
                choices: ["Fast Cash", "Enter Amount"]
            }
        ]);
        if (withdrawAns.withdrawMethod === "Fast Cash") {
            let fashCashAns = await inquirer.prompt([
                {
                    name: "FashCash",
                    type: "list",
                    message: chalk.gray("Select Amount:"),
                    choices: [1000, 2000, 5000, 10000, 15000, 20000, 50000]
                }
            ]);
            if (fashCashAns.FashCash > myBalance) {
                console.log(chalk.red("Insufficient Balance to Withdraw"));
            }
            else {
                myBalance -= fashCashAns.FashCash;
                console.log(chalk.green(`${fashCashAns.FashCash} Withdraw Successfully...!!!`));
                console.log(chalk.yellow(`Your Remaining Balance is : ${myBalance}`));
            }
        }
        else if (withdrawAns.withdrawMethod === "Enter Amount") {
            let amountAns = await inquirer.prompt([
                {
                    name: "amount",
                    type: "number",
                    message: chalk.gray("Enter your amount to withdraw:")
                }
            ]);
            if (amountAns.amount > myBalance) {
                console.log(chalk.red("Insufficient Balance to Withdraw"));
            }
            else {
                myBalance -= amountAns.amount;
                console.log(chalk.green(`${amountAns.amount} Withdraw Successfully`));
                console.log(chalk.yellow(`Your Remaining Balance: ${myBalance}`));
            }
        }
    }
    else if (operationAns.operation === "Check Balance") {
        console.log(chalk.yellow(`Your Account Balance is: ${myBalance}`));
    }
}
else {
    console.log(chalk.red("Oooooppppssss...!!! Pin is Incorrect, Please Try Again"));
}
