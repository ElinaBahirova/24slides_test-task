import { memo, useCallback, useState } from 'react';
import { CenteredLayout } from '~/components';
import { useRenderHighlight } from '~/utils';
import css from './optimize-1.module.scss';

const todosData = [
  { id: 1, text: 'run a marathon', done: false },
  { id: 2, text: 'ride an elephant', done: false },
  { id: 3, text: 'swim with a fish', done: false },
];

// TODO Fix all list re-rendering when only one component is changed :(

interface TodoProps {
  text: string;
  done: boolean;
  onClick: () => void;
}

const Todo = memo(({ text, done, onClick }: TodoProps) => {
  const ref = useRenderHighlight(css.render);
  const [isDone, setIsDone] = useState(done);

  const clickHandler = () => {
    onClick();
    setIsDone(!isDone)
  };

  return (
    <li ref={ref} onClick={clickHandler} className={css.listItem}>
      {isDone ? '[x]' : '[ ]'} {text}
    </li>
  );
});

export const Optimize1 = () => {
  const [todos, setTodos] = useState(todosData);

  const handleTodoClick = useCallback(
    (id: number) => {
      todos.forEach(todo => {
        if (todo.id === id) {
          todo.done = !todo.done;
        }
      });
    },
    [todos],
  );

  return (
    <CenteredLayout className="gap-4">
      <div className="text-3xl">It re-renders all items! =\</div>
      <div>We need to fix that</div>
      <ul>
        {todos.map((item) => (
          <Todo
            key={item.id}
            text={item.text}
            done={item.done}
            onClick={() => handleTodoClick(item.id)}
          />
        ))}
      </ul>
    </CenteredLayout>
  );
};
