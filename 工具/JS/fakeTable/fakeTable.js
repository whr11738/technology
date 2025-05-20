// 前端实现本地表格分页查询和增删改查功能，示例页面看隔壁index.vue

const { __ } = document;

// 取 获取本地数组
export const getdata = () => {
  const data = [
    { id: __.getRandom(8), name: '术语1' },
    { id: __.getRandom(8), name: '术语2' },
    { id: __.getRandom(8), name: '术语3' },
    { id: __.getRandom(8), name: '术语4' },
    { id: __.getRandom(8), name: '术语5' },
    { id: __.getRandom(8), name: '术语6' },
    { id: __.getRandom(8), name: '术语7' },
    { id: __.getRandom(8), name: '术语8' },
    { id: __.getRandom(8), name: '术语9' },
    { id: __.getRandom(8), name: '术语10' },
    { id: __.getRandom(8), name: '术语11' },
  ];
  const fakeData = __.storage.get('fakeData');
  if (!fakeData) setData(data);
  return __.storage.get('fakeData');
};
// 存 更新本地数组
export const setData = (arr) => __.storage.set('fakeData', arr);
/*
  增 item插入到数组前面，示例 changeData({ id: __.getRandom(8), name: 'name' }, 'add');
  删 依据item中id删除，示例 changeData({ id: 12345678 }, 'del')
  改 依据item中id更新数组中对应条目，示例 changeData({ id: 12345678, name: 'name' }, 'edit');
*/
export const changeData = (item, type) => {
  const fakeData = getdata();
  if (type == 'add') fakeData.unshift(item);
  if (type == 'del') __.arrDelItem(fakeData, 'id', item.id);
  if (type == 'edit') fakeData[__.arrFindIndex(fakeData, 'id', item.id)] = { ...fakeData[__.arrFindIndex(fakeData, 'id', item.id)], ...item };
  setData(fakeData);
  // getList();// 刷新页面表格
};
// 查 从本地数组分页查询
export const searchData = (pageNo = 1, pageSize = 10) => {
  const fakeData = getdata();
  const res = {};
  const start = (pageNo - 1) * pageSize;
  const end = (pageNo - 1) * pageSize + 9;
  res.data = __.arrSlice(fakeData, start, end);
  res.total = fakeData.length;
  return res;
};
