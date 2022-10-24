const path = require('path');
const fs = require('fs');
const { v4 } = require('uuid');

const contactsPath = path.normalize('./db/contacts.json');

function listContacts() {
  fs.readFile(contactsPath, (error, data) => {
    if (error) {
      console.log('error', error);
    }
    console.table(JSON.parse(data));
    const contacts = JSON.parse(data);
    return contacts;
  });
}

function getContactById(contactId) {
  fs.readFile(contactsPath, (error, data) => {
    if (error) {
      console.log('error', error);
    }
    const contacts = JSON.parse(data);
    const contactToFind = contacts.filter(item => item.id === contactId);
    console.table(contactToFind);
  });
}

function removeContact(contactId) {
  fs.readFile(contactsPath, (error, data) => {
    if (error) {
      console.log('error', error);
    }
    const contacts = JSON.parse(data);
    const leftContacts = contacts.filter(item => item.id !== contactId);
    const updateContacts = JSON.stringify(leftContacts);
    fs.writeFile(contactsPath, updateContacts, error => {
      if (error) {
        console.log('error', error);
      }
      const contactToRemove = contacts.filter(item => item.id === contactId);
      console.table(contactToRemove);
    });
  });
}

function addContact(name, email, phone) {
  const newContact = { id: v4(), name, email, phone };
  fs.readFile(contactsPath, (error, data) => {
    if (error) {
      console.log('error', error);
    }
    const contacts = JSON.parse(data);
    const updateContacts = JSON.stringify([...contacts, newContact]);
    fs.writeFile(contactsPath, updateContacts, error => {
      if (error) {
        console.log('error', error);
      }
      console.table(newContact);
    });
  });
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};
