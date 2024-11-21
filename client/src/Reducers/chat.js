// chatReducer.js

const initialState = {
    messages: []  // Initialize with an empty array
};

const chatReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'FETCH_MESSAGES_SUCCESS':
            // console.log('reducer->Updating state with fetched messages:', action.payload);
            return { ...state, messages: action.payload };
        case 'NEW_MESSAGE':
            // console.log('reducer->Adding new message to state:', action.payload);
            return { ...state, messages: [...state.messages, action.payload] }; // Add new message
        default:
            return state;
    }
};

export default chatReducer;
