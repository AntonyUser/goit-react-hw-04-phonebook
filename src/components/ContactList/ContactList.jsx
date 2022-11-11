// import { nanoid } from 'nanoid';
import PropTypes from 'prop-types';
import { Item, List, Button } from './ContactList.styled';

export const ContactList = ({ contacts, onClick }) => {
  return (
    <List>
      {contacts.map(({ name, number, id }) => {
        return (
          <Item key={id}>
            {name}: {number}
            <Button
              onClick={() => {
                onClick(id);
              }}
            >
              Delete
            </Button>
          </Item>
        );
      })}
    </List>
  );
};

ContactList.propTypes = {
  contacts: PropTypes.array,
};
