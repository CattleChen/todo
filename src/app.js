import Item from 'components/item.js';
import Footer from 'components/footer.js';
import {BrowserRouter as Router, Route, Link} from 'react-router-dom';

require('style/base.css');
require('style/index.css');



export default class App extends React.Component{
  constructor(props){
    super(props);
    this.state={
      todosDate:[],
      inputVal:'',
      view:'all'
    };
    this.handleKeyDownPost = this.handleKeyDownPost.bind(this);
    this.onDestory = this.onDestory.bind(this);
    this.onClearCompleted = this.onClearCompleted.bind(this);
    this.inputChange = this.inputChange.bind(this);
    this.ToggleAll = this.ToggleAll.bind(this);
    this.onToggle = this.onToggle.bind(this);
    this.changeView = this.changeView.bind(this);
    this.onKeepInputValue = this.onKeepInputValue.bind(this);
  }

  onKeepInputValue(todo,value){
    let {todosDate} = this.state;

    todosDate = todosDate.map(elt=>{
      if(todo.id === elt.id){
        elt.value = value;
      }
      return elt
    })

    this.setState({
      todosDate
    })
  }

  changeView(view){
    this.setState({
      view
    })
  }

  onToggle(todo){
    //console.log(1)
    let {todosDate} = this.state;

    todosDate = todosDate.map((elt)=>{
      if(elt.id === todo.id){
        elt.hasCompleted = !elt.hasCompleted;
      }
      return elt;
    })
    //console.log(todo.hasCompleted);
    this.setState({
      todosDate
    })
  }

  ToggleAll(ev){
    let {checked} = ev.target;

    let {todosDate} = this.state;
    todosDate = todosDate.map((elt)=>{
      elt.hasCompleted = checked;
      return elt;
    })


    this.setState({
      todosDate
    })
  }



  inputChange(ev){
    this.setState({
      inputVal:ev.target.value
    })
  }

  handleKeyDownPost(ev){
    if(ev.keyCode !== 13){
      return;
    }

    let {inputVal} = this.state;

    let value = inputVal.trim();

    if(value == ''){
      return
    }
    let todo = {};
    todo.id = new Date().getTime();
    todo.value = value;
    todo.hasCompleted = false;

    let {todosDate} = this.state;
    todosDate.push(todo);

    this.setState({
      todosDate,
      inputVal:''
    })

    //这是input里面的真实值，虽然真实值为空，但是渲染在页面中的值不变
    //ev.target.value = '';
  }

  onDestory( todo ){
    let {todosDate} = this.state;
    todosDate = todosDate.filter((elt)=>{
      return elt.id != todo.id
    })
    this.setState({
      todosDate
    })
  }

  onClearCompleted(){
    let {todosDate} = this.state;
    todosDate = todosDate.filter((elt)=>{
      return !elt.hasCompleted
    })
    this.setState({
      todosDate
    })
  }



  render(){

    let {onClearCompleted,onDestory,handleKeyDownPost,inputChange,ToggleAll,onToggle,changeView,onKeepInputValue} = this;

    let {todosDate,inputVal,view} = this.state;

    let {location:{pathname}} = this.props;

    //console.log(location);
    //console.log(match);

    let items = null,
        itemBox = null,
        footer = null;

    let leftCount = todosDate.length;

    items = todosDate.filter(elt=>{
      if(elt.hasCompleted) leftCount--;
      switch (pathname) {
        case '/active':
          return !elt.hasCompleted;
        case '/completed':
          return elt.hasCompleted;
        default:
          return true
      }
    })

    items = items.map((elt,i)=>{
      return(
        <Item
          {...{
            todo:elt,
            onDestory,
            onToggle,
            onKeepInputValue
          }}
          key={i}
        />
      )
    })

    //要放在上面Item的后面
    if(todosDate.length){
        itemBox = (
          <section className='main'>
            <input
              type='checkbox'
              className='toggle-all'
              checked={leftCount===0}
              onChange={ToggleAll}
            />
            <ul className='todo-list'>
              {items}
            </ul>
          </section>
        )

        footer = (
          <Footer
            {...{
              leftCount,
              showClearBtn:leftCount < todosDate.length,
              onClearCompleted,
              pathname
            }}
          />
        )
    }

    return(
      <div className='todoapp'>
        <header className="header">
          <h1>todos</h1>
          <input
            type='text'
            className="new-todo"
            onKeyDown={handleKeyDownPost}
            value={inputVal}    //这里使用的是提取真实值后，的虚拟状态值，然后渲染在页面
            onChange={inputChange}
            placeholder='type something here'
          />
        </header>
        {itemBox}
        {footer}
      </div>
    )
  }
}


ReactDOM.render((
  <Router>
    <Route path='/' component={App}></Route>
  </Router>
),document.getElementById('root'));

if(module.hot){ 
    module.hot.accept()
}
