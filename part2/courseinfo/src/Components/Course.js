import Part from './Part'
const Header = ({ text }) => <h1>{text}</h1>

const Content = ({ parts }) => {
    return (
        <>
            {parts.map(part => (
                <Part key={part.id} part={part} />
            ))}
        </>
    );
};

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


const Course = ({ course }) => {
    return (
        <>
            <Header text={course.name} />
            <Content parts={course.parts} />
            <Sumofexcercises parts={course.parts} />
        </>
    )
}
export default Course