import React from 'react';
import { TOPICS_PER_PAGE } from '../App';

const PageChange = (props) => {
  // true/false whenever or not page is first or last
  const first = !props.pageNumber
  const last = props.pageNumber + 1 >= props.topicsCount / TOPICS_PER_PAGE;
  return (
    <div>
      {!first &&
          <span className="arrow" onClick={props.onDecrement}>{'<-'}</span>
      }
      <span>
        {' ' + (props.pageNumber + 1) + ' / ' + (Math.ceil(props.topicsCount / TOPICS_PER_PAGE)) + ' '}
      </span>
      {!last &&
        <span className="arrow" onClick={props.onIncrement}>{'->'}</span>
      }
    </div>
  );
};

export default PageChange;
