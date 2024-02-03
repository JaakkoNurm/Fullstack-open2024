const Header = (props) => {
    console.log("header is: ", props)
    return <h1>{props.course}</h1>
  }
  
const Total = ( {exercises} ) => {
const total = exercises.reduce(
    (previousTotal, part) => previousTotal + part.exercises,
    0)

return <b>Total of {total} exercises</b>
}
  
const Part = (props) => {
return (
    <p>
    {props.name} {props.exercises}
    </p>
)
}
  
const Content = ( {parts} ) => {
console.log("content is: ", parts)
return (
    <div>
    {parts.map(part =>
        <Part key={part.id} name={part.name} exercises={part.exercises} />
    )}
    </div>
)
}
  
const Course = ( {course} ) => {
console.log("course is: ", course)
return (
    <div>
    <Header course={course.name} />
    <Content parts={course.parts} />
    <Total exercises={course.parts}/>
    </div>
    
    
)
}

export default Course