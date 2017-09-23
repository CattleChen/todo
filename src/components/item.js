let propTypes = {
  todo: PT.object,
  onDestory: PT.func,
  onToggle: PT.func,
  onKeepInputValue: PT.func
}


export default class Item extends React.Component{
  constructor(props){
    super(props);
    this.state={
      onEdit:false,
      val:''
    }

    this.onChangeEdit =this.onChangeEdit.bind(this);
    this.onEnter =this.onEnter.bind(this);
    this.onBlur =this.onBlur.bind(this);
    this.onChangeInput =this.onChangeInput.bind(this);
    this.keepInputValue =this.keepInputValue.bind(this);
  }

  onChangeInput(ev){

    this.setState({
      val:ev.target.value
    })
  }

  keepInputValue(){

    this.setState({
      onEdit: false
    })

    //console.log(this.state.onEdit)

    let {onKeepInputValue,todo} = this.props;

    onKeepInputValue(todo,this.state.val)
  }

  onEnter(ev,beginVal){
    //console.log(ev.keyCode);


    // // if(ev.keyCode !== 13){
    // //   return
    // // }else{
    // //   this.keepInputValue();
    // // }
    //
    // if(ev.keyCode !==27){
    //   return
    // }else{
    //   this.setState({
    //     onEdit: false
    //   })
    //
    //
    // }

    switch (ev.keyCode) {
      case 13:
        this.keepInputValue()
        break;
      case 27:
        console.log(beginVal)
        this.setState({
          onEdit: false,
          val:beginVal
        })
        break;
      default:
        return
    }



  }

  onBlur(){
    this.keepInputValue();
  }

  onChangeEdit(todo){
    this.setState({
      onEdit:true,
      val:todo.value
    },(()=>{this.refs.edit.focus()})) //这里要在setState完成之后，才能进行聚焦
  }

  render(){
    let {onChangeEdit,onBlur,onEnter,onChangeInput,onKeepInputValue} = this;

    let {todo,onDestory,onToggle} = this.props;

    let {onEdit,val} = this.state;

    let beginVal = this.state.val;

    let itemClassName = '';

    //这里每次改变onEdit或者hasCompleted是，render方法会被重新执行，页面也重新进行渲染
    if(onEdit) itemClassName += 'editing';

    if(todo.hasCompleted) itemClassName += 'completed';

    return(
      <li className={itemClassName}>
        <div className='view'>
          <input
            className='toggle'
            type='checkbox'
            checked={todo.hasCompleted}
            onChange={()=>{onToggle(todo)}}
          />
          <label
            onDoubleClick={ev=>onChangeEdit(todo)}
          >
            {todo.value}
          </label>
          <button
            className='destroy'
            onClick={()=>{onDestory(todo)}}
          ></button>
        </div>
        <input
          className='edit'
          value={val}
          onBlur={onBlur}
          onKeyDown={(ev)=>{onEnter(ev,beginVal)}}
          onChange={onChangeInput}
          ref='edit'
        />
      </li>
    )
  }
}

Item.propTypes = propTypes;
