pragma circom  2.0.0;

include "../node_modules/circomlib/circuits/pedersen.circom";

template CommitmentGenerator () {   
    signal input nullifier[256]; 
    signal input secret[256]; 
    signal output commitment;
    signal output nullifierHash;

    component commitmentHasher = Pedersen(512);
    component nullifierHasher = Pedersen(256);
    
    for (var i = 0; i < 256; i++) {
        nullifierHasher.in[i] <== nullifier[i];
        commitmentHasher.in[i] <== secret[i];
        commitmentHasher.in[i + 256] <== nullifier[i];
    }

    commitment <== commitmentHasher.out[0];
    nullifierHash <== nullifierHasher.out[0];
}