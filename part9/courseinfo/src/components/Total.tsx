const Header = ({ totalExercises }:{ totalExercises :number}): JSX.Element => {
    return (
        <p>
            Number of exercises {totalExercises}
        </p>
    )
}
export default Header