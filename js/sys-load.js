$('.sys-dropdown').select2({
  placeholder: 'Search for a system...',
  theme: 'bootstrap4',
  ajax: {
    url: 'https://system.api.fuelrats.com/typeahead',
    dataType: 'json',

    data: (params) => {
      return {
        term: params.term
      };
    },
    processResults: (data) => {
      return {
        results: $.map(data, (item) => {
          return {
            id: data.indexOf(item),
            text: item
          };
        })
      };
    },
    cache: true
  },
  minimumInputLength: 3
});