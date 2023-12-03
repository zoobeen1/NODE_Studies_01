import {
  listContacts,
  getContactById,
  removeContact,
  addContact,
} from "./contacts.js";

import { Command } from "commander";
const program = new Command();
program
  .option("-a, --action <type>", "choose action")
  .option("-i, --id <type>", "user id")
  .option("-n, --name <type>", "user name")
  .option("-e, --email <type>", "user email")
  .option("-p, --phone <type>", "user phone");

program.parse(process.argv);

const argv = program.opts();

async function invokeAction({ action, id, name, email, phone }) {
  switch (action) {
    case "list":
      try {
        // Получаем и выводим весь список контактов в виде таблицы (console.table)
        const contactsList = await listContacts();
        console.table(contactsList);
      } catch (error) {
        console.log(error);
      }
      break;

    case "get":
      try {
        const contact = await getContactById(id);
        console.table(contact);
      } catch (error) {
        console.log(error);
      }

      break;

    case "add":
      try {
        const newContact = await addContact(name, email, phone);
        console.table(newContact);
      } catch (error) {
        console.log(error);
      }

      break;

    case "remove":
      try {
        const removedContact = await removeContact(id);
        console.table(removedContact);
      } catch (error) {
        console.log(error);
      }

      break;

    default:
      console.warn("\x1B[31m Unknown action type!");
  }
}

invokeAction(argv);
