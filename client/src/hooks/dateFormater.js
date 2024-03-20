function DateFormatter(dateString) {
  function convertDate(dateString) {
    const dateObj = new Date(dateString);
    const year = dateObj.getFullYear();
    const month = dateObj.getMonth() + 1;
    const date = dateObj.getDate();
    return `${year}-${month.toString().padStart(2, '0')}-${date
      .toString()
      .padStart(2, '0')}`;
  }

  const convertedDate = convertDate(dateString);

  return convertedDate;
}

export default DateFormatter;
