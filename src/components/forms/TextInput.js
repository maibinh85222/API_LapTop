// import PropTypes from 'prop-types';

const TextInput = ({ name, label, className, type, ...rest }) => {
    return (
      <div className='form-floating'>
        <input
            className='form-control'
            id={name} name={name}
            placeholder={label}
            {...rest}
        />
      </div>
    );
  };
  
  export default TextInput;