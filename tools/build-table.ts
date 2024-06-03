/**
 * Builds the table of land use codes that is present in the README.md.
 */

import { landUseCodes } from "..";
import JSDom from "jsdom";

const dom = new JSDom.JSDOM();
const document = dom.window.document;
const table = document.createElement("table");

const thead = table.createTHead();
const tr = thead.insertRow();

tr.append(
  ...["Category", "Code", "Description"].map((text) => {
    const th = document.createElement("th");
    th.textContent = text;
    return th;
  })
);

const tbody = table.createTBody();

for (const [category, items] of Object.entries(landUseCodes)) {
  let tr = tbody.insertRow();

  const th = document.createElement("th");
  th.textContent = category;
  th.rowSpan = items.length;

  tr.appendChild(th);

  for (const [i, [code, description]] of items.entries()) {
    if (i > 0) {
      tr = tbody.insertRow();
    }
    let td = tr.insertCell();
    td.append(code.toString());

    td = tr.insertCell();
    td.append(description);
  }
}

Bun.write("land-use-codes-table.html", table.outerHTML);
