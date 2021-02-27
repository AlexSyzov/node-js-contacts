const fs = require("fs");
const path = require("path");

const contactsPath = path.join(__dirname, "db", "contacts.json");

function listContacts() {
  fs.readFile(contactsPath, (err, data) => {
    if (err) {
      showError(err);
      return;
    }

    const normalizedData = normalizeData(data);

    console.table(normalizedData);
  });
}

function getContactById(contactId) {
  fs.readFile(contactsPath, (err, data) => {
    if (err) {
      showError(err);
      return;
    }

    const normalizedData = normalizeData(data);

    console.log(normalizedData[contactId - 1]);
  });
}

function removeContact(contactId) {
  fs.readFile(contactsPath, (err, data) => {
    if (err) {
      showError(err);
      return;
    }

    const normalizedData = normalizeData(data);

    if (contactId > normalizedData[normalizedData.length - 1].id) {
      return;
    }

    const newArray = normalizedData.filter(
      (item) => item.id !== Number(contactId)
    );

    const updatedData = JSON.stringify(newArray, null, 2);

    fs.writeFile(contactsPath, updatedData, (err) => {
      if (err) {
        showError(err);
      }

      console.log("\nContact has been successfully removed!");
    });
  });
}

function addContact(name, email, phone) {
  fs.readFile(contactsPath, (err, data) => {
    if (err) {
      showError(err);
      return;
    }

    const normalizedData = normalizeData(data);
    const id = normalizedData[normalizedData.length - 1].id + 1;

    const newArray = [
      ...normalizedData,
      {
        id,
        name,
        email,
        phone,
      },
    ];

    const updatedData = JSON.stringify(newArray, null, 2);

    fs.writeFile(contactsPath, updatedData, (err) => {
      if (err) {
        showError(err);
        return;
      }

      console.log("\nContact has been successfully added!");
    });
  });
}

function normalizeData(data) {
  return JSON.parse(data.toString());
}

function showError(err) {
  console.error(err.message);
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};
