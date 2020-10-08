'use strict';

const minRanges = document.getElementsByClassName('sys-min-dist');
const maxRanges = document.getElementsByClassName('sys-max-dist');

const candidates = document.getElementById('candidates');

// eslint-disable-next-line no-unused-vars
const edsmUrl = new URL('https://www.edsm.net/api-v1/sphere-systems');


// eslint-disable-next-line no-unused-vars
const submitForm = () => {
  const systems = [
    getValue('first-sys'),
    getValue('second-sys'),
    getValue('third-sys')
  ];


  event.preventDefault();
  const params = [];
  for(let i in systems) {
    const sysParam = {
      systemName: systems[i].text.replace(/\s/g, '+'),
      minRadius: minRanges[i].value,
      radius: maxRanges[i].value
    };
    params.push(sysParam);
  }

  // eslint-disable-next-line no-undef
  getSysCandidates(params, candidates);
};

