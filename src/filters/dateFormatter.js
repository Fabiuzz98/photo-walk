// E' una funzione che riceve un valore e ne esegue il contenuto. Eper chiamarla nell'app ---> {{ nome_valore_da_passare | nome_dato_al_filter_in_main}}

export default date => {
  const locales = navigator.language;
  const options = {
    weekday: 'long',
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
  };

  const formattedDay = date.toLocaleDateString(locales, options);

  return formattedDay;
};
