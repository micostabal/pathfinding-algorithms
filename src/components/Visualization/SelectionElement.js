import React, {useState} from "react";

export const SelectionElement = (props) => {
  const {
    text, 
    disabled,
    children,
    onClick
  } = props;
  const firstColor = '#E4D00A';
  const secondColor = '#088F8F';
  
  const [buttonColor, setButtonColor] = useState(firstColor);  
  
  return (
    <>
      <div
        className={disabled ? 'dropdown-disabled' : 'dropdown-enabled'}
        style={{
          position: 'relative',
          display: 'inline-block',
          cursor: disabled ? 'not-allowed' : 'normal'
        }}
      >
        <button
          style={{
            border: '1px solid black',
            borderRadius: '3px',
            backgroundColor: buttonColor,
            padding: '0.3em',
            fontWeight: 'bold',
            width: '9em'
          }}
          disabled={disabled}
          onMouseEnter={() => {
            setButtonColor(secondColor);
          }}
          onMouseLeave={() => {
            setButtonColor(firstColor);
          }}
          onClick={onClick}
        >
          {text}
        </button>
        {children}
      </div>
    </>
  )
}