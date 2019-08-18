const URL_API = 'https://api.punkapi.com/v2/beers'

const fetchBeers = async (param, options) => {
    const url = URL_API + param
    try {
        const respond = await fetch(url, options);
        const json = await respond.json();
        return json;
    } catch (error) {
        return error;
    }
}
  
export default fetchBeers;