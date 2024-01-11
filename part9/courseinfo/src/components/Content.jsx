import Course from './Course'
const Content = ({ courseParts }) => {
    return (<>
            {
                courseParts.map((coursePart, idx) => {
                    return (
                        <Course name={coursePart.name} exerciseCount={coursePart.exerciseCount} key={idx} />
                    )
                })
            }
        </>
    )
}
export default Content