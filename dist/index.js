"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const index_1 = require("./algo/index");
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, cors_1.default)());
app.get("/", (req, res) => {
    res.status(200).send({
        message: "Ticket booking backend is healthy and ruuning on PORT 5003",
    });
});
app.post("/book-tickets", (req, res) => {
    try {
        const { tickets } = req.body;
        console.log("tickets from frontend ", tickets);
        let n = (0, index_1.countTotalSeatsLeft)();
        console.log("number of seats ", n);
        const numberOfTickets = Number(tickets);
        if (tickets > n || tickets > 7) {
            res.status(201).send({
                success: true,
                seatsLeft: n,
                i: -1,
                j: -1,
            });
            return;
        }
        else {
            n = n - tickets;
        }
        const { i, j } = (0, index_1.findSeats)(numberOfTickets);
        console.log("i ", i);
        console.log("j ", i);
        for (let i = 0; i < 12; i++) {
            console.log(index_1.seats[i], " ");
        }
        if (i == -1) {
            res.status(201).send({
                success: false,
                seatsLeft: n,
                i: i,
                j: j,
            });
            return;
        }
        else {
            res.status(201).send({
                success: true,
                seatsLeft: n,
                i: i,
                j: j,
            });
            return;
        }
    }
    catch (error) { }
});
app.listen(5003, () => {
    console.log("server is running on PORT 5003");
});
