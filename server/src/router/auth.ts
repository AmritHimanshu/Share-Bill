import express, { Request } from 'express';
const router = express.Router();
const authenticate = require('../middleware/authenticate');
const bcrypt = require('bcryptjs');
import cookieParser from 'cookie-parser';
router.use(cookieParser());
import { Document } from 'mongoose';

const User = require('../model/userSchema');
const Bill = require('../model/billSchema');

interface UserDocument extends Document {
    name: string;
    email: string;
    phone: string;
    profilePic: string;
    password: string;
    date: Date;
    tokens: { token: string }[];

    generateAuthToken: () => Promise<string>;
}


interface AuthenticatedRequest extends Request {
    token?: string;
    rootUser?: Document;
    userID?: string;
}


router.post('/register', async (req, res) => {
    const { name, email, phone, password, cpassword } = req.body;
    if (!name || !email || !phone || !password || !cpassword) {
        return res.status(422).json({ erro: "Fill all the fields" });
    }
    if (password !== cpassword) {
        return res.status(422).json({ error: "Password and confirm password not matched" });
    }
    try {
        const emailExist = await User.findOne({ email: email });
        if (emailExist) {
            return res.status(422).json({ error: "Email id already registered" });
        }
        else {
            const user = new User({ name, email, phone, password });
            const userRegister = await user.save();
            if (userRegister) {
                return res.status(200).json({ message: "User registered successfully" });
            }
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Internal server error" });
    }
})

router.post('/signin', async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) { return res.status(422).json({ error: "Fill all the fields" }); }
    try {
        const userExist: UserDocument | null = await User.findOne({ email: email });
        if (userExist) {
            const isMatch = await bcrypt.compare(password, userExist.password);
            const Token = await userExist.generateAuthToken();
            res.cookie("jwtoken", Token, {
                expires: new Date(Date.now() + 25892000000),
                httpOnly: true,
                secure: true,  // Mark as secure if using HTTPS
                sameSite: 'none',  // Set SameSite attribute for cross-origin requests
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
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Internal server error" });
    }
});

router.post('/createBill', authenticate, async (req: AuthenticatedRequest, res) => {
    const { title, memberNames } = req.body;
    try {
        if (!Array.isArray(memberNames) || !memberNames.every((name: unknown) => typeof name === 'string')) {
            throw new Error('Invalid memberNames data');
        }

        const newBill = new Bill({
            title: title,
            members: memberNames.map(memberName => ({ member: { name: memberName } })),
            createdBy: req.userID
        });

        const savedBill = await newBill.save();

        res.status(200).json(savedBill);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Internal server error" });
    }
});

router.get('/getBill', authenticate, async (req: AuthenticatedRequest, res) => {
    try {
        const bills = await Bill.find({ createdBy: req.userID }).select("-members").sort("-date");
        res.status(200).json(bills);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Internal server error" });
    }
});

router.get('/getBillData/:billId', authenticate, async (req: AuthenticatedRequest, res) => {
    try {
        const bill = await Bill.findOne({ _id: req.params.billId });
        if (!bill) {
            return res.status(422).json({ error: "Bill not found" });
        }

        res.status(200).json(bill);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Internal server error" });
    }
});

router.put('/addAmount/:billId', authenticate, async (req: AuthenticatedRequest, res) => {
    try {
        const { billId } = req.params;

        // selectedMember is the id of the member
        const { selectedMember, inputAmount } = req.body;

        const existingBill = await Bill.findOne({ "_id": billId, "members._id": selectedMember });

        if (!existingBill) {
            return res.status(404).json({ error: "Bill not found" });
        }

        const memberIndex = existingBill.members.findIndex((member: { _id: string }) => member._id.toString() === selectedMember);

        if (memberIndex === -1) {
            return res.status(404).json({ error: "Member not found in the bill" });
        }

        const parsedTotalSpends = parseFloat(existingBill.members[memberIndex].member.totalSpends);
        const inputAmountNumber = parseFloat(inputAmount);

        const newTotalSpends = (parsedTotalSpends + inputAmountNumber).toString();

        const bill = await Bill.findOneAndUpdate(
            { "_id": billId, "members._id": selectedMember },
            { $set: { "members.$.member.totalSpends": newTotalSpends } },
            { new: true }
        );

        if (!bill) {
            return res.status(404).json({ error: "Bill not found" });
        }
        else {
            return res.status(200).json(bill);
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Internal server error" });
    }
});

router.get('/user', authenticate, (req: AuthenticatedRequest, res) => {
    res.status(200).send(req.rootUser);
});

router.get('/logout', (req, res) => {
    res.clearCookie('jwtoken', { path: '/' });
    res.status(200).json({ message: 'User Logout' });
})


router.get('/', (req, res) => {
    res.status(200).send({ message: "This is from Auth.js" });
})

module.exports = router;