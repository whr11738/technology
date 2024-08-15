// 权限配置表
export const config = {
  // 0x000001 0x000002 0x000003 0x000004 0x000005 0x000006 0x000007 0x000008 0x000009 0x00000A 0x00000B 0x00000C 0x00000D 0x00000E 0x00000F 0x000010
  firstMenu: {
    // 账号管理
    account: 0x000001,
    // 设备列表
    equipment: 0x000002,
  },
  // 0x000001 0x000002 0x000003 0x000004 0x000005 0x000006 0x000007 0x000008 0x000009 0x00000A 0x00000B 0x00000C 0x00000D 0x00000E 0x00000F 0x000010
  secondMenu: {
    // 账号列表
    account_list: 0x000001,
    // 账号权限
    account_permission: 0x000002,
    // 设备列表
    equipment_list: 0x000001,
  },
  // 0x000001 0x000002 0x000004 0x000008 0x000010 0x000020 0x000040 0x000080 0x000100 0x000200 0x000400 0x000800 0x001000
  module: {
    // 查询
    search: 0x000100,
    // 新建
    crate: 0x000200,
    // 编辑
    edit: 0x000400,
    // 删除
    delete: 0x000800,
  },
};
// 权限树
const tree = [
  // 账号管理
  {
    i18n: "账号管理",
    val: config.firstMenu.account,
    checked: false,
    id: 1,
    child: [
      // 账号列表
      {
        i18n: "账号列表",
        val: config.secondMenu.account_list,
        checked: false,
        id: 1,
      },
      // 账号权限
      {
        i18n: "账号权限",
        val: config.secondMenu.account_permission,
        checked: false,
        id: 2,
        child: [
          {
            // 查询
            i18n: "查询",
            val: config.module.search,
            checked: false,
            id: 1,
            level: [0],
          },
        ],
      },
    ],
  },
  // 设备管理
  {
    i18n: "设备管理",
    val: config.firstMenu.equipment,
    checked: false,
    id: 2,
    child: [
      // 设备列表
      {
        i18n: "设备列表",
        val: config.secondMenu.equipment_list,
        checked: false,
        id: 1,
        child: [
          {
            // 查询
            i18n: "查询",
            val: config.module.search,
            checked: false,
            id: 1,
          },
          {
            // 新建
            i18n: "新建",
            val: config.module.crate,
            checked: false,
            id: 2,
          },
          {
            // 编辑
            i18n: "编辑",
            val: config.module.edit,
            checked: false,
            id: 3,
          },
          {
            // 删除
            i18n: "删除",
            val: config.module.delete,
            checked: false,
            id: 4,
          },
        ],
      },
    ],
  },
];
// 初始化权限树并返回
export const getTree = () => {
  // 过滤权限树  level: [0, 1] 代表 level 为 0 或 level 为 1 就展示权限设置选项
  const level = 0; //权限等级 需要设置
  const filterTree = (data) => {
    const newTree = data.filter((x) => {
      return !x.level || (x.level.length > 0 && x.level.indexOf(level) != -1);
    });
    newTree.forEach((x) => x.child && (x.child = filterTree(x.child)));
    return newTree;
  };

  // 节点修改相关
  tree.forEach((first) => {
    first.acs = first.val;
    const id1 = first.id.toString();
    first.id = id1;
    if (first.child && first.child.length > 0) {
      first.child.forEach((second) => {
        second.acs = second.val;
        const id2 = `${id1}-${second.id.toString()}`;
        second.id = id2;
        if (second.child && second.child.length > 0) {
          second.child.forEach((third) => {
            third.acs = third.val;
            const id3 = `${id2}-${third.id.toString()}`;
            third.id = id3;
          });
        }
      });
    }
  });

  const RES = filterTree(tree);
  return RES;
};
// 权限加密
export const encryption = (model) => {
  // 十进制转指定宽度十六进制字符串，可添加前缀。
  const int2hex = (num, width, prefix) => {
    const hex = "0123456789abcdef";
    let s = "";
    while (num) {
      s = hex.charAt(num % 16) + s;
      num = Math.floor(num / 16);
    }
    if (typeof width === "undefined" || width <= s.length) return prefix + s;
    let delta = width - s.length;
    let padding = "";
    while (delta-- > 0) {
      padding += "0";
    }
    return prefix + padding + s;
  };
  const permission = [];
  for (let i = 0; i < model.length; i++) {
    const first = model[i];
    if (first.checked && first.child) {
      const firstVal = first.val;
      for (let j = 0; j < first.child.length; j++) {
        const second = first.child[j];
        if (second.checked) {
          const secondVal = second.val;
          let data = 0;
          if (second.child) {
            for (let k = 0; k < second.child.length; k++) {
              const third = second.child[k];
              if (third.checked) {
                data += third.val;
              }
            }
          }
          const hex = `${int2hex(firstVal, 2, "")}${int2hex(secondVal, 2, "")}${int2hex(data, 8, "")}`;
          permission.push(hex);
        }
      }
    }
  }
  return permission;
};
// 权限解密
export const decryption = (pms) => {
  const Res = {};
  pms.forEach((item) => {
    const first = parseInt("0x" + item.substring(0, 2));
    const second = parseInt("0x" + item.substring(2, 4));
    const third = item.substring(4, item.length);
    if (!Res[first]) Res[first] = {};
    if (!Res[first][second]) Res[first][second] = parseInt("0x" + third);
  });
  return Res;
};
// 判断是否有权限
export const hasPermission = (pmsList = [], current = []) => {
  const pmObj = decryption(pmsList);
  const first = parseInt(current[0] || 0);
  const second = parseInt(current[1] || 0);
  const third = parseInt(current[2] || 0);
  let isHasPm = false;
  if (current.length === 1) isHasPm = pmObj[first] !== undefined;
  else if (current.length === 2) isHasPm = pmObj[first] !== undefined && pmObj[first][second] !== undefined;
  else if (current.length === 3) isHasPm = !!(pmObj[first] !== undefined && pmObj[first][second] !== undefined && pmObj[first][second] & third);
  return !!isHasPm;
};
