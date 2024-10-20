pragma circom  2.0.0;

include "./utils/mimc5sponge.circom";
include "./commitment-generator.circom";

template Fulfill(){
    signal input root;
    signal input nullifierHash;
    signal input itemId;

    signal input commitment;
    signal input hashPairings[10];
    signal input hashDirections[10];

    // check if the public variable (submitted) nullifierHash is equal to the output 
    // from hashing secret and nullifier
    

    // checking merkle tree hash path
    component leafHashers[10];

    signal currentHash[10 + 1];

    currentHash[0] <== commitment;
    signal left[10];
    signal right[10];

    for(var i = 0; i < 10; i++){
        var d = hashDirections[i];

        leafHashers[i] = MiMC5Sponge(2);

        left[i] <== (1 - d) * currentHash[i];
        leafHashers[i].ins[0] <== left[i] + d * hashPairings[i];

        right[i] <== d * currentHash[i];
        leafHashers[i].ins[1] <== right[i] + (1 - d) * hashPairings[i];

        leafHashers[i].k <== commitment;
        currentHash[i + 1] <== leafHashers[i].o;
    }

    root === currentHash[10];


    // add itemId in the proof
    signal itemIdSquare;
    itemIdSquare <== itemId * itemId;
}

component main {public [root, nullifierHash, itemId]} = Fulfill();
