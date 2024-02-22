import css from './ContactList.module.css';

export const ContactList = props => {
  return (
    <ul className={css.contactList}>
      {props.contacts.map(contact => (
        <li key={contact.id}>
          {contact.name}: {contact.number}  
          <button className={css.itemButton} type="button" onClick={() => props.handleDelete(contact.id)}>
            Delete
          </button>
        </li>
      ))}
    </ul>
  );
};
