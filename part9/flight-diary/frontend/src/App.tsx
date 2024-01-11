import { useState } from 'react'
import DiariesList from './components/DiariesList'
import AddDirary from './components/AddDirary'
import { DiaryType } from './types'
const App = () => {
  const [diaries, setDiaries] = useState<DiaryType[]>([])
  return (
    <div>
      <AddDirary diaries={diaries} setDiaries={setDiaries} />
      <DiariesList diaries={diaries} setDiaries={setDiaries} />
    </div>
  )
}

export default App