import React, { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import { Annotation } from "~/types/Annotation";
import { addAnnotation, deleteAnnotation, getAnnotations } from "~/utils/annotationfFromAPI";
import { AnnotationItem } from "../AnnotationItem";

interface Props {
  imageUrl: string;
  annotations: Annotation[];
  updateAnnotations: () => void;
}

type Size = {
  width: number;
  height: number;
}

const defaultAnnotation: Annotation = {
  id: 0,
  author: '',
  comment: '',
  pos: {
    x: 0,
    y: 0,
  }
}

export const Image: React.FC<Props> = ({ imageUrl, updateAnnotations, annotations }) => {
  const imageRef = useRef<HTMLImageElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [imageSize, setImageSize] = useState<Size>({width: 0, height: 0});
  const [containerSize, setContainerSize] = useState<Size>({width: 0, height: 0});
  const [newAnnotation, setNewAnnotation] = useState<Annotation>(defaultAnnotation);
  const [isCreating, setIsCreating] = useState(false);

  const getImageSize = () => {
    if (imageRef.current && containerRef.current) {
      setImageSize({
        width: imageRef.current.offsetWidth,
        height: imageRef.current.offsetHeight,
      });
      setContainerSize({
        width: containerRef.current.offsetWidth,
        height: containerRef.current.offsetHeight,
      })
    }
  };

  const getPosition = (clientX: number, clientY: number) => {
    if (imageRef.current) {
      return {
        x: (clientX - imageRef.current.getBoundingClientRect().left) / imageSize.width,
        y: (clientY - imageRef.current.getBoundingClientRect().top) / imageSize.height,
      }
    };

    return {x: 0, y: 0};
  };
  
  const imageClickHandler = (event: React.MouseEvent<HTMLImageElement>) => {
    setIsCreating(true);
    setNewAnnotation({
      ...newAnnotation,
      pos: getPosition(event.clientX, event.clientY),
      author: 'Harry Potter',
      id: annotations.length + 1,
    })
    console.log(newAnnotation.pos)
  };
  
  const inputChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewAnnotation({
      ...newAnnotation,
      comment: e.target.value,
    });
  };
  
  const submitHandler = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (newAnnotation.comment.length) {
      addAnnotation(newAnnotation)
      .finally(() => {
        setNewAnnotation(defaultAnnotation);
        setIsCreating(false);
        updateAnnotations();
      });
    }
  };
  
  const blurHandler = (event: React.FocusEvent<HTMLInputElement>) => {
    if (event.relatedTarget === null) {
      setIsCreating(false);
      setNewAnnotation(defaultAnnotation);
    }
  };
  
    const removeAnnotation = useCallback((id: number) => {
      deleteAnnotation(id);
      updateAnnotations();
    }, []);
  
  const getPositionStyle = useCallback((annotation: Annotation) => {
    return {
      'top': (containerSize.height - imageSize.height) / 2 + annotation.pos.y * imageSize.height + 'px',
      'left': (containerSize.width - imageSize.width) / 2 + annotation.pos.x * imageSize.width + 'px',
    };
  }, [imageSize, containerSize]);
  
  useEffect(() => {
    getImageSize();
    window.addEventListener('resize', getImageSize);

    return () => {
      window.removeEventListener('resize', getImageSize)
    }
  }, []);

  return (
    <div
      ref={containerRef}
      className='annotations__image-container'
    >
      <img
        ref={imageRef}
        src={imageUrl}
        alt="Uploaded image"
        className='annotations__image image'
        onClick={imageClickHandler}
      />
      {annotations.map((annotation, index) => (
          <AnnotationItem
            key={annotation.id}
            annotation={annotation}
            getPositionStyle={getPositionStyle}
            index={index + 1}
            deleteAnnotation={removeAnnotation}
          />
        ))}
      {isCreating && (
        <div
          className="annotation"
          style={getPositionStyle(newAnnotation)}
        >
          <div
            className="annotation__icon"
          >{newAnnotation.id}</div>
          <div className="annotation__content annotation__content--new">
            <div className="annotation__rhombus"></div>
            <form
              className="annotation__form"
              onSubmit={submitHandler}
            >
              <input
                className="annotation__comment-input"
                autoFocus
                type="text"
                value={newAnnotation.comment}
                placeholder='Leave a comment'
                onChange={inputChangeHandler}
                onBlur={blurHandler}
              />
              <button type="submit" className="annotation__submit-button button"></button>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}