import React from 'react';

function Field({ label, name, defaultValue = '', onChange = () => { } }: any) {
  return (
    <div>
      <label>{label}: </label>
      <input
        type='text'
        name={name}
        defaultValue={defaultValue}
        onChange={onChange}
        required />
    </div>
  );
}

export default Field;
