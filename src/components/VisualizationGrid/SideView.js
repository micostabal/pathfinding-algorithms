

export const SideView = (props) => {
  const {title, children} = props;

  return (
    <div
      className='iteration-view-container'
      style={{
        margin: '2px',
        backgroundColor: 'orange',
        width: '100%',
        minWidth: '10em',
        maxWidth: '15em',
        borderRadius: '0.3em'
      }}
    >
      <div 
        style={{
          marginTop: '0.3em',
          padding: '1em',
          color: 'black',
          fontWeight: 'bold'
        }}
      >
        <h2>{title}</h2>
      </div>
      {children}
    </div>
  )
}