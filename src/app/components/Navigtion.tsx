// PascalCase
'use client'
function Naviagtion() {
  let items = ['A Item', 'Second item', 'third Item', 'Gear 5', 'One Piece']

  return (
    <>
      <h1> here starts the naviagtion component</h1>
      <nav>
        <ul>
          <li>
            <a href='/'> home page</a>
          </li>
          <li>
            <a href='/users'> users page</a>
          </li>
        </ul>
      </nav>
      <h1> here ends the naviagtion component</h1>
    </>
  )
}

export default Naviagtion
