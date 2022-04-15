import logo from './logo.svg';
import './App.css';
import { useState } from 'react';


function Header(props) {
  console.log('props',props)
  return <header>
    <h1><a href='/' onClick={ (event) => {
      event.preventDefault();
      props.onChangeMode();
    }}>{props.title}</a></h1>
  </header>
}
function Nav(props) {
  const lis = []
  for (let i = 0; i < props.topics.length; i++){
    let t = props.topics[i];
    lis.push(<li key={t.id}>
      <a id={t.id} href={'/read' + t.id} onClick={event => {
        event.preventDefault();
        props.onChangeMode(Number(event.target.id));
       }}>{t.title}</a>
    </li>)
  }
  return  <nav>
        <ol>
          {lis}
        </ol>
      </nav>
}
function Article(props) {
  return <articles>
    <h2><a href='/' onClick={(event) => {
      event.preventDefault();
      props.onChangeMode();
    }}>{props.title}</a></h2>
    {props.body}
      </articles>
}
function App() {
  const [mode, setMode] = useState('Welcome');
  const [id, setId] = useState(null);
  const topics = [
        {id:1, title:'html', body:'html is ...'},
        {id:2, title:'css', body:'css is ...'},
        {id:3, title:'js', body:'js is ...'}
  ]
  let content = null;
  if (mode === 'Welcome') {
    content=  <Article title="Welcome" body="Hello, WEB" onChangeMode={(id)=>{alert('lala')}}></Article>;
  } else if (mode === "Read") {
    let title, body = null;
    for (let i = 0; i < topics.length; i++){
      console.log('오잉',topics[i].id, id);
      if ((topics[i].id) === id){
        title = topics[i].title;
        body = topics[i].body;
      }    
    }
    content= <Article title={title} body={body} onChangeMode={(id)=>{alert('lala')}}></Article>
  }
  return (
    <div>
      <Header title="REACT" onChangeMode={ () => {
        setMode('Welcome');
      }}></Header>
      <Nav topics={topics} onChangeMode={(_id) => {
        setMode('Read');
        setId(_id);
      }}></Nav>
      { content }
    </div>
  )
}
export default App;
