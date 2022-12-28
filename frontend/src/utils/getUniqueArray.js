const getUniqueArray = (array) => {
  const uniq = Array.from(new Set(array.map((a) => a.value))).map((id) => {
    return array.find((a) => a.value === id);
  });
  console.log(uniq);

  return uniq;
};

export default getUniqueArray;
