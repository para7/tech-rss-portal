const shortFormatter = new Intl.DateTimeFormat('ja');
const longFormatter = new Intl.DateTimeFormat('ja', {
	dateStyle: 'medium',
	timeStyle: 'long',
	timeZone: 'Japan'
});

export const FormatDateYMH = (date: Date) => {
	return shortFormatter.format(date);
};

export const FormatDateJP = (date: Date) => {
	return longFormatter.format(date);
};
