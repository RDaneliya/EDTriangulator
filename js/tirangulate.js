'use strict';

const form = document.getElementById('form');

const firstSys = document.getElementById('first-sys');
const secondSys = document.getElementById('second-sys');
const thirdSys = document.getElementById('third-sys');
const systems = [firstSys, secondSys, thirdSys];

const minRanges = document.getElementsByClassName('sys-min-dist');
const maxRanges = document.getElementsByClassName('sys-max-dist');

const candidates = document.getElementById('candidates');

const edsmUrl = new URL('https://www.edsm.net/api-v1/sphere-systems');

const loadSystems = (params) => {
  const fetchUrl = `${edsmUrl}?systemName=${params.systemName}&minRadius=${params.minRadius}&radius=${params.radius}`;
  return fetch(fetchUrl)
    .then(response => {
      return response.json();
    })
    .then(data => {
      const withoutDist = cutField(data, 'distance');
      return cutField(withoutDist, 'bodyCount');
    });
};

const getSysCandidates = async(sysParams) => {
  const systemsCandidates = [];
  for(const i of sysParams) {
    await loadSystems(i).then(systems => systemsCandidates.push(systems));
  }
  return systemsCandidates;
};

const cutField = (data, fieldName) => {
  if(data[0].hasOwnProperty(`${fieldName}`)) {
    const dataWithoutField = [];
    for(let i of data) {
      delete i[fieldName];
      dataWithoutField.push(i);
    }
    return dataWithoutField;
  }
  return data;
};

const intersect = (arrayOfArrays) => {
  const length = arrayOfArrays.length;

  const freqMap = new Map();
  for(const i of arrayOfArrays) {
    for(const j of i) {
      if(freqMap.has(j.name)) {
        const currentValue = freqMap.get(j.name);
        freqMap.set(j.name, currentValue + 1);
      } else {
        freqMap.set(j.name, 1);
      }
    }
  }

  const result = [];

  for(const entry of freqMap) {
    if(entry[1] === length) {
      result.push(entry[0]);
    }
  }
  return result;
};

const showArray = (dataArray, ul) => {
  dataArray.forEach(item => {
    const li = document.createElement('li');
    li.appendChild(document.createTextNode(item));
    li.setAttribute('class', 'list-group-item');

    ul.innerHTML = '';
    ul.appendChild(li);
  });
};

const submitForm = () => {
  event.preventDefault();
  const params = [];
  for(let i in systems) {
    const sysParam = {
      systemName: systems[i].value.replace(/\s/, '+'),
      minRadius: minRanges[i].value,
      radius: maxRanges[i].value
    };
    params.push(sysParam);
  }

  getSysCandidates(params)
    .then(systemsLists => {
      const result = intersect(systemsLists);
      showArray(result, candidates);
    });
  return true;
};

