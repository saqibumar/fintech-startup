import React from 'react';

export const FormErrors = ({formErrors}) =>
<div className='container formErrors'><ul>
  {Object.keys(formErrors).map((fieldName, i) => {
    if(formErrors[fieldName].length > 0){
      return (
        <li key={i}>{fieldName} {formErrors[fieldName]}</li>
      )        
    } else {
      return '';
    }
  })}
  </ul>
</div>
