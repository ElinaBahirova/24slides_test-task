import classNames from "classnames";
import clsx from "clsx";
import { useState } from "react";
import { Annotation } from "~/types/Annotation";
import './AnnotationItem.scss'

interface Props {
  annotation: Annotation;
  getPositionStyle: (annotation: Annotation) => {};
  deleteAnnotation: (id: number) => void;
  index: number;
}

export const AnnotationItem: React.FC<Props> = ({
  annotation,
  deleteAnnotation,
  index,
  getPositionStyle,
}) => {
  const { author, comment, id} = annotation;
  const [isVisible, setIsVisible] = useState(false);

  const annotationClickHandler = () => {
    setIsVisible(!isVisible);
  };
  
  const getAuthorInitials = () => {
    let initials = author[0];

    for (let i = 0; i < author.length; i++) {
      if (author[i] === ' ') {
        initials += author[i + 1]
      }
    }

    return initials;
  };

  return (
    <div
      className='annotation'
      style={getPositionStyle(annotation)}>
      <div
        className="annotation__icon"
        onClick={annotationClickHandler}
      >{index}</div>
      <div className={classNames(
        'annotation__content',
        { hidden: !isVisible },
      )}>
        <div className="annotation__rhombus"></div>
        <div className="annotation__author-initials">{getAuthorInitials()}</div>
        <div className="annotation__comment">
          <p className="annotation__author">{author}</p>
          <p className="annotation__text">{comment}</p>
        </div>
        <button
          className="annotation__delete-button"
          onClick={() => {
            deleteAnnotation(id);
          }}
        ></button>
      </div>
    </div>
  )
}