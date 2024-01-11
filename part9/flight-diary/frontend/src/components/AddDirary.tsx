import { useState } from 'react'
import diariesServices from '../services/diariesServices'
import { DiaryType, NewDiaryType, Weather, Visibility } from '../types'
import { v4 as uuid } from 'uuid'

const AddDirary = ({ diaries, setDiaries }: { diaries: DiaryType[], setDiaries: (diaries: DiaryType[]) => unknown }) => {
    const [values, setValues] = useState<NewDiaryType>({
        date: "",
        visibility: Visibility.Good,
        weather: Weather.Cloudy,
        comment: ""
    })
    const [error, setError] = useState<string>()

    const handleAddDiary = async (e: React.SyntheticEvent) => {
        e.preventDefault();
        try {
            const val = { ...values, id: uuid() } as DiaryType;
            diariesServices.addDiary(val);
            await setDiaries([...diaries, val])
            setValues({
                date: "",
                visibility: Visibility.Good,
                weather: Weather.Cloudy,
                comment: ""
            })
        } catch (err: unknown) {
            if (err instanceof Error)
                setError(err.message);
        }
    }
    return (
        <div>
            <h2>Add a new Entry</h2>
            <p
                style={{
                    color:"red"
                }}
            >{error && <>Error: {error}</>}</p>
            <form onSubmit={handleAddDiary}>
                <label htmlFor="date">date:</label>
                <input type="text" name="date" id="date" value={values.date} onChange={(e) => setValues({ ...values, date: e.target.value })} />

                <br />

                <label htmlFor="visibility">visibility:</label>
                <select
                    name="visibility"
                    id="visibility" value={values.visibility}
                    onChange={(e: React.SyntheticEvent) => {
                        const val: Visibility = (e.target as HTMLInputElement).value as Visibility;
                        console.log(val)
                        setValues((): NewDiaryType => {
                            if (Object.values(Visibility).includes(val))
                                return { ...values, visibility: val }
                            else {   
                                setError("Invalid value selected")
                                throw new Error("")
                            }
                        })

                    }}>
                    {
                        Object.values(Visibility).map((val, idx) => {
                            return <option value={val} key={idx} >{val}</option>
                        })
                    }
                </select>

                <br />

                <label htmlFor="visibility">weather:</label>
                <select
                    name="weather"
                    id="weather" value={values.weather}
                    onChange={(e: React.SyntheticEvent) => {
                        const val: Weather = (e.target as HTMLInputElement).value as Weather;
                        console.log(val)
                        setValues((): NewDiaryType => {
                            if (Object.values(Weather).includes(val))
                                return { ...values, weather: val }
                            else {
                                setError("Invalid value selected")
                                throw new Error("")
                            }
                        })

                    }}>
                    {
                        Object.values(Weather).map((val, idx) => {
                            return <option value={val} key={idx} >{val}</option>
                        })
                    }
                </select>

                <br />

                <label htmlFor="comment">comment:</label>
                <input type="text" name="comment" id="comment" value={values.comment} onChange={(e) => setValues({ ...values, comment: e.target.value })} />

                <br />

                <button>submit</button>
            </form>

        </div>
    )
}

export default AddDirary