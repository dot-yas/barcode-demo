import { useState } from 'react'
import { Scanner } from './Scanner'

const App = () => {
  const [code, setCode] = useState<string>('')
  return (
    <div>
      <Scanner
        onReadCode={(result) => setCode((code) => result.getText())}
      />
      <p>code: {code}</p>
      <button>ボタン</button>
    </div>
  )
}

export default App;
