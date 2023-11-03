import { SaveImageType } from '../types/interface';

export const generateImageIds = (images: string[]): SaveImageType[] => {
  return images.map((image) => {
    const split = image.split('/');
    const id = split[split.length - 1];

    return {
      uri: image,
      id,
    };
  });
};
