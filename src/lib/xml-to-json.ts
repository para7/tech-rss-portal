import { XMLParser } from 'fast-xml-parser';

const parser = new XMLParser();

export const xmlToJson = (xml: string) => {
	return parser.parse(xml);
};
