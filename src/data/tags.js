function generateTags(count) {
  // Default Root Level and Folder 1
  let data = [{_id: 1, isFolder: true, name: 'Root Level', parent: null }, {_id: 2, isFolder: true, name: 'Folder 1', parent: 'Root Level' } ];
  let folders = [{_id: 1, isFolder: true, name: 'Root Level', parent: null }, {_id: 2, isFolder: true, name: 'Folder 1', parent: 'Root Level' }];

  for (let i = 0; data.length <= count; i++) {
    let randomBool = Math.random() >= 0.5;
    let j = i + 3;
    data.push({
      _id: j,
      isFolder: randomBool,
      name: randomBool ? 'Folder ' + (i + 1) : 'Tag ' + j,
    });

    // Fill folders array
    if (data[i].isFolder) {
      folders.push(data[i]);
    }
  }

  // Populate tags with parent key and value pair afterwards for more diverse parent folders
  for (let x = 2; x < data.length; x++) {
    let randomFolder = Math.floor(Math.random() * (folders.length));
    let instance = data[x];
    instance['parent'] = folders[randomFolder].name;
  }
  return data;
}

// 250 random folders/tags
let data = generateTags(250);

export default data;
