import type { IData, IAction } from './types';

import { BroadcastChannel, createLeaderElection } from 'broadcast-channel';

const mkChannel = () => {
	let channel, elector, reducer;

	return {
		async connect(reducer) {
			channel = new BroadcastChannel('dotfive');

            channel.addEventListener('message', (data: IAction<IData>) => {
                reducer(data)
            });
            
			elector = createLeaderElection(channel);
			await elector.awaitLeadership()
		},
		dispatch(action: IAction<IData>) {
            channel.postMessage(action);
		}
	};
};

export default mkChannel();
