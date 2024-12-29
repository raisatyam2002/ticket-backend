import express, { Request, Response } from "express";
import cors from "cors";
import { countTotalSeatsLeft, findSeats, seats } from "./algo/index";
const app = express();
app.use(express.json());
app.use(cors());
app.get("/", (req: Request, res: Response) => {
  res.status(200).send({
    message: "Ticket booking backend is healthy and ruuning on PORT 5003",
  });
});

app.post("/book-tickets", (req, res) => {
  try {
    const { tickets } = req.body;
    console.log("tickets from frontend ", tickets);
    let n = countTotalSeatsLeft();
    console.log("number of seats ", n);
    const numberOfTickets = Number(tickets);
    if (tickets > n || tickets > 7) {
      res.status(201).send({
        success: false,
        seatsLeft: n,
        i: -1,
        j: -1,
      });
      return;
    } else {
      n = n - tickets;
    }
    const { i, j } = findSeats(numberOfTickets);
    console.log("i ", i);
    console.log("j ", i);
    for (let i = 0; i < 12; i++) {
      console.log(seats[i], " ");
    }
    if (i == -1) {
      res.status(201).send({
        success: false,
        seatsLeft: n,
        i: i,
        j: j,
      });
      return;
    } else {
      res.status(201).send({
        success: true,
        seatsLeft: n,
        i: i,
        j: j,
      });
      return;
    }
  } catch (error) {}
});
app.listen(5003, () => {
  console.log("server is running on PORT 5003");
});
