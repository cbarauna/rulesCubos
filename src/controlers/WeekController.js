const _ = require("lodash");
let file = "./src/files/week.json";
const moment = require("moment");
const fs = require("fs");
const Utils = require("../utils/Utils");

module.exports = {
  index(req, res) {
    fs.readFile(file, "utf-8", (err, data) => {
      if (err) {
        if (err.code === "ENOENT") {
          res.send("Não há nenhuma regra criada");
          return;
        }
        throw err;
      }
      if (!!data && req.query.day) {
        res.send(_.filter(JSON.parse(data), { day: req.query.day }));
      } else {
        res.send(_.orderBy(JSON.parse(data), ["day"], ["asc"]));
      }
    });
  },

  create(req, res) {
    console.log(moment(req.body.day, "dd-mm-yyyy").isValid());
    if (moment(req.body.day, "dd-mm-yyyy").isValid()) {
      fs.readFile(file, "utf-8", (err, data) => {
        if (err) {
          if (err.code === "ENOENT") {
            fs.appendFile(
              file,
              JSON.stringify(req.body),
              { enconding: "utf-8", flag: "a" },
              function(err) {
                if (err) throw err;
                console.log("Arquivo salvo!");
              }
            );
            res.send("Regra salva com sucesso!");
            return;
          }
          throw err;
        }

        if (!!data && _.isArray(JSON.parse(data))) {
          let week = JSON.parse(data);
          let dataBody = week.concat(req.body);

          fs.appendFile(
            file,
            JSON.stringify(dataBody),
            { enconding: "utf-8", flag: "w" },
            function(err) {
              if (err) throw err;
              console.log("Arquivo salvo!");
              res.send("Regra salva com sucesso!");
            }
          );
        }
      });
    } else {
      res.send("Dia semana invalido!");
    }
  },
  delete(req, res) {
    if (!!req.query) {
      fs.readFile(file, "utf-8", (err, data) => {
        if (err) {
          if (err.code === "ENOENT") {
            res.send("Não há nenhuma regra criada");
            return;
          }
          throw err;
        }
        if (!!data && _.isArray(JSON.parse(data))) {
          let weekList = JSON.parse(data);
          let dayRemoved = _.remove(weekList, week => {
            return week.day === req.query.day;
          });

          if (dayRemoved.length == 0) {
            res.send("Registro não encontrado!");
            return;
          } else {
            fs.appendFile(
              file,
              JSON.stringify(weekList),
              { enconding: "utf-8", flag: "w" },
              err => {
                if (err) throw err;
                res.send("Delete Realizado com Sucesso! ");
              }
            );
          }
        }
      });
    } else {
      res.send("Parametros não encontrado!");
    }
  },
  getAtualDay(req, res) {
    fs.readFile(file, "utf-8", (err, data) => {
      if (err) {
        if (err.code === "ENOENT") {
          res.send("Não há nenhuma regra criada");
          return;
        }
        throw err;
      }
      if (!!data && req.query.day) {
        let dataReturn = data.filter(dayWeek => {
          moment().isSame(moment().day(dayWeek.day), "day");
        });

        if (!!dataReturn && dataReturn.length > 0) {
          res.send(_.filter(JSON.parse(dataReturn)));
        } else {
          res.send("Não há nenhuma regra criada");
        }
      } else {
        res.send(_.orderBy(JSON.parse(data), ["day"], ["asc"]));
      }
    });
  }
};
