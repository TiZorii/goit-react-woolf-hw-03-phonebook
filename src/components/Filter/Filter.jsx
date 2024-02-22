import { Component } from 'react';
import css from './Filter.module.css';

export class Filter extends Component {
  render() {
    return (
      <label htmlFor="">
        Find contact by name
        <input
          className={css.formInput}
          type="text"
          name="filter"
          title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
          onChange={this.props.handleChange}
        />
      </label>
    );
  }
}
