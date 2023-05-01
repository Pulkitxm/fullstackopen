const Header = (course) => {
  return(
    <>
      <p>{course.name}</p>
    </>
  )
}
const Content = (parts) =>{
  return(
    <>
      <p><Parts part={parts.parts[0]} /></p>
      <p><Parts part={parts.parts[1]} /></p>
      <p><Parts part={parts.parts[2]} /></p>
      {/* <p>{parts.parts[0].name} {parts.parts[0].exercises}</p>
      <p>{parts.parts[1].name} {parts.parts[1].exercises}</p>
      <p>{parts.parts[2].name} {parts.parts[2].exercises}</p> */}
  </>
  )
}

const Parts = (part) =>{
  return(
    <>
      {part.part.name} {part.part.exercises}
    </>
  )
}

const Total = (parts) =>{ 
  return(
    <>
      <p>{"Total exercises -> "}{parts.parts[0].exercises + parts.parts[1].exercises + parts.parts[2].exercises}</p>
  </>
  )
}

const app = () =>{
  console.log("Hello from react app");
  const course = "Half Stack Application Developement"
  const part1 = {
                  name : "Fundamental of React" ,
                  exercises : 10 
  } 
  const part2 = {
                  name : "Using props to pass data" ,
                  exercises : 7
  } 
  const part3 = {
                  name : "State of a component" ,
                  exercises : 14
  } 
  return (
      <div>
        <Header name={course} />
        <Content parts={[part1 , part2 ,part3 ]} />
        <Total parts={[part1 , part2 ,part3 ]} />
      </div>
    )
  }
  

export default app;