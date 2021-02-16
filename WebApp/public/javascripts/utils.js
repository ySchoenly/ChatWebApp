function formatDate(date) {
	try {
		var formattedDate = '';
		formattedDate += date.getDate() < 10 ? '0' + date.getDate() : date.getDate();
		formattedDate += '.';
		formattedDate += date.getMonth() < 10 ? '0' + date.getMonth() : date.getMonth();
		formattedDate += '.';
		formattedDate += date.getFullYear();
		formattedDate += '-';
		formattedDate += date.getHours() < 10 ? '0' + date.getHours() : date.getHours();
		formattedDate += ':';
		formattedDate += date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes();
	}
	catch (ex) {

    }
	return formattedDate;
}