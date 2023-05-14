const Sumofexcercises = ({ parts }) => {
    let sum = 0;
    for (let i = 0; i < parts.length; i++) {
        sum += parts[i].exercises;
    }
    const total = parts.reduce((s, p) => {
        return s + p.exercises
    }, 0)

    return (
        <>
            <b>{'total of '}{total} {'excersies '}</b>
        </>
    )
}


export default Sumofexcercises