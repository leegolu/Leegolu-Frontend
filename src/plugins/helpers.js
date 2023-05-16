// outside of a Vue file
import { Dialog, Notify, copyToClipboard, date, scroll } from "quasar";

// import currencies from "app/currencies";
import loader from "src/stores/loader";

export default {
  /**
   * Substitutes the placeholders in a string with the values from the object
   * @param {String} string
   * @param {Object} data
   */
  str_subst(string, data = {}) {
    ["last_updated", "created_at", "updated_at", "date"].forEach((key) => {
      if (data[key]) {
        data[key] = date.formatDate(new Date(data[key]), "YYYY/MM/DD");
      }
    });
    console.log(string, data);
    return string.replace(/{\s*([a-zA-Z0-9_]+)\s*}/g, (match, key) => {
      return data[key] || "";
    });
  },
  /**
   * Break an array into multiple other arrays making it
   * grouped by the specified size
   * @param {Array} arr
   * @param {Number} size
   * @returns
   */
  chunk(arr, size = 2) {
    const chunkedArray = [];
    for (let i = 0; i < arr.length; i++) {
      const last = chunkedArray[chunkedArray.length - 1];
      if (!last || last.length === size) {
        chunkedArray.push([arr[i]]);
      } else {
        last.push(arr[i]);
      }
    }
    return chunkedArray;
  },

  date(d, format = "YYYY/MM/DD") {
    return date.formatDate(new Date(d), format);
  },

  /**
   * Converts seconds to MM:SS format
   * @param {String|Number} seconds
   * @returns
   * @example convertTimeMMSS(128) // $
   */
  convertTimeMMSS(seconds) {
    if (typeof seconds === "string") {
      seconds = parseInt(seconds);
    }
    let minutes = Math.floor(seconds / 60);
    seconds = seconds % 60;
    let time = `${minutes}:${seconds < 10 ? "0" + seconds : seconds}`;

    // If time contains a . remove the miliseconds
    if (time.includes(".")) {
      time = time.split(".")[0];
    }
    return time.replace(".", ":");
  },

  /**
   * Remove an item from an array
   * @param {Object|Number} item
   * @param {Array} list
   */
  pull(item, list) {
    let index;
    if (item instanceof Number) {
      index = item;
    } else {
      index = list.indexOf(item);
    }
    if (index !== -1) {
      list.splice(index, 1);
    }
    return list;
  },
  /**
   * Returns the sum of values of objects within an array based on the specified key
   * By using the dot notation you can also sum deeply nested values
   * @example sum([{price: 10}, {price: 5}], 'price')
   * @example sum([{total: {price: 10}}, {total: {price: 5}}], 'total.price')
   * @param {Array} items
   * @param {string} key
   * @returns
   */
  sum(items, key) {
    key = typeof key === "object" && key[0] ? key[1] || key[0] : key;
    return items.reduce(function (Accumulated, item) {
      key = key.includes(".") ? key.split(".") : key;
      if (typeof key === "object" && key[0] && key[1]) {
        let sum = Accumulated + Number(item[key[0]][key[1]]);
        if (item.quantity || item.qty) {
          sum = sum * (item.quantity || item.qty);
        }
        return sum;
      }
      let sum = Accumulated + Number(item[key]);
      if (item.quantity || item.qty) {
        sum = sum * (item.quantity || item.qty);
      }
      return sum;
    }, 0);
  },
  /**
   * Generate an array based on specifed range
   * @param {Number} size
   * @param {Number} startAt
   * @returns
   */
  range(size, startAt = 0) {
    if (!size) return [];

    return [...Array(size).keys()].map((i) => i + startAt);
  },
  copy(str) {
    if (typeof str !== "string") return false;

    copyToClipboard(str)
      .then(() => {
        Notify.create({
          type: "positive",
          message: "Copied to clipboard",
        });
      })
      .catch(() => {
        Notify.create({
          type: "negative",
          message: "Failed to copy",
        });
      });
  },
  tagify(string, limit = 3) {
    let tags = string.split(",");
    let more = tags.length - limit;
    if (tags.length > limit) {
      tags = tags.slice(0, limit);
      tags.push("+ " + more + " more");
    }
    return tags;
  },
  scrollToElement(el, addOffset = 0, duration = 1000) {
    const { getScrollTarget, setVerticalScrollPosition } = scroll;

    const target = getScrollTarget(el);
    const offset = el.offsetTop + addOffset;
    setVerticalScrollPosition(target, offset, duration);
  },
  /**
   *
   * @param {String} data The message to be displayed or an object with message and qdialog options
   * @param {String} status [success, error, danger, warning, alert, notice, info]
   * @param {Boolean} alert   Setting value to true will make the notification a dialog
   * @param {String | Boolean} label  You can set value to "Persistent" to remove label
   *                                  and make the dialog persistent or set to
   *                                  Boolean "false" to only remove label
   * @param {Boolean} cancel  Setting value to true will add a cancel button to the dialog
   * @returns {Boolean | Object}  Returns false if no message is provided
   */
  notify(data, status = "info", alert = false, label = "OK", cancel = false) {
    let msg =
      typeof data === "object" ? data.message || data.msg || null : data;
    status = typeof data === "object" ? data.status : status;
    alert = typeof data === "object" ? data.alert : alert;
    label = typeof data === "object" ? data.label || data.ok : label;
    cancel = typeof data === "object" ? data.cancel : cancel;

    // create a new object from data without message and status
    const options =
      typeof data === "object"
        ? Object.keys(data)
            .filter(
              (key) =>
                [
                  "message",
                  "msg",
                  "status",
                  "alert",
                  "label",
                  "cancel",
                  "onDismiss",
                ].indexOf(key) === -1
            )
            .reduce((obj, key) => {
              obj[key] = data[key];
              return obj;
            }, {})
        : {};

    if (msg === "" || !msg) {
      return false;
    }

    let tx = {
      success: {
        class: "green-1 tf-border-success",
        textColor: "green-10",
        type: "positive",
      },
      error: {
        class: "red-1 tf-border-red",
        textColor: "red-10",
        type: "negative",
      },
      danger: {
        class: "red-1 tf-border-red",
        textColor: "red-10",
        type: "negative",
      },
      warning: {
        class: "yellow-1 tf-border-yellow",
        textColor: "yellow-10",
        type: "warning",
      },
      alert: {
        class: "yellow-1 tf-border-yellow",
        textColor: "yellow-10",
        type: "warning",
      },
      notice: {
        class: "grey-1 tf-border-grey",
        textColor: "grey-8",
        type: "ongoing",
      },
      info: {
        class: "blue-1 tf-border-blue",
        textColor: "blue-10",
        type: "info",
      },
    };

    const tx_status = tx[status] ?? tx["info"];
    const ne_cancel = label !== "persistent" || cancel === false;

    if (alert === true) {
      return Dialog.create({
        ...options,
        class: `tf-rounded-4 q-pa-sm important bg-${tx_status.class} text-${tx_status.textColor}`,
        cancel:
          cancel === false /*|| label !== 'persistent'*/
            ? false
            : {
                color: ne_cancel ? "negative" : tx_status.textColor,
                "text-color": "white",
                label: "cancel",
              },
        ok:
          label === "persistent" || label === false
            ? false
            : { color: tx_status.textColor, "text-color": "white", label },
        title: options.title || (status ?? "").toUpperCase(),
        message: msg,
        persistent: label === "persistent" || options.persistent,
      });
    } else {
      if (data.timeout) {
        options.timeout = data.timeout && data.onDismiss ? 0 : data.timeout;
      }
      let notify = Notify.create({
        ...options,
        classes: ["no-shadow"],
        type: tx_status.type || status,
        message: msg,
      });

      if (data.onDismiss && typeof data.onDismiss === "function") {
        if (data.timeout !== "undefined") {
          let t = setTimeout(() => {
            data.onDismiss(notify);
            notify();
            clearTimeout(t);
          }, data.timeout);
        } else {
          data.onDismiss(notify);
        }
      }
      return notify;
    }
  },
  cartable(data) {
    let cart = this.arrayClean(data, true),
      cartable = [];
    cart.map((i) => {
      cartable.push({ item_id: i.fruit.id, qty: i.qty });
    });
    return cartable;
  },
  nlText(str, lines = 2, breaker = "<br />") {
    const splitext = this.chunk(str.split(" "), lines);
    let text = "";
    splitext.forEach((el) => {
      text += el.join(" ") + breaker;
    });

    return text;
  },
  goto(link) {
    window.location = link;
  },
  asset(url) {
    if (process.env.PREFER_ASSET === "true" && url.indexOf("http") !== -1) {
      var base_url = document.createElement("a");
      base_url.href = url;
      url = base_url.pathname.replace(/^\/|\/$/g, "");
    }
    return process.env.ASSET_URL + url;
  },
  nameFromPath(path) {
    var base_url = document.createElement("a");
    base_url.href = path;
    return base_url.pathname.replace(/\/|\.|\/$/g, "");
  },
  getPageNumber(path, key = "page") {
    if (!path || path.indexOf(key) === -1) {
      return 1;
    }
    return path.split(key + "=").pop();
  },
  /**
   * Set the loading state of a property
   *
   * @param {*} prop
   * @param {*} state
   * @param {*} ids
   */
  loadingState(prop = null, state = true, ids = null) {
    if (ids && typeof ids === "object") {
      ids.map((e) => {
        prop[e] = state;
      });
    } else {
      if (ids) {
        prop[ids] = state;
      } else {
        prop = state;
      }
    }
  },
  arrayClean(array, getObj = false) {
    let obj = JSON.parse(JSON.stringify(array));

    if (getObj === true) {
      return obj;
    }
    return Object.keys(obj).map((i) => obj[i]);
  },
  objMap(obj, func) {
    obj = JSON.parse(JSON.stringify(obj));
    let newObj = {};
    Object.keys(obj).map((key) => {
      newObj[key] = func(obj, key);
    });
    return newObj;
  },
  isEven(n) {
    if (!Number.isFinite(parseFloat(n))) return false;
    return n % 2 == 0;
  },
  isOdd(n) {
    if (!Number.isFinite(parseFloat(n))) return false;
    return Math.abs(n % 2) == 1;
  },
  money(
    amount,
    abbrev = false,
    curr = true,
    trail_zeros = false,
    getInt = false
  ) {
    if (typeof amount === "undefined" || typeof amount === null) return 0;

    const _curr = currencies.find((c) => c.cc === "NGN");
    const gs =
      curr === true || curr === "code" ? loader.bootstrap.getSettings : null;
    let currency = "USD",
      symbol = "$";
    gs.currency = _curr.cc;
    gs.currency_symbol = _curr.symbol;

    if (gs && gs.currency && curr === "code") {
      currency = gs.currency;
    }

    if (gs && gs.currency_symbol && curr === true) {
      symbol = gs.currency_symbol;
    }

    if (typeof amount === "string" || amount instanceof String) {
      amount = parseFloat(amount.replace(/[^0-9.]/gi, ""));
    }

    if (getInt === true) {
      return amount;
    }

    let parsedAmount = amount.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, "$&,");

    if (trail_zeros === false) {
      parsedAmount = parsedAmount.replace(/(\.[0-9]*?)0+/g, "");
    }

    return (
      (curr === true ? symbol : curr === "code" ? currency + " " : curr) +
      (abbrev === true ? this.intStr(amount) : parsedAmount)
    );
  },
  humanize(num, slugify) {
    if (!num) {
      return false;
    }

    if (slugify && (slugify === "-" || slugify === "_")) {
      return this.humanize(num).replace(" ", slugify).toLowerCase();
    }
    let ones = [
      "",
      "one",
      "two",
      "three",
      "four",
      "five",
      "six",
      "seven",
      "eight",
      "nine",
      "ten",
      "eleven",
      "twelve",
      "thirteen",
      "fourteen",
      "fifteen",
      "sixteen",
      "seventeen",
      "eighteen",
      "nineteen",
    ];
    let tens = [
      "",
      "",
      "twenty",
      "thirty",
      "forty",
      "fifty",
      "sixty",
      "seventy",
      "eighty",
      "ninety",
    ];

    let numString = num.toString();

    if (num < 0) throw new Error("Negative numbers are not supported.");

    if (num === 0) return "zero";

    //the case of 1 - 20
    if (num < 20) {
      return ones[num];
    }

    if (numString.length === 2) {
      return tens[numString[0]] + " " + ones[numString[1]];
    }

    //100 and more
    if (numString.length == 3) {
      if (numString[1] === "0" && numString[2] === "0")
        return ones[numString[0]] + " hundred";
      else
        return (
          ones[numString[0]] +
          " hundred and " +
          this.humanize(+(numString[1] + numString[2]), slugify)
        );
    }

    if (numString.length === 4) {
      var end = +(numString[1] + numString[2] + numString[3]);
      if (end === 0) return ones[numString[0]] + " thousand";
      if (end < 100)
        return (
          ones[numString[0]] + " thousand and " + this.humanize(end, slugify)
        );
      return ones[numString[0]] + " thousand " + this.humanize(end, slugify);
    }
  },
  intStr(num) {
    num = num.toString().replace(/[^0-9.]/g, "");
    if (num < 1000) {
      return num;
    }
    let si = [
      { v: 1e3, s: "K" },
      { v: 1e6, s: "M" },
      { v: 1e9, s: "B" },
      { v: 1e12, s: "T" },
      { v: 1e15, s: "P" },
      { v: 1e18, s: "E" },
    ];
    let index;
    for (index = si.length - 1; index > 0; index--) {
      if (num >= si[index].v) {
        break;
      }
    }
    return (
      (num / si[index].v).toFixed(2).replace(/\.0+$|(\.[0-9]*[1-9])0+$/, "$1") +
      si[index].s
    );
  },
  openFullscreen(el) {
    const elem = typeof el === "string" ? document.querySelector(el ?? "") : el;
    if (!el) {
      return false;
    }

    if (elem.requestFullscreen) {
      elem.requestFullscreen();
    } else if (elem.webkitRequestFullscreen) {
      /* Safari */
      elem.webkitRequestFullscreen();
    } else if (elem.msRequestFullscreen) {
      /* IE11 */
      elem.msRequestFullscreen();
    }
  },
};
