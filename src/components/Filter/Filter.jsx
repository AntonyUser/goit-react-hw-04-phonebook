import PropTypes from 'prop-types';

import { Input, Label } from './Filter.styled';
export const Filter = ({ value, onChange }) => {
  return (
    <>
      <Label>
        Filter contacts by name
        <Input type="text" value={value} onChange={onChange}></Input>
      </Label>
    </>
  );
};

Filter.propTypes = {
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func,
};
