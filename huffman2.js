let fs = require('fs');
let arg = process.argv;
let inputData = fs.readFileSync(arg[2]).toString();

const node = function (letter, freq, used, father, code) {
    this.letter = letter;
    this.freq = freq;
    this.used = used;
    this.father = father;
    this.code = code;
};

let alph = new Array();
let tree = new Array();
let i = 0;

for (i = 0; i < inputData.length; i++)
    alph[inputData.charAt(i)] = 0;

for (i = 0; i < inputData.length; i++)
    alph[inputData.charAt(i)]++;

for (i in alph){
    let n = new node(i, alph[i], false, null, '');
    tree.push(n);
}

let arr = new Array();
let l = tree.length;
if (l == 1){
	tree[0].code = '0';
	arr[tree[0].letter] = tree[0].code;
}
else{
	for (let i = 0; i < l - 1; i++) {
		let length1 = inputData.length;
		let index1;
		let index2;
		for (let j = 0; j < tree.length; j++) {
			if (length1 > tree[j].freq && !tree[j].used) {
				length1 = tree[j].freq;
				index1 = j;
			}
		}
		tree[index1].used = true;
		tree[index1].father = tree.length;
		tree[index1].code = '0';
		let length2 = inputData.length;
		for (let i = 0; i < tree.length; i++) {
			if (length2 > tree[i].freq && !tree[i].used) {
				length2 = tree[i].freq;
				index2 = i;
			}
		}
		tree[index2].used = true;
		tree[index2].father = tree.length;
		tree[index2].code = '1';
		let n = new node(tree[index1].letter + tree[index2].letter, tree[index1].freq + tree[index2].freq, false, null, '')
		tree.push(n);
	}
	for (let i = 0; i < l; i++) {
		let count = i;
		arr[tree[count].letter] = '';
		while (tree[count].father) {
			arr[tree[i].letter] = tree[count].code + arr[tree[i].letter];
			count = tree[count].father;
		}
	}
}
console.log(arr);

let str = "";
for (let i = 0; i < inputData.length; i++)
	str += arr[inputData[i]] + ' ';
	
fs.writeFileSync(process.argv[3], str);

//decode
let decode = ""
let k = 0;
while (k < str.length){
    let t = "";
    while (str[k] != ' '){
        t += str[k];
        k++;
    }
    for (let j = 0; j < inputData.length; j++){
        if (t == arr[inputData[j]]){
            decode += inputData[j];
			break
        }
    }
    k++;
}
fs.writeFileSync(process.argv[4], decode);

//node huffman2.js input.txt output.txt decoded.txt