const Header = (props) => {
  console.log(props)
  return (<h1>{props.course}</h1>

  )
}

const Content = (content) => {
  console.log(content)
  return (
    <div>
      <p>
        {content.parts[0].name} {content.parts[0].exercises}
      </p>
      
      <p>
        {content.parts[1].name} {content.parts[1].exercises}
      </p>

      <p>
        {content.parts[2].name} {content.parts[2].exercises}
      </p>
    </div>
  )
}

const Total = (total) => {
  console.log(total)
  return (
      <p>
        Number of exercises {total.parts[0].exercises+
          total.parts[1].exercises+
          total.parts[2].exercises}
      </p>
  )
}


const App = () => {
  const course = 'Half Stack application development'
  const parts = [
    {name: 'Fundamentals of React', exercises: 10},
    {name: 'Using props to pass data', exercises: 7},
    {name: 'State of a component', exercises: 14}
  ]

  return (
    <div>
      <Header course={course} />
      <Content parts={parts} />
      <Total parts={parts} />
    </div>
  )
}

export default App