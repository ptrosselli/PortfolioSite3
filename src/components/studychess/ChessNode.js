class ChessNode {
    constructor(move) {
        this.move = move;
        this.responses = [];
    }

    init() {
        this.addLine(this.lineToArray("1. e4 e5 2. f4 exf4 3. Nf3 g5 4. h4 g4 5. Ne5 Nf6 6. d4 d6 7. Nd3 Nxe4 8. Bxf4 Qe7 9. Be2 Nc6 10. c3 Bf5 11. d5 Nb8"));
        this.addLine(this.lineToArray("1. e4 e5 2. f4 exf4 3. Nf3 g5 4. h4 g4 5. Ne5 Bg7 6. d4 Nf6 7. Nxg4 Nxe4 8. Nc3 d5 9. Bxf4 O-O 10. Nxe4 dxe4 11. Nh6+ Kh8"));
        this.addLine(this.lineToArray("1. e4 e5 2. f4 exf4 3. Nf3 g5 4. h4 g4 5. Ne5 Nf6 6. d4 d6 7. Nd3 Nxe4 8. Bxf4 Qe7 9. Be2 Nc6 10. c3 Bf5 11. d5 Nb8"));
        this.addLine(this.lineToArray("1. e4 e5 2. f4 exf4 3. Nf3 g5 4. h4 g4 5. Ne5 Bg7 6. d4 Nf6 7. Nxg4 Nxe4 8. Nc3 d5 9. Bxf4 O-O 10. Nxe4 dxe4 11. Nh6+ Kh8"));
        this.addLine(this.lineToArray("1. e4 e5 2. f4 exf4 3. Nf3 g5 4. h4 g4 5. Ne5 d6 6. Nxg4 Nf6 7. Nxf6+ Qxf6 8. Nc3 Nc6 9. Bb5 Kd8 10. Bxc6 bxc6 11. d3 Rg8"));
        this.addLine(this.lineToArray("1. e4 e5 2. f4 exf4 3. Nf3 g5 4. Bc4 Bg7 5. h4 h6 6. d4 d6 7. c3 Nc6 8. O-O Bg4 9. Qb3 Na5 10. Bxf7+ Kf8 11. Qa4 Kxf7"));
        this.addLine(this.lineToArray("1. e4 e5 2. f4 exf4 3. Nf3 g5 4. Bc4 Bg7 5. O-O h6 6. d4 d6 7. c3 Nc6 8. b4 Nf6 9. Qb3 O-O 10. Nbd2 Qe7 11. Bd3 Bg4"));
        this.addLine(this.lineToArray("1. e4 e5 2. f4 exf4 3. Nf3 g5 4. Bc4 g4 5. O-O gxf3 6. Qxf3 Qf6 7. e5 Qxe5 8. d3 Bh6 9. Nc3 Ne7 10. Bd2 Nbc6 11. Rae1 Qf5"));
        this.addLine(this.lineToArray("1. e4 e5 2. Nf3 Nc6 3. Bc4 Bc5 4. c3 Nf6 5. d4 exd4 6. cxd4 Bb4+ 7. Bd2 Bxd2+ 8. Nbxd2 d5 9. exd5 Nxd5 10. Qb3 Na5 11. Qa4+ Nc6 12. Bb5 Qe7+ 13. Ne5 Bd7"));
    }

    isRoot() {
        return this.move === "start";
    }

    responsesToArray() {
        const ret = [];
        for (let cnode of this.responses) {
            ret.push(cnode.move);
        }
        return ret
    }

    // Turn a string line to an array of moves
    lineToArray(stringLine) {
        const ret = [];
        const tokens = stringLine.split(" ");
        for (const token of tokens) {
            if (!/^\d+\.$/.test(token)) { // Exclude move numbers
                ret.push(token);
            }
        }
        return ret;
    }

    addLine(line) {
        for (let cnode of this.responses) {
            if (cnode.move === line[0]) {
                cnode.addLine(line.slice(1));
                return;
            }
        }

        const newNode = new ChessNode(line[0]);
        this.responses.push(newNode);

        if (line.length > 1) {
            newNode.addLine(line.slice(1));
        }
    }

    getRandomElement(arr) {
        const randomIndex = Math.floor(Math.random() * arr.length); // Generate random index
        return arr[randomIndex]; // Return the element at that index
    }

    getLineRandom(depth, arr) {
        const ret = this.getRandomElement(this.responses); // Get a random response
        arr.push(ret.move); // Add the move to the array

        if (depth === 0) {
            return [ret.responsesToArray(), arr]; // Return the move and array if depth is 0
        }

        // Recurse and return the result of the recursive call
        return ret.getLineRandom(depth - 1, arr);
    }

    printTree(level = 0) {
        let indent = ' '.repeat(level * 2);
        console.log(`${indent}${this.move}`);
        for (let cnode of this.responses) {
            cnode.printTree(level + 1);
        }
    }
}

export default ChessNode;
