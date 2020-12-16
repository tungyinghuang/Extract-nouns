var lines
var st
var sentances=[]
let goodSentences=[]
var myRiString
var s
var lexicon
let output 
let x=0


function preload(){
	lines=loadStrings('pp.txt')
	img=loadImage('flower.png')
}

function setup() {
	
  createCanvas(windowWidth, windowHeight);
	
	let st=join(lines, ' ')
  sentences=RiTa.splitSentences(st)
	output =''
  lexicon = new RiLexicon()
	
	x=random(width)
	
	
	let noAdd = false;
	for (let i=0; i<sentences.length; i++) {
		if (noAdd) {
			noAdd = false;
			continue;
		}
		let nextSentence = sentences[i+1]; //BUG If we're at the end of the array.
		let sentence = sentences[i];
		if (sentence.endsWith("Mr.") ||  sentence.endsWith("Mrs.")) {
			let goodSentence = sentence + " " + nextSentence;
			goodSentences.push(goodSentence);
			noAdd = true;
		} else {
			goodSentences.push(sentence);
		}
		
	}
	ps=random(goodSentences)
	//console.log(goodSentences);
	
	
	
}
function draw(){
	
	background(0)
	fill(255)
	
	for(let j=0;j<height/3;j+=30){
		printSentence(j)
	}
	for(let j=height;j>height*0.66;j-=30){
		printSentence(j)
	}
	replaceNouns()

}

function replaceNouns() {
	
	
	let s = RiString(ps);
	let words = s.words();
	let pos = s.pos(); // Convert the string into parts of speech.
	console.log(s)

	
	for (var i=0; i<pos.length; i++) {
		if (pos[i] === 'nn') {
			
			output += RiTa.pluralize(lexicon.randomWord('nn')); // Pick a random noun and make it pluralized...
		} else if (pos[i].startsWith('nn')) { 
			output += lexicon.randomWord(pos[i]); // Make sure we replace with the same part of speech.
			} else {
				// Otherwise, keep the word.
					output += words[i];
				}

			output += " "; // Add an empty space after each word.
			
	  }
}

function printSentence(y){
	fill(255)
	textAlign(CENTER)
	let sWidth = textWidth(ps)
	let mid = ps.length/2
	let part1 = ps.substring(0, mid)
	let part2=	ps.substring(mid)
//newline
	// if(sWidth>width*0.8){
	// 	textSize(15)
	// text(part1,width/2,height/2)
	// 	text(part2,width/2,height/2+30)
	// }else{
	// 	textSize(20)
	// 	text(ps,width/2,height/2)
	// }
	textAlign(CENTER)
	text(ps, width/2-300,height/2-20, width/1.5, height/3)
//mark jj
		
	let s = RiString(ps);
	let words = s.words();
	let pos = s.pos(); // Convert the string into parts of speech.
	console.log(s)
  let n=width/3
	
	for (var i=0; i<pos.length; i++) {
		
		if (pos[i] === 'nn') {
			fill(255,0,0)
			text(words[i],n,height*0.4)
			n+=100
		}
	}
		
	  fill(255,80)
   	textSize(20)
		textAlign(LEFT)
		text(output,x,y)
		x-=0.5
}

function mousePressed(){
	let st=join(lines, ' ')
  sentences=RiTa.splitSentences(st)
	output =''
  lexicon = new RiLexicon()
	
	x=random(width)
	
	
	let noAdd = false;
	for (let i=0; i<sentences.length; i++) {
		if (noAdd) {
			noAdd = false;
			continue;
		}
		let nextSentence = sentences[i+1]; //BUG If we're at the end of the array.
		let sentence = sentences[i];
		if (sentence.endsWith("Mr.") ||  sentence.endsWith("Mrs.")) {
			let goodSentence = sentence + " " + nextSentence;
			goodSentences.push(goodSentence);
			noAdd = true;
		} else {
			goodSentences.push(sentence);
		}		
	}
	ps=random(goodSentences)
}
