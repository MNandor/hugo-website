const ul = document.querySelectorAll("ul li");

let pacman = []
let yay = []
let pip = []

for (i=0; i<ul.length; i++){
	l = ul[i]
	namee = l.children[0].innerText

	if (l.innerText.includes("(optional)"))
		continue

	if (l.innerText.startsWith('p '))
		pacman.push(namee)
	else if (l.innerText.startsWith('y'))
		yay.push(namee)
	else if (l.innerText.startsWith('pp'))
		pip.push(namee)
}

document.write("sudo pacman -S ")
for (i=0; i<pacman.length; i++){
	document.write(pacman[i], " ")
}

document.write("<br><br>")

document.write("yay -S ")
for (i=0; i<yay.length; i++){
	document.write(yay[i], " ")
}

document.write("<br><br>")

document.write("pip3 install ")
for (i=0; i<pip.length; i++){
	document.write(pip[i], " ")
}
