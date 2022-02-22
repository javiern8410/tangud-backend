const listMap = (data: any[]) => {
	if (data && data.length > 0) {
		return data.map((d) => {
			const id = d._id;

			delete d._id;
			delete d.__v;

			return {
				id,
				...d
			};
		});
	}

	return data;
};

export { listMap };
