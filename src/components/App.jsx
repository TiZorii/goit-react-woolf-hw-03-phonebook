import { Component } from 'react';
import { nanoid } from 'nanoid';
import { ContactForm } from './ContactForm/ContactForm';
import { Filter } from './Filter/Filter';
import { ContactList } from './ContactList/ContactList';

import css from './App.module.css';

const STORAGE_KEY = 'contacts';

const initialContacts = [
  { id: 'id-1', name: 'Harper Rodriguez', number: '459-12-56' },
  { id: 'id-2', name: 'Mia Chen', number: '443-89-12' },
  { id: 'id-3', name: 'Donovan Patel', number: '645-17-79' },
  { id: 'id-4', name: 'Isabella Santiago', number: '227-91-26' },
];

export class App extends Component {
  state = {
    contacts: [],
    filter: '',
  };

  componentDidMount() {
    const storageValue = localStorage.getItem(STORAGE_KEY);

    this.setState({
      contacts: storageValue ? JSON.parse(storageValue) : initialContacts,
    });
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.contacts !== prevState.contacts) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(this.state.contacts));
    }
  }

  handleChange = evt => {
    this.setState({ [evt.target.name]: evt.target.value });
  };

  createContact = (name, number) => {
    if (
      this.state.contacts.some(
        contact => contact.name.toLowerCase() === name.toLowerCase()
      )
    ) {
      alert('exist');
      return;
    }
    
    this.setState(prev => ({
      contacts: [...prev.contacts, { name, number, id: nanoid() }],
    }));
  };

  filterContacts = () => {
    const { contacts, filter } = this.state;
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(filter.toLowerCase())
    );
  }

  handleDelete = id => {
    this.setState(prev => ({
      contacts: prev.contacts.filter(contact => contact.id !== id),
    }));
  };

  render() {
    return (
      <div className={css.container}>
        <h1>Phonebook</h1>
        <ContactForm
          contacts={this.state.contacts}
          createContact={this.createContact}
        />
        <h2>Contacts</h2>
        <Filter handleChange={this.handleChange} />
        <ContactList
          contacts={this.filterContacts()}
          handleDelete={this.handleDelete}
        />
      </div>
    );
  }
}
