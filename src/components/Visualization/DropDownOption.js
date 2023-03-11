
export const DropDownOption = ({text, onClick}) => {
  return (
    <li
      className='dropdown-option'
      style={{textAlign: 'left'}}
      onClick={onClick}
    >
      {text}
    </li>
  )
}