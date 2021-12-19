const mkChannel = () => {
	let channel, reducer; 

	return {
        connect(reducer){
            channel = new BroadcastChannel('dotfive');
        },
		broadcast() {}
	};
};

export default mkChannel();
