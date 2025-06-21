class ChessAiDB {
    constructor (filepath) {
        this.filepath = filepath;
        this.tree = new Node();
        this.activate();
    }

    find(pgn) {
        if (!pgn || pgn.length == 0) {
            return []
        }
        return this.tree.getPlayableMoves(pgn);
    }

    findBest(pgn) {
        if (!pgn || pgn.length == 0) {
            return []
        }
        return this.tree.getBestMove(pgn);
    }

    getFile() {
        return this.filepath;
    }

    setFile(filepath) {
        this.filepath = filepath;
    }

    print() {
        this.tree.printTree();
    }

    async #fileToPgnArray() {

        try {
            const response = await fetch(this.filepath);
            var x = (await response.text()).split('\n');
            return x;
        } catch (error) {
            console.error("Error loading file:", error);
            return []
        }

        // try {
        //     return readFileSync(this.filepath, 'utf-8').split('\n');
        // }
        // catch (err) {
        //     console.log("Error reading file: ", err);
        //     return []
        // }
    }

    #pgnToMoveArray(pgn) {
        var x = pgn.replace(/\d+\.\s*/g, '').split(' ').filter(move => move.trim() !== '');
        return x;
    }

    async activate() {
        var arrayOfPgns = await this.#fileToPgnArray(this.filepath);
        for (let aPgn of arrayOfPgns) {
            var moveArray = this.#pgnToMoveArray(aPgn);
            this.tree.insertPgn(moveArray);
        }
    }
}

class Node {
    constructor (move) {
        this.value = move ? move : "start";
        this.count = 1;
        this.children = []; // list of nodes
    }

    addChild(move) {
        const node = new Node(move);
        this.children.push(node);
        return node;
    }

    isGameEnd(move) {
        const regex = /\d+\s*-\s*\d+/;
        return regex.test(move);
    }

    findMove(move) {
        for (let child of this.children) {
            if (child.value == move) {
                return [true, child];
            }
        }
        return [false, null];
    }

    getPlayableMoves(pgn) {
        if (pgn.length == 0) return [];

        var [found, child] = this.findMove(pgn[0]);
        if (found) {
            if (pgn.length == 1) {
                var valids = [];
                for (let a of child.children) {
                    valids.push(a.value);
                }
                return valids;
            }
            else return child.getPlayableMoves(pgn.slice(1));
        }

        return [];
    }

    #weightedSample(arr) {
        const totalWeight = arr.reduce((sum, item) => sum + item[1], 0); // Sum of all weights
        let randomValue = Math.random() * totalWeight; // Generate a random number between 0 and totalWeight
      
        for (let i = 0; i < arr.length; i++) {
          randomValue -= arr[i][1]; // Subtract the weight of the current item
          if (randomValue < 0) {
            console.log("Random value: ", arr[i][0]);
            console.log("Random type: ", typeof(arr[i][0]));
            return arr[i][0]; // Return the item when the randomValue falls in its range
          }
        }
      }

    getBestMove(pgn) {
        if (pgn.length == 0) return [];
        // console.log("*** Getting best move ***");
        var [found, child] = this.findMove(pgn[0]);
        if (found) {
            if (pgn.length == 1) {
                var valids = [];
                for (let a of child.children) {
                    console.log("    Found child: ", a.value, " with count: ", a.count);
                    valids.push([a.value, a.count]);
                }
                return this.#weightedSample(valids);
            }
            else {
                return child.getBestMove(pgn.slice(1));
            }
        }
        return null;

    }

    // ALWAYS and ONLY called on the start node
    // pgn is an array of moves stripped from the pgn
    insertPgn(pgn) {
        if (pgn.length == 0) return;

        var [found, child] = this.findMove(pgn[0]);

        if (found) {
            child.count++;
        }
        else {
            child = this.addChild(pgn[0])
        }
        
        return child.insertPgn(pgn.slice(1));
    }

    printTree(indent = 0) {
        console.log(" ".repeat(indent) + `(${this.count}) ${this.value}`);

        for (let child of this.children) {
            child.printTree(indent + 2);
        }
    }
}

export default ChessAiDB;
