import React, { Component } from 'react';

import { nanoid } from 'nanoid';
import { ContactList } from './ContactList/ContactList';
import { Filter } from './Filter/Filter';
import ContactForm from './ContactForm/ContactFomr';
// import formik from 'formik';
import { Container } from './App.styled';

class App extends Component {
  state = {
    contacts: [
      { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
      { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
      { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
      { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
    ],
    filter: '',
  };

  onSubmit = ({ name, number }) => {
    const isExist = this.state.contacts.find(contact => contact.name === name);
    if (isExist && number) {
      window.alert(`${name} is already in contacts`);
      console.log(this.state.contacts);
      return;
    } else {
      const contact = {
        id: nanoid(),
        name,
        number,
      };
      this.setState(prevState => {
        return {
          contacts: [contact, ...prevState.contacts],
        };
      });
    }
  };

  onChangeFilter = e => {
    this.setState({ filter: e.currentTarget.value });
  };

  componentDidMount() {
    const updatedContacts = JSON.parse(localStorage.getItem('contacts'));

    if (updatedContacts) {
      this.setState({ contacts: updatedContacts });
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.contacts !== this.state.contacts) {
      localStorage.setItem('contacts', JSON.stringify(this.state.contacts));
    }
  }

  toDeleteContact = contactId => {
    this.setState(prevState => {
      return {
        contacts: prevState.contacts.filter(
          contact => contact.id !== contactId
        ),
      };
    });
  };
  render() {
    const visiableContacts = this.state.contacts.filter(contact =>
      contact.name.toLowerCase().includes(this.state.filter.toLowerCase())
    );
    return (
      <Container>
        <h2>Phonebook</h2>
        <ContactForm onSubmit={this.onSubmit} />
        <h2>Contacts</h2>
        <Filter value={this.state.filter} onChange={this.onChangeFilter} />
        <ContactList
          contacts={visiableContacts}
          onClick={this.toDeleteContact}
        />
      </Container>
    );
  }
}

export default App;
