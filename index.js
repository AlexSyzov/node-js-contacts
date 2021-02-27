const { program } = require("commander");
const contacts = require("./contacts");

program
  .option("-a --action <type>", "input action type")
  .option("-n --name <type>", "input contact name")
  .option("-e --email <type>", "input contact email")
  .option("-p --phone <type>", "input contact phone")
  .option("-i --id <type>", "input contact ID");

program.parse(process.argv);

const options = program.opts();

function invokeAction({ action, id, name, email, phone }) {
  switch (action) {
    case "list":
      contacts.listContacts();
      break;

    case "get":
      contacts.getContactById(id);
      break;

    case "add":
      contacts.addContact(name, email, phone);
      break;

    case "remove":
      contacts.removeContact(id);
      break;

    default:
      console.warn("\x1B[31m Unknown action type!");
  }
}

invokeAction(options);
