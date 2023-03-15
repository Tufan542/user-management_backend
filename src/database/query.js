const db = require("./db.pool.js");
const getConditionString = require("../utils/getConditionString.js");
const Errors = require("../utils/exceptions/index.js");

class Model {
  constructor(table) {
    this.table = table;
  }

  select = (str) => {
    if (!this?.data || !str) return this;
    str = str.trim()
    const selectArr = str.split(" ").map((str) => str.toLowerCase());
    let include = [];
    let exclude = [];
    for (const sel of selectArr) {
      if (sel.startsWith("-")) {
        const str = sel.replace("-", "");
        exclude.push(str);
      } else {
        include.push(sel);
      }
    }
    if (Array.isArray(this.data)) {
      this.data = this.data.map((item) => {
        return Object.keys(item).reduce((acc, curr) => {
          if (include.length) {
            if (include.includes(curr) && !exclude.includes(curr)) {
              acc[curr] = item[curr];
            }
          } else {
            if (!exclude.includes(curr)) {
              acc[curr] = item[curr];
            }
          }
          return acc;
        }, {});
      });
    } else {
      this.data = Object.keys(this.data).reduce((acc, curr) => {
        if (include.length) {
          if (include.includes(curr) && !exclude.includes(curr)) {
            acc[curr] = this.data[curr];
          }
        } else {
          if (!exclude.includes(curr)) {
            acc[curr] = this.data[curr];
          }
        }
        return acc;
      }, {});
    }
    return this;
  };

  create = async (payload) => {
    const keys = Object.keys(payload).join(",");
    const values = Object.values(payload)
      .map((v) => {
        if (typeof v === "string") return `'${v}'`;
        return v;
      })
      .join(",");
    const queryStr = `INSERT INTO ${this.table} (${keys}) VALUES (${values}) RETURNING *`;
    const result = await db.query(queryStr);
    this.data = result.rows[0];
    return this;
  };

  find = async (payload) => {
    let queryStr = "";
    if (!payload || !Object.keys(payload).length)
      queryStr = `SELECT * FROM ${this.table}`;
    else {
      const conditionString = getConditionString(payload);
      queryStr = `SELECT * FROM ${this.table} WHERE ${conditionString}`;
    }
    const result = await db.query(queryStr);
    this.data = result.rows;
    return this;
  };

  findOne = async (payload) => {
    let queryStr = "";
    if (!payload || !Object.keys(payload).length)
      queryStr = `SELECT * FROM ${this.table} LIMIT 1`;
    else {
      const conditionString = getConditionString(payload);
      queryStr = `SELECT * FROM ${this.table} WHERE ${conditionString} LIMIT 1`;
    }
    const result = await db.query(queryStr);
    this.data = result.rows[0];
    return this;
  };

  findOneAndUpdate = async (searchOptions, updatePayload) => {
    if (!searchOptions || !Object.keys(searchOptions).length) {
      throw new Errors.NotFound("user not found");
    }
    let queryStr = "";
    const searchStr = getConditionString(searchOptions);
    if (!updatePayload || !Object.keys(searchOptions).length) {
      queryStr = `SELECT * FROM ${this.table} WHERE ${searchStr} LIMIT 1`;
    } else {
      const updateStr = getConditionString(updatePayload, ", ");
      queryStr = `UPDATE ${this.table} SET ${updateStr} WHERE ${searchStr} RETURNING *`;
    }
    const result = await db.query(queryStr);
    this.data = result.rows[0];
    return this;
  };
}

module.exports = Model;