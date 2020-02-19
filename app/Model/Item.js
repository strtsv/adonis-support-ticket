"use strict";

const Lucid = use("Lucid");

class Item extends Lucid {
  static boot() {
    super.boot();
  }

  static get dateFormat() {
    return "YYYY-MM-DD";
  }

  static formatDates(field, value) {
    if (field === "date_buy") {
      return value.format("YYYY-MM-DD");
    }
    return super.formatDate(field, value);
  }

  static get dates() {
    return ["created_at", "updated_at", "date_buy"];
  }
}

module.exports = Item;
