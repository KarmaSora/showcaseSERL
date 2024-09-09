// PascalCase
'use client'
function ListGroup() {
  let items = ['A Item', 'Second item', 'third Item', 'Gear 5', 'One Piece']

  return (
    <>
      <h1> DONT USE WSL, it will stop auto update...</h1>
      <ul className='list-group'>
        {items.length === 0 ? <h1>nah</h1> : null}
        {items.map((element, index) => (
          <li
            className='list-group-item' // Ensure the correct class is applied
            key={index} // Using index as a key
            onClick={(event) => {
              console.log(element + ' was clicked  at INDEX: ' + index)
              console.log(event)
            }}
          >
            {element}
          </li>
        ))}
      </ul>
    </>
  )
}

export default ListGroup
