
const fetchData = (state = {}, action) => {
    switch (action.type) {
        case 'FETCH_DATA':
            console.log('action',action);

            const response = require(`./../../Data/CONTENTLISTINGPAGE-PAGE${action.param}.json`)
            const pageData = response.page
            const newVideos = pageData['content-items']['content']
            const newstate = {
                ...state,
                videoList: [...newVideos],
                heading: pageData.title,
                totalVideos: pageData['total-content-items']
            };
            console.log('state', state);
            console.log('newstate', newstate);
            return newstate;
        default: 
            return state;
    }
};

export default fetchData;