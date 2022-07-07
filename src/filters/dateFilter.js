export default passedDate => {
  const date = new Date(passedDate);
  const locale = navigator.language;

  const options = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
  };

  const formattedDate = date.toLocaleDateString(locale, options);
  return formattedDate;
};
