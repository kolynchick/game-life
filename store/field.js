const DEFAULT_NUMBER_START = 10;
const DEFAULT_NUMBER_FINISH = 50;

/* Изменение состояние выбранного элемента */
export const changeElementState = (state,x,y) => [...state.reduce(
  (accArray,elementArray,indexArray) => [...accArray,elementArray.reduce(
    (acc,element,index) => x === indexArray && y === index ? [...acc,!element] : [...acc,element]
  ,[])]
,[])
];

/* Перевычисление поля */
export const recalcElements = (state) => [...state.reduce(
  (accArray,elementArray,indexArray) => [...accArray,elementArray.reduce(
        (acc,element,index) => [...acc,isChange(state,indexArray,index,element)]
      ,[])]
  ,[])
];

const isChange = (state,x,y,isLife) => {
  var countPeoples = 0;

  if(x - 1 >= 0)
    if(state[x-1][y]) countPeoples++;

  if(x - 1 >= 0 && y - 1 >= 0)
    if(state[x-1][y-1]) countPeoples++;

  if(y - 1 >= 0)
    if(state[x][y-1]) countPeoples++;

  if(x + 1 < state.length && y - 1 >= 0)
    if(state[x+1][y-1]) countPeoples++;

  if(x + 1 < state.length)
    if(state[x+1][y]) countPeoples++;

  if(x + 1 < state.length && y + 1 < state.length)
    if(state[x+1][y+1]) countPeoples++;

  if(y + 1 < state.length)
    if(state[x][y+1]) countPeoples++;

  if(x - 1 >= 0 && y + 1 < state.length)
    if(state[x-1][y+1]) countPeoples++;

  return isLife ? (countPeoples === 2 || countPeoples === 3) : countPeoples === 3;
}

export const changeSizeField = (state,size) => {
  const value = parseInt(size,10);
  if (!Number.isInteger(value)) return state;
  if (value < DEFAULT_NUMBER_START || value > DEFAULT_NUMBER_FINISH) return state;
  return [...new Array(value).fill(new Array(value).fill(false))]
}
