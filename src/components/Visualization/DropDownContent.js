export const DropDownContent = (props) => {
  const {children} = props;
  return (
    <div
      className='dropdown-content'
    >
      {children}
    </div>
  );
}