import diariesServices from '../services/diariesServices'
import { useEffect, useState } from 'react'
import { DiaryType } from '../types'

const DiariesList = () => {
    const [diaries, setDiaries] = useState<DiaryType[]>([])
    useEffect(() => {
        diariesServices.getDiaries().then(res => {
            setDiaries(res)
        })
    }, [])

    return (
        <div>
            <h2>Diaries Entries</h2>
            <br /><br />
            {
                diaries.map(({ date, visibility, weather }, idx) => {
                    return <div key={idx}>
                        <b>{date}</b>
                        <br /><br />
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