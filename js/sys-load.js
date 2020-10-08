// eslint-disable-next-line no-undef
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
        // eslint-disable-next-line no-undef
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

const getValue = (elementId) => {
  return  $(`#${elementId}`).select2('data')[0]
};