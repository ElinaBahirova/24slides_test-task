import React, { useEffect, useState } from 'react';
import { Annotation } from '~/types/Annotation';
import { deleteAnnotation, getAnnotations } from '~/utils/annotationfFromAPI';
import { Image } from '../../components/Image'
import './AnnotationsPage.scss';


const defaultImageUrl =
  'https://images.pexels.com/photos/775201/pexels-photo-775201.jpeg?cs=srgb&dl=pexels-kaique-rocha-775201.jpg&fm=jpg';

export const AnnotationsPage = () => {
  const [imageUrl, setImageUrl] = useState(defaultImageUrl);
  const [fileName, setFileName] = useState('');
  const [annotations, setAnnotations] = useState<Annotation[]>([]);


  const updateAnnotations = () => {
    getAnnotations()
      .then((result) => setAnnotations(result))
      .finally(() => console.log(annotations));
  };

  const inputChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setImageUrl(URL.createObjectURL(e.target.files[0]));
      setFileName(e.target.files[0].name)
    }

    annotations.forEach((annotation) => {
      deleteAnnotation(annotation.id);
    });
  };


  useEffect(() => {
    updateAnnotations();
  }, [imageUrl]);


  return (
    <div className='annotations'>
      <div className="annotations__content">
        <div className="annotations__upload-form">
          <h1 className='annotations__file-name'>
            {imageUrl !== defaultImageUrl ? fileName : 'Here goes the file name'}
          </h1>
          <input
            type="file"
            id='image'
            name='image'
            accept='image/jpeg, image/png'
            onChange={inputChangeHandler}
            hidden
          />
          <label htmlFor="image" className='annotations__upload-button'>
            Upload image
          </label>
        </div>
        <Image
          imageUrl={imageUrl}
          updateAnnotations={updateAnnotations}
          annotations={annotations}
        />
        <div className='annotations__hint hint'>
          <p className='hint__text'>To leave a comment, mouseover</p>
          <div className='hint__icon hint__icon--plus'></div>
          <p className='hint__text'>on an image and click the left mouse button</p>
          <div className='hint__icon hint__icon--mouse'></div>
        </div>
      </div>
    </div>
  )
};
