import ListGroup from './components/ListGroup'
import Header from './components/Header'
import Card from './components/Card'
function App() {
  return (
    <>
      <ListGroup />
      <Header />

      <Card
        cardTitle={'testing TItle'}
        cardDescribtion={'Card Describtion'}
        cardTags={['test', 'coding', 'software']}
        cardImageURL={
          'https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/1abdd662-ebac-46f8-af26-92ffc3f65a77/dhlfsbl-61849d21-bf50-478d-b6b9-5a4f1c8f4972.png/v1/fill/w_900,h_507,q_80,strp/moriarty_from_moriarty_the_patriot__minimalist__by_tdn98_dhlfsbl-fullview.jpg?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7ImhlaWdodCI6Ijw9NTA3IiwicGF0aCI6IlwvZlwvMWFiZGQ2NjItZWJhYy00NmY4LWFmMjYtOTJmZmMzZjY1YTc3XC9kaGxmc2JsLTYxODQ5ZDIxLWJmNTAtNDc4ZC1iNmI5LTVhNGYxYzhmNDk3Mi5wbmciLCJ3aWR0aCI6Ijw9OTAwIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmltYWdlLm9wZXJhdGlvbnMiXX0.JjD06AYuh_9KYTkwUwngEDrJqy0yfnbagGtOmnk_RbY'
        }
      />
    </>
  )
}

export default App
