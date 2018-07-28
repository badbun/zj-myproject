Date.prototype.format = function (format = 'yyyyMMdd') {
  const o = {
    'M+': this.getMonth() + 1,
    'd+': this.getDate(),
    'h+': this.getHours(),
    'm+': this.getMinutes(),
    's+': this.getSeconds(),
    'q+': Math.floor((this.getMonth() + 3) / 3),
    S: this.getMilliseconds(),
  };

  let str = format;

  if (/(y+)/.test(format)) {
    str = str.replace(RegExp.$1, `${this.getFullYear()}`.substr(4 - RegExp.$1.length));
  }

  Object.entries(o).forEach(([k, v]) => {
    if (new RegExp(`(${k})`).test(str)) {
      str = str.replace(RegExp.$1, RegExp.$1.length === 1 ? v : `00${v}`.substr(`${v}`.length));
    }
  });

  return str;
};

Date.prototype.toJSON = function () {
  return this.format();
};

/**
 * 获取当前月第一天
 * @returns {Date}
 */
Date.prototype.getFirstDayOfMonth = function () {
  this.setDate(1);
  return this;
};

/**
 * 获取上个月第一天
 * @returns {Date}
 */
Date.prototype.getFirstDayOfPreMonth = function () {
  this.setDate(1);
  this.setMonth(this.getMonth() - 1);
  return this;
};

/**
 * 获取上个月最后一天
 * @returns {Date}
 */
Date.prototype.getLastDayOfPreMonth = function () {
  this.setDate(0);
  return this;
};


/**
 * 获取当前月最后一天
 * @return {Date}
 */
Date.prototype.getLastDayOfMonth = function () {
  this.setMonth(this.getMonth() + 1);
  this.setDate(0);
  return this;
};


/**
 * 数字转千分位金额
 * @param prefix 前缀，如¥
 * @param digit 小数位数，默认不处理，设置后根据值处理小数位数
 * @returns {string}
 */
String.prototype.toMoney = function (prefix = '', digit, emptyText = '') {
  let val = this;
  if (val === '' || isNaN(val)) {
    return emptyText;
  }

  const re = /^(-?\d+)(\d{3})(\.?\d*)/;
  if (digit) {
    val = (val * 1).toFixed(digit);
  }
  while (re.test(val)) {
    val = val.replace(re, '$1,$2$3');
  }

  return prefix + val;
};

const getValueByPath = function (obj, prop) {
  prop = prop || '';
  const paths = prop.split('.');
  let result = Object.assign({}, obj);
  if (!obj) {
    return null;
  }
  paths.forEach(path => {
    result = result[path];
  });

  return result;
};

/* eslint no-extend-native:off */
Array.prototype.sortByOrder = function (sortField, sortOrder, sortMethod) {
  if (!sortField) {
    return this;
  }

  const order = sortOrder === 'descending' ? -1 : 1;

  return this.slice().sort((a, b) => {
    if (sortMethod) {
      return sortMethod(a, b) ? order : -order;
    }
    if (sortField !== '$key') {
      if (typeof a === 'object' && '$value' in a) a = a.$value;
      if (typeof b === 'object' && '$value' in b) b = b.$value;
    }
    a = typeof a === 'object' ? getValueByPath(a, sortField) : a;
    b = typeof b === 'object' ? getValueByPath(b, sortField) : b;

    if (a == b) {
      return 0;
    }

    if (a === '' || a === null) {
      return -order;
    }

    if (b === '' || b === null) {
      return order;
    }

    return a > b ? order : -order;
  });
};
/**
 * 少于10补0
 * @param num
 * @returns {string}
 */
export default function prefixZero(num) {
  return num >= 10 ? num : `0${num}`;
}
