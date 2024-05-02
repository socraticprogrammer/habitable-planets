import { createReadStream } from "fs";
import csvParser from "csv-parser";
const { parser } = csvParser;

const records = [];

const stream = createReadStream("kepler_data.csv");

stream.on("data", (chunk) => {
  records.push(chunk);
});

stream.on("error", (err) => {
  console.error(err);
});

stream.on("end", () => {
  console.info("There will be no more data.");
  console.log(records);
});
