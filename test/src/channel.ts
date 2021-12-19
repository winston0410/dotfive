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

            // TODO Need to handle the init state with channel as well. Ideally the init data should be fetched through API. Handling this could be done by using actor model, and use IndexedDB/LocalStorage as the mailbox for actor
            
			elector = createLeaderElection(channel);
			await elector.awaitLeadership()
		},
		dispatch(action: IAction<IData>) {
            channel.postMessage(action);
		}
	};
};

export default mkChannel();
