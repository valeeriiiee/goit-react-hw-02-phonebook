import { Component } from 'react';
import { nanoid } from 'nanoid';
import PropTypes from 'prop-types';

export default class ContactForm extends Component {
  static propTypes = {
    addContact: PropTypes.func.isRequired,
    contacts: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        number: PropTypes.number.isRequired,
      })
    ),
  };

  state = {
    name: '',
    number: '',
  };

  handleNameChange = e => {
    this.setState({
      name: e.target.value,
    });
  };

  handleNumberChange = e => {
    this.setState({
      number: e.target.value,
    });
  };

  handleSubmit = e => {
    //   prevent form to refresh after submitting
    e.preventDefault();
    const { name, number } = this.state;
    const { addContact, contacts } = this.props;

    // cannot submit if name and number is empty
    if (name.trim() === '' || number.trim() === '') {
      return;
    }
    // alert if existing contact name, prevent submit
    const existingContactName = contacts.find(
      contact => contact.name.toLowerCase() === name.toLowerCase()
    );
    if (existingContactName) {
      alert(`${name} is already in contacts`);
      return;
    }

    // alert if existing contact number, prevent submit
    const existingContactNumber = contacts.find(
      contact => contact.number === number
    );
    if (existingContactNumber) {
      alert(`${number} is already in contacts`);
      return;
    }

    //   Add contact
    addContact({
      id: nanoid,
      name: name.trim(),
      number: number.trim(),
    });

    this.setState({
      name: '',
      number: '',
    });
  };

  render() {
    const { name, number } = this.state;

    return (
      <form onSubmit={this.handleSubmit}>
        <label>
          <p>
            <input
              type="text"
              name="name"
              pattern="^[a-zA-Zа-яА-Я]+(([' \-][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
              title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan."
              required
              value={name}
              onChange={this.handleNameChange}
            />
          </p>
        </label>
        <label>
          <p>
            <input
              type="tel"
              name="number"
              pattern="\+?\d{1,4}?[\-.\s]?\(?\d{1,3}?\)?[\-.\s]?\d{1,4}[\-.\s]?\d{1,4}[\-.\s]?\d{1,9}"
              title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
              required
              value={number}
              onChange={this.handleNumberChange}
            />
          </p>
        </label>
        <button type="submit">Add Contact</button>
      </form>
    );
  }
}
