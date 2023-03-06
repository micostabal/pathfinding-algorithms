import './SelectionView.css';

export const SelectionView = () => {
  return (
    <div className='selection-view-container'>
      <div className='selection-view-row'>
        <p className='option-name'>Origin</p>
        <p className='paragraph-selection'>sad</p>
      </div>
      <div className='selection-view-row'>
        <p className='option-name'>Destination</p>
        <p className='paragraph-selection'>?</p>
      </div>
      <div className='selection-view-row'>
        <p className='option-name'>Algorithm</p>
        <p className='paragraph-selection'>Dijkstra</p>
      </div>
    </div>
  )
}