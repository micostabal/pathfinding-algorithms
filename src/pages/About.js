
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
        <p>I'm Martin Costabal, a software enthusiast.</p>
        <p>
          This app was created to have fun and learn about pathfinding in grids and React.
        </p>
        <p>
          Must confess I was hugely inspired in <a
            href="https://clementmihailescu.github.io/Pathfinding-Visualizer/"
            style={{color: 'orange', target: "_blank"}}
            rel="noreferrer"
            target="_blank"
          >
            Clement Mihailescu's
          </a> visualization (yeah! the <a href="https://www.youtube.com/@clem"
          style={{color: 'orange'}}
          rel="noreferrer"
          target="_blank"
          >youtuber</a>
           ) and thought that making my own version of it would be awesome as well.
        </p>
      </div>
    </div>
    
  )
}