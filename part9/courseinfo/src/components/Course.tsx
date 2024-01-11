const Header = ({ name, exerciseCount }: { name: string, exerciseCount: number }) => {
  return (
    <p>
      {name} {exerciseCount}
    </p>
  )
}
export default Header