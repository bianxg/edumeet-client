import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface LobbyPeer {
	id: string;
	displayName?: string;
	picture?: string;
	promotionInProgress?: boolean;
}

export type LobbyPeersState = LobbyPeer[];

const initialState: LobbyPeersState = [];

const lobbyPeersSlice = createSlice({
	name: 'lobbyPeers',
	initialState,
	reducers: {
		addPeers: ((state, action: PayloadAction<LobbyPeer[]>) => {
			return [ ...state, ...action.payload ];
		}),
		addPeer: ((state, action: PayloadAction<LobbyPeer>) => {
			state.push(action.payload);
		}),
		removePeer: ((state, action: PayloadAction<LobbyPeer>) => {
			return state.filter((peer) => peer.id !== action.payload.id);
		}),
		updatePeer: ((state, action: PayloadAction<LobbyPeer>) => {
			let peer = state.find((p) => p.id === action.payload.id);

			if (peer) {
				peer = { ...peer, ...action.payload };
			}
		}),
	},
});

export const lobbyPeersActions = lobbyPeersSlice.actions;
export default lobbyPeersSlice;