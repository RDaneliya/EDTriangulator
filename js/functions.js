// eslint-disable-next-line no-unused-vars
const getSysCandidates = async(sysParams, ul) => {
  Promise.all([
    loadSystems(sysParams[0]),
    loadSystems(sysParams[1]),
    loadSystems(sysParams[2])
  ]).then(([sys0, sys1, sys2]) => {
    const result = intersect([sys0, sys1, sys2]);
    showArray(result, ul);
  });
};

const loadSystems = (params) => {
  // eslint-disable-next-line no-undef
  //const fetchUrl = `${edsmUrl}?systemName=${params.systemName}&minRadius=${params.minRadius}&radius=${params.radius}`;
  let fetchUrl = new URL(edsmUrl);
  Object.keys(params).forEach(key => fetchUrl.searchParams.append(key, params[key]));
  return fetch(fetchUrl)
    .then(response => {
      return response.json();
    })
    .then(data => {
      const withoutDist = cutField(data, 'distance');
      return cutField(withoutDist, 'bodyCount');
    });
};

const cutField = (data, fieldName) => {
  if(Object.prototype.hasOwnProperty.call(data[0], `${fieldName}`)) {
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
