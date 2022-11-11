import React from 'react';
import { Formik, Field } from 'formik';
import PropTypes from 'prop-types';
import {
  Form,
  Button,
  ErrorMessage,
  Label,
  Input,
} from '../ContactForm/ContactForm.styled';
import * as yup from 'yup';
import { useState } from 'react';

yup.addMethod(yup.string, 'validation', function () {
  return this.matches(
    "^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$",
    "Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
  );
});
yup.addMethod(yup.string, 'numeric', function () {
  return this.matches(
    '^[+]?[(]?[0-9]{3}[)]?[-s.]?[0-9]{3}[-s.]?[0-9]{4,6}$',
    'Phone number must be digits and can contain spaces, dashes, parentheses and can start with +'
  );
});

const Schema = yup.object().shape({
  name: yup.string().validation().required(),
  number: yup.string().numeric().required(),
});

export const ContactForm = ({ onSubmit }) => {
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');

  const onChange = e => {
    const { name, value } = e.currentTarget;
    switch (name) {
      case 'name':
        setName(value);
        break;

      case 'number':
        setNumber(value);
        break;

      default:
        break;
    }
  };

  const resetForm = () => {
    setName('');
    setNumber('');
  };

  return (
    <>
      <Formik
        initialValues={{ name: '', number: '' }}
        validationSchema={Schema}
        onSubmit={values => {
          onSubmit(values);
          resetForm();
        }}
      >
        <Form>
          <Field as={Label}>
            <span>Name</span>
            <Field
              as={Input}
              type="text"
              name="name"
              value={name}
              onChange={onChange}
            />
            <ErrorMessage name="name" component="div" />
          </Field>
          <Field as={Label}>
            <span>Number</span>
            <Field
              as={Input}
              type="tel"
              name="number"
              value={number}
              onChange={onChange}
            />
            <ErrorMessage name="number" component="div" />
          </Field>

          <Button type="submit" disabled={!name || !number}>
            Add contact
          </Button>
        </Form>
      </Formik>
    </>
  );
};
ContactForm.propTypes = {
  onSubmit: PropTypes.func,
  onChange: PropTypes.func,
};

// class ContactForm extends Component {
//   state = {
//     name: '',
//     number: '',
//   };
//   onChange = e => {
//     const { name, value } = e.currentTarget;
//     this.setState({ [name]: value });
//   };
//   resetForm() {
//     this.setState(() => {
//       return {
//         name: '',
//         number: '',
//       };
//     });
//   }

//   render() {
//     return (
//       <>
//         <Formik
//           initialValues={{ name: '', number: '' }}
//           validationSchema={Schema}
//           onSubmit={values => {
//             this.props.onSubmit(values);
//             this.resetForm();
//           }}
//         >
//           <Form>
//             <Field as={Label}>
//               <span>Name</span>
//               <Field
//                 as={Input}
//                 type="text"
//                 name="name"
//                 value={this.state.name}
//                 onChange={this.onChange}
//               />
//               <ErrorMessage name="name" component="div" />
//             </Field>
//             <Field as={Label}>
//               <span>Number</span>
//               <Field
//                 as={Input}
//                 type="tel"
//                 name="number"
//                 value={this.state.number}
//                 onChange={this.onChange}
//               />
//               <ErrorMessage name="number" component="div" />
//             </Field>

//             <Button
//               type="submit"
//               disabled={!this.state.name || !this.state.number}
//             >
//               Add contact
//             </Button>
//           </Form>
//         </Formik>
//       </>
//     );
//   }
// }

// export default ContactForm;

// ContactForm.propTypes = {
//   onSubmit: PropTypes.func,
//   onChange: PropTypes.func,
// };
