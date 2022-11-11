import React from 'react';

import { nanoid } from 'nanoid';
import { ContactList } from './ContactList/ContactList';
import { Filter } from './Filter/Filter';
import { ContactForm } from './ContactForm/ContactFomr';
// import formik from 'formik';
import { Container } from './App.styled';
import { useState } from 'react';
import { useEffect } from 'react';

const App = () => {
  const [contacts, setContacts] = useState([
    { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
    { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
    { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
    { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
  ]);
  const [filter, setFilter] = useState('');

  useEffect(() => {
    const updatedContacts = JSON.parse(localStorage.getItem('contacts'));
    if (updatedContacts) {
      setContacts(updatedContacts);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts]);

  const onSubmit = ({ name, number }) => {
    const isExist = contacts.find(contact => contact.name === name);
    if (isExist && number) {
      window.alert(`${name} is already in contacts`);
      return;
    } else {
      const contact = {
        id: nanoid(),
        name,
        number,
      };
      setContacts(prev => [contact, ...prev]);
    }
  };

  const toDeleteContact = contactId => {
    setContacts(prev => prev.filter(contact => contact.id !== contactId));
  };

  const onChangeFilter = e => {
    setFilter(e.currentTarget.value);
  };

  const visiableContacts = contacts.filter(contact =>
    contact.name.toLowerCase().includes(filter.toLowerCase())
  );
  return (
    <Container>
      <h2>Phonebook</h2>
      <ContactForm onSubmit={onSubmit} />
      <h2>Contacts</h2>
      <Filter value={filter} onChange={onChangeFilter} />
      <ContactList contacts={visiableContacts} onClick={toDeleteContact} />
    </Container>
  );
};

export default App;
