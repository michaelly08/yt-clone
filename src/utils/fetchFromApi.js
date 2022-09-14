export const options = {
  method: 'GET',
  url: 'https://youtube-v31.p.rapidapi.com',
  params: {
    relatedToVideoId: '7ghhRHRP6t4',
    part: 'id,snippet',
    type: 'video',
    // maxResults: '50'
  },
  headers: {
    'X-RapidAPI-Key': process.env.REACT_APP_RAPID_API_KEY,
    'X-RapidAPI-Host': 'youtube-v31.p.rapidapi.com'
  }
};



export const fetchData = async (url, options) => {
  const response = await fetch(url, options)
  const data = await response.json();

  return data;
}