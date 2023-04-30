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
      <p>{parts.parts[0].name} {parts.parts[0].exercises}</p>
      <p>{parts.parts[1].name} {parts.parts[1].exercises}</p>
      <p>{parts.parts[2].name} {parts.parts[2].exercises}</p>
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
  const course = {
    name:"Half Stack Application Developement",
    parts:[
      {
        name : "Fundamental of React" ,
        exercises : 10 
      } ,
      {
        name : "Using props to pass data" ,
        exercises : 7
      } ,
      {
        name : "State of a component" ,
        exercises : 14
      } 
    ]
  }
  return (
      <>
        <Header name={course.name} />
        <Content parts={course.parts} />
        <Total parts={course.parts} />
      </>
    )
  }
  

export default app;