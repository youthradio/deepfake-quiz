module.exports = {
  baseURL: process.env.BASE_URL_PRODUCTION || '/deepfake-quiz',
  title: `Doing a Double Take: Four Deepfake Scenarios That Mess With Our Minds`,
  author: 'Zoe Harwood',
  publishDate: 'Dec. 2, 2020',
  location: 'Oakland, CA',
  description:
    'Deepfakes use artificial intelligence to manipulate a person’s voice and image. From movies to music, news to the workplace, how do we draw the line between the real and the fake?',
  tweetMessage: 'with @itsyrmedia',
  url: 'https://interactive.yr.media/double-take-four-deepfake-scenarios',
  featureImage:
    'https://interactive.yr.media/double-take-four-deepfake-scenarios/social.jpg',
  featureImagePath: 'images/template-feature-image',
  featureImageDescription: 'People Protesting BLM',
  featureImageCaption: '(Photo: Andersen Ross Photography Inc/Getty Images)',

  wpPostSlug: 'north-carolina-vs-vaping-companies',
  wpPostID: '60986',
  // you might not need to change
  fbAppID: '73080818131',
  twitterHandler: '@itsyrmedia',
  docs: [
    {
      name: 'Deepfake writing assignment - backend',
      id: '19ZB-U9LdMPbIFjT9RJ8HBh8fCoQnKzoJCDnus9tK_j0',
    },
  ],
  dataPath: 'data/data.json',
  POLLSERVER: 'https://ee51aej7u4.execute-api.us-west-2.amazonaws.com/latest',
}
