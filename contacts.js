import { promises as fs } from "fs";
import { nanoid } from "nanoid";
import path from "path";

const contactsPath = path.join("db", "contacts.json");

export async function listContacts() {
  // Возвращает массив контактов.
  try {
    return JSON.parse(await fs.readFile(contactsPath));
  } catch (err) {
    console.log(err);
  }
}

export async function getContactById(contactId) {
  // Возвращает объект контакта с таким id. Возвращает null, если объект с таким id не найден.
  try {
    const contacts = await listContacts();
    const contact = contacts.filter((contact) => contact.id === contactId);
    if (contact.length > 0) return contact;
    return null;
  } catch (err) {
    console.log(err);
  }
}

export async function addContact(name, email, phone) {
  // Возвращает объект добавленного контакта.
  try {
    const id = nanoid();
    const newContact = { id, name, email, phone };
    const contacts = await listContacts();
    contacts.push(newContact);
    await fs.writeFile(contactsPath, JSON.stringify(contacts));
    return getContactById(id);
  } catch (error) {
    console.log(error);
  }
}

export async function removeContact(contactId) {
  // Возвращает объект удаленного контакта. Возвращает null, если объект с таким id не найден.
  try {
    const contacts = await listContacts();
    const contact = getContactById(contactId);
    if (contact) {
      const filteredContacts = contacts.filter(
        (contact) => contact.id !== contactId
      );
      await fs.writeFile(contactsPath, JSON.stringify(filteredContacts));
    }
    return contact;
  } catch (error) {
    console.log(error);
  }
}
