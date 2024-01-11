import diariesServices from '../services/diariesServices'
import { useEffect } from 'react'
import { DiaryType } from '../types'

const DiariesList = ({ diaries, setDiaries }: { diaries: DiaryType[], setDiaries:(diaries:DiaryType) =>[]}) => {
    useEffect(() => {
        diariesServices.getDiaries().then(res => {
            setDiaries(res)
        })
    })
    return (
        <div>
            <h2>Diaries Entries</h2>
            {
                diaries.map(({ date, visibility, weather }, idx) => {
                    return <div key={idx}>
                        <b>{date}</b>
                        <br />
                        <p>
                            visibility: {visibility}
                            <br />
                            weather: {weather}
                        </p>
                    </div>
                })
            }
        </div>
    )
}

export default DiariesList