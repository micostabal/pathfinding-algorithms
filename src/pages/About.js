
export const About = () => {
  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      width: '100%'
    }}>
      <h1>About this project</h1>
      <div
        style={{
          width: '50%'
        }}
      >
        <p>I don't want to reveal my identity</p>
        <p>
          This app was created to have fun and learn about pathfinding in grids and React.
        </p>
        <p>
          Must confess I was hugely inspired in <a
            href="https://clementmihailescu.github.io/Pathfinding-Visualizer/"
            style={{color: 'orange'}}
          >
            Clement Mihailescu's  
          </a> and thought that making my own version of this visualization would be awesome as well.
        </p>
      </div>
    </div>
    
  )
}