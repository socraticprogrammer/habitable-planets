import { createReadStream } from "fs";
import { parse } from "csv-parse";

(() => {
  console.time();
  const habitablePlanets = [];

  function isHabitablePlanet({ koi_disposition, koi_insol, koi_prad }) {
    return (
      koi_disposition === "CONFIRMED" &&
      koi_insol > 0.36 &&
      koi_insol < 1.11 &&
      koi_prad < 1.6
    );
  }

  createReadStream("kepler_data.csv")
    .pipe(
      parse({
        columns: true,
        comment: "#",
      })
    )
    .on("data", (chunk) => {
      if (isHabitablePlanet(chunk)) {
        habitablePlanets.push(chunk);
      }
    })
    .on("error", (err) => {
      console.error(err);
    })
    .on("end", () => {
      console.info(`${habitablePlanets.length} habitable planets found!`);
      console.timeEnd();
    });
})();
