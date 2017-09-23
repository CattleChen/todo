import {Link} from 'react-router-dom';

let propTypes = {
  leftCount : PT.number,
  showClearBtn: PT.bool,
  onClearCompleted: PT.func,
  pathname: PT.string
}


export default class Footer extends React.Component{
  constructor(props){
    super(props);
  }
  render(){
    let {leftCount, showClearBtn, onClearCompleted,pathname} = this.props;

    let showBtn = null;

    if(showClearBtn){
      showBtn = (
        <button
          className='clear-completed'
          onClick={onClearCompleted}
        >
          clear all completed
        </button>
      )
    }
    return(
      <footer className='footer'>
        <span className='todo-count'>
          <strong>{leftCount}</strong>
          <span>item left</span>
        </span>
        <ul className='filters'>
          <li>
            <Link
              to='/'
              className={pathname==='/all'?'selected':''}
            >All</Link>
          </li>
          <li>
            <Link
              to='/active'
              className={pathname==='/active'?'selected':''}
            >Active</Link>
          </li>
          <li>
            <Link
              to='completed'
              className={pathname==='/completed'?'selected':''}
            >Completed</Link>
          </li>
        </ul>
        {showBtn}
      </footer>
    )
  }
}

Footer.propTypes = propTypes;
