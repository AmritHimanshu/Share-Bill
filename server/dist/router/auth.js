"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const authenticate = require('../middleware/authenticate');
const bcrypt = require('bcryptjs');
const cookie_parser_1 = __importDefault(require("cookie-parser"));
router.use((0, cookie_parser_1.default)());
const User = require('../model/userSchema');
const Bill = require('../model/billSchema');
router.post('/register', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, email, phone, password, cpassword } = req.body;
    if (!name || !email || !phone || !password || !cpassword) {
        return res.status(422).json({ erro: "Fill all the fields" });
    }
    if (password !== cpassword) {
        return res.status(422).json({ error: "Password and confirm password not matched" });
    }
    try {
        const emailExist = yield User.findOne({ email: email });
        if (emailExist) {
            return res.status(422).json({ error: "Email id already registered" });
        }
        else {
            const user = new User({ name, email, phone, password });
            const userRegister = yield user.save();
            if (userRegister) {
                return res.status(200).json({ message: "User registered successfully" });
            }
        }
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ error: "Internal server error" });
    }
}));
router.post('/signin', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(422).json({ error: "Fill all the fields" });
    }
    try {
        const userExist = yield User.findOne({ email: email });
        if (userExist) {
            const isMatch = yield bcrypt.compare(password, userExist.password);
            const Token = yield userExist.generateAuthToken();
            res.cookie("jwtoken", Token, {
                expires: new Date(Date.now() + 25892000000),
                httpOnly: true,
                secure: true, // Mark as secure if using HTTPS
                sameSite: 'none', // Set SameSite attribute for cross-origin requests
                path: '/',
            });
            if (isMatch) {
                res.status(200).json(userExist);
            }
            else {
                res.status(400).json({ error: "Invalid Credentials" });
            }
        }
        else {
            res.status(400).json({ error: "Invalid Credentials" });
        }
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ error: "Internal server error" });
    }
}));
router.post('/createBill', authenticate, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { title, memberNames } = req.body;
    try {
        if (!Array.isArray(memberNames) || !memberNames.every((name) => typeof name === 'string')) {
            throw new Error('Invalid memberNames data');
        }
        const newBill = new Bill({
            title: title,
            members: memberNames.map(memberName => ({ member: { name: memberName } })),
            createdBy: req.userID
        });
        const savedBill = yield newBill.save();
        res.status(200).json(savedBill);
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ error: "Internal server error" });
    }
}));
router.get('/getBill', authenticate, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const bills = yield Bill.find({ createdBy: req.userID }).select("-members").sort("-date");
        res.status(200).json(bills);
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ error: "Internal server error" });
    }
}));
router.get('/getBillData/:billId', authenticate, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const bill = yield Bill.findOne({ _id: req.params.billId });
        if (!bill) {
            return res.status(422).json({ error: "Bill not found" });
        }
        res.status(200).json(bill);
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ error: "Internal server error" });
    }
}));
router.put('/addAmount/:billId', authenticate, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { billId } = req.params;
        // selectedMember is the id of the member
        const { selectedMember, inputAmount } = req.body;
        const existingBill = yield Bill.findOne({ "_id": billId, "members._id": selectedMember });
        if (!existingBill) {
            return res.status(404).json({ error: "Bill not found" });
        }
        const memberIndex = existingBill.members.findIndex((member) => member._id.toString() === selectedMember);
        if (memberIndex === -1) {
            return res.status(404).json({ error: "Member not found in the bill" });
        }
        const parsedTotalSpends = parseFloat(existingBill.members[memberIndex].member.totalSpends);
        const inputAmountNumber = parseFloat(inputAmount);
        const newTotalSpends = (parsedTotalSpends + inputAmountNumber).toString();
        const bill = yield Bill.findOneAndUpdate({ "_id": billId, "members._id": selectedMember }, { $set: { "members.$.member.totalSpends": newTotalSpends } }, { new: true });
        if (!bill) {
            return res.status(404).json({ error: "Bill not found" });
        }
        else {
            return res.status(200).json(bill);
        }
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ error: "Internal server error" });
    }
}));
router.get('/user', authenticate, (req, res) => {
    res.status(200).send(req.rootUser);
});
router.get('/logout', (req, res) => {
    res.clearCookie('jwtoken', { path: '/' });
    res.status(200).json({ message: 'User Logout' });
});
router.get('/', (req, res) => {
    res.status(200).send({ message: "This is from Auth.js" });
});
module.exports = router;
