import React from 'react';

export default function Alert(props) {
  const capital = (word) => {
    if (word) {
      const lower = word.toLowerCase();
      return lower.charAt(0).toUpperCase() + lower.slice(1);
    }
    return '';
  }

  return (
    <div style={{ height: '40px' }}>
      {props.alert && props.alert.type && props.alert.msg && (  // Check if props.alert and its properties exist
        <div className={`alert alert-${props.alert.type} alert-dismissible fade show`} role="alert">
          <strong>{capital(props.alert.type)}!</strong> {props.alert.msg}.
        </div>
      )}
    </div>
  )
}
