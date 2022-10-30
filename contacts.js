const path = require('path');
const fs = require('fs').promises;
const { v4 } = require('uuid');

const contactsPath = path.join(__dirname, './db/contacts.json');

async function listContacts() {
  try {
    const data = await fs.readFile(contactsPath);
    const contacts = JSON.parse(data);
    return contacts;
  } catch (error) {
    console.log(error.message);
  }
}

async function getContactById(contactId) {
  try {
    const contacts = await listContacts();
    const result = contacts.find(({ id }) => id === contactId);
    return result;
  } catch (error) {
    console.log(error.message);
  }
}

async function removeContact(contactId) {
  try {
    const allContacts = await listContacts();
    const changedCollection = allContacts.filter(({ id }) => id !== contactId);
    await updateFile(changedCollection);
    return allContacts.filter(({ id }) => id === contactId);
  } catch (error) {
    console.log(error);
  }
}

async function addContact(name, email, phone) {
  try {
    const newContact = { id: v4(), name: name, email: email, phone: phone };
    const allContacts = await listContacts();
    const changedCollection = [...allContacts, newContact];
    await updateFile(changedCollection);
    return newContact;
  } catch (error) {
    console.log(error);
  }
}

async function updateFile(instance) {
  try {
    await fs.writeFile(contactsPath, JSON.stringify(instance, null, 2));
  } catch (error) {
    console.log(error);
  }
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};
