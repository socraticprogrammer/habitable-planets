import { createReadStream } from "fs";
import { parse } from "csv-parse";

const records = [];

createReadStream("kepler_data.csv")
  .pipe(
    parse({
      columns: true,
      comment: "#",
    })
  )
  .on("data", (chunk) => {
    records.push(chunk);
  })
  .on("error", (err) => {
    console.error(err);
  })
  .on("end", () => {
    console.info("There will be no more data.");
    console.log(records);
  });
