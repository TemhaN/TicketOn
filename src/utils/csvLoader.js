export async function loadCSV(filePath) {
	const response = await fetch(filePath);
	const data = await response.text();
	return parseCSV(data);
}

// function parseCSV(data) {
// 	const lines = data.split('\n');

// 	return lines
// 		.map(line => line.trim())
// 		.filter(line => line !== '')
// 		.map(line => {
// 			const values = line.split(',');
// 			const obj = {};
// 			if (values.length >= 2) {
// 				return { code: values[0].trim(), name: values[1].trim() };
// 			}
// 			// obj.code = values[0].trim();
// 			// obj.name = values[1].trim();
// 			return obj;
// 		});
// }

function parseCSV(data) {
	const lines = data.split('\n');

	return lines
		.map(line => line.trim())
		.filter(line => line !== '')
		.map(line => {
			return { name: line };ы
		});
}
