// action/chat.js
import * as api from '../Api'; // Assuming you have an `Api` folder where you store your API calls

// Action to get all messages for a chat room
export const getAllMessages = (roomId) => async (dispatch) => {
    try {
        // console.log(`Dispatching action to fetch messages for roomId: ${roomId}`);
        const { data } = await api.fetchMessages(roomId);
        dispatch({ type: 'FETCH_MESSAGES_SUCCESS', payload: data });
        // console.log(`action->Messages received: `, data);
    } catch (error) {
        console.error("Error fetching messages:", error);
    }
};
