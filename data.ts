export interface Image {
  id: string;
  uri: any;
  tags: string[];
}

// Christian Images
const christianImages = [
  require('./assets/images/Christian/download.jpg'),
  require('./assets/images/Christian/download1.jpg'),
  require('./assets/images/Christian/download2.jpg'),
  require('./assets/images/Christian/download3.jpg'),
  require('./assets/images/Christian/download4.jpg'),
  require('./assets/images/Christian/download5.jpg'),
  require('./assets/images/Christian/download6.jpg'),
  require('./assets/images/Christian/download7.jpg'),
  require('./assets/images/Christian/download8.jpg'),
  require('./assets/images/Christian/download11.jpg'),
  require('./assets/images/Christian/images.jpg'),
  require('./assets/images/Christian/images1.jpg'),
];

// Hindu Images
const hinduImages = [
  require('./assets/images/Hindu/download.jpg'),
  require('./assets/images/Hindu/download1.jpg'),
  require('./assets/images/Hindu/download2.jpg'),
  require('./assets/images/Hindu/download3.jpg'),
  require('./assets/images/Hindu/download4.jpg'),
  require('./assets/images/Hindu/download5.jpg'),
  require('./assets/images/Hindu/download6.jpg'),
  require('./assets/images/Hindu/download7.jpg'),
  require('./assets/images/Hindu/download8.jpg'),
  require('./assets/images/Hindu/download9.jpg'),
];

// Muslim Images
const muslimImages = [
  require('./assets/images/Muslim/download.jpg'),
  require('./assets/images/Muslim/download1.jpg'),
  require('./assets/images/Muslim/download2.jpg'),
  require('./assets/images/Muslim/download3.jpg'),
  require('./assets/images/Muslim/download4.jpg'),
  require('./assets/images/Muslim/download5.jpg'),
  require('./assets/images/Muslim/download6.jpg'),
  require('./assets/images/Muslim/download7.jpg'),
  require('./assets/images/Muslim/download8.jpg'),
  require('./assets/images/Muslim/download9.jpg'),
];

// Sikh Images
const sikhImages = [
  require('./assets/images/Sikh/download.jpg'),
  require('./assets/images/Sikh/download1.jpg'),
  require('./assets/images/Sikh/download2.jpg'),
  require('./assets/images/Sikh/download3.jpg'),
  require('./assets/images/Sikh/download4.jpg'),
  require('./assets/images/Sikh/download5.jpg'),
  require('./assets/images/Sikh/download6.jpg'),
  require('./assets/images/Sikh/download7.jpg'),
  require('./assets/images/Sikh/download8.jpg'),
  require('./assets/images/Sikh/download9.jpg'),
  require('./assets/images/Sikh/download10.jpg'),
];

// Hindu Quotes Images
const hinduQuotesImages = [
  require('./assets/images/HinduQuotes/download.jpg'),
  require('./assets/images/HinduQuotes/download1.jpg'),
  require('./assets/images/HinduQuotes/download2.jpg'),
  require('./assets/images/HinduQuotes/download3.jpg'),
  require('./assets/images/HinduQuotes/download4.jpg'),
  require('./assets/images/HinduQuotes/download5.jpg'),
  require('./assets/images/HinduQuotes/download6.jpg'),
  require('./assets/images/HinduQuotes/download7.jpg'),
  require('./assets/images/HinduQuotes/download8.jpg'),
  require('./assets/images/HinduQuotes/download9.jpg'),
];

export const ALL_TAGS = ['Christian', 'Hindu', 'Muslim', 'Sikh', 'Hindu Quotes'];

export const getAllImages = (): Image[] => {
  const allImages: Image[] = [];

  christianImages.forEach((image, index) => {
    allImages.push({
      id: `christian-${index}`,
      uri: image,
      tags: ['Christian'],
    });
  });

  hinduImages.forEach((image, index) => {
    allImages.push({
      id: `hindu-${index}`,
      uri: image,
      tags: ['Hindu'],
    });
  });

  muslimImages.forEach((image, index) => {
    allImages.push({
      id: `muslim-${index}`,
      uri: image,
      tags: ['Muslim'],
    });
  });

  sikhImages.forEach((image, index) => {
    allImages.push({
      id: `sikh-${index}`,
      uri: image,
      tags: ['Sikh'],
    });
  });

  hinduQuotesImages.forEach((image, index) => {
    allImages.push({
      id: `hinduquotes-${index}`,
      uri: image,
      tags: ['Hindu Quotes'],
    });
  });

  return allImages;
};

export const getImagesByTags = (tags: string[]): Image[] => {
  if (tags.length === 0) return getAllImages();
  return getAllImages().filter(img =>
    tags.some(tag => img.tags.includes(tag))
  );
};
