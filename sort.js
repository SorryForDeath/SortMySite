//ТУТ ВСЕ НУЖНЫЕ ПЕРЕМЕННЫЕ ЗАВОДИМ
let inputElement = document.querySelectorAll("select");
inputElement[0].onclick = function(){
	for (let i = 0; i < this.children.length; i++)
		this.children[i].style.display = ``;
	if (inputElement[1].value != 0)
		this.children[inputElement[1].value].style.display = 'none';
		if (inputElement[2].value != 0)
		this.children[inputElement[2].value].style.display = 'none';
}

inputElement[1].onclick = function(){
	for (let i = 0; i < this.children.length; i++)
		this.children[i].style.display = ``;
	if (inputElement[0].value != 0)
		this.children[inputElement[0].value].style.display = 'none';
	if (inputElement[2].value != 0)
		this.children[inputElement[2].value].style.display = 'none';
}

inputElement[2].onclick = function(){
	for (let i = 0; i < this.children.length; i++)
		this.children[i].style.display = ``;
	if (inputElement[0].value != 0)
		this.children[inputElement[0].value].style.display = 'none';
	if (inputElement[1].value != 0)
		this.children[inputElement[1].value].style.display = 'none';
}

let element = document.getElementById("buttonFilter");
let element2 = document.getElementById("buttonSort");
let s = document.getElementsByTagName(`table`);
let arrStr = [];
//ТУТ ПРОШЛИСЬ ПО ВСЕЙ ТАБЛИЦЕ И ЗАПОМНИЛИ ЕЕ В МАССИВ
let arr = s[s.length - 1].children[0].children;
let arrFinal = [];
for (let i = 0; i < arr[0].children.length; i++){
	arrStr[i] = arr[0].children[i].innerHTML;
}
for (let i = 1; i < arr.length; i++) {
	let t = {};
	for (let j = 0; j < arrStr.length; j++) {
		t[arrStr[j]] = arr[i].children[j].innerHTML;
	}
	arrFinal.push(t);
}
let arrFinalFilter = [];
for (let i = 0; i < arrFinal.length; i++)
	arrFinalFilter.push(arrFinal[i]);
//ФУНКЦИЯ ФИЛЬТРАЦИИ ПО КЛИКУ
element.onclick = function(){
	for (let i = 1; i < arr.length; i++)
		arr[i].style.display = '';
	let flag = true;
	let yearFlag = true;
	let arrNewStr = [];
	let arrInput = document.getElementsByName("filter");
	let arrFilter = [];
	for (let i = 0; i < arrInput.length - 2; i++){
		if (arrInput[i].value == '') continue;
		arrFilter.push(arrInput[i]);
		arrNewStr.push(arrStr[i]);
	}
	let min = arrInput[arrInput.length - 2].value == '' ? `Empty` : arrInput[arrInput.length - 2].value;
	let max = arrInput[arrInput.length - 1].value == '' ? `Empty` : arrInput[arrInput.length - 1].value;
	if (!(min == `Empty` && max == `Empty`)){
		if (isNaN(min) || !isFinite(min) || min < 0  || min > 2024 || !Number.isInteger(+min) || isNaN(max) || !isFinite(max) || max < 0  || max > 2024 || !Number.isInteger(+max) || min > max){
			alert(`Errors in the fields with the year`);
			return 0;
		}		
		yearFlag = false;
	}
	if (!yearFlag){
		for (let i = 1; i < arr.length; i++){
			if (+arr[i].children[arr[i].children.length - 1].innerHTML < +min || +arr[i].children[arr[i].children.length - 1].innerHTML > +max)
				arr[i].style.display = `none`;
		}
	}
	for (let i = 1; i < arr.length; i++){
		for (let j = 0; j < arrFilter.length; j++){
			if (!(arrFinal[i - 1][arrNewStr[j]] == arrFilter[j].value)){
				flag = false;
				break;
			}
		}

		if (!flag) arr[i].style.display = `none`;
		flag = true;
	}
		
}
//ФУНКЦИЯ СОРТИРОВКИ ПО КЛИКУ
element2.onclick = function(){
	//ТУТ ЗАВОДИМ ВСЕ НУЖНЫЕ ПЕРЕМЕННЫЕ
	for (let i = 1; i < arr.length; i++)
		arr[i].style.display = '';
	let sortSelector = document.querySelectorAll("select");
	let checkArr = document.getElementsByName('desc');
	//СОБСТВЕННО АЛГОРИТМ СОРТИРОВКИ
	arrFinal.sort(compare = function(a, b){
		let count = 0;
		while (count < sortSelector.length){
			if (+sortSelector[count].value != 0) {
				if (checkArr[count].checked) {
					if (a[arrStr[sortSelector[count].value - 1]] > b[arrStr[sortSelector[count].value - 1]]) {
						return -1;
					}
					if (a[arrStr[sortSelector[count].value - 1]] < b[arrStr[sortSelector[count].value - 1]]) {
						return 1;
					}
				}
				else {
					if (a[arrStr[sortSelector[count].value - 1]] < b[arrStr[sortSelector[count].value - 1]]) {
					return -1;
					}
					if (a[arrStr[sortSelector[count].value - 1]] > b[arrStr[sortSelector[count].value - 1]]) {
						return 1;
					}
				}	
				count++;
			}
			else return 0;			
		}	
		return 0;
	});
	for (let i = 1; i < arr.length; i++)
		for (let j = 0; j < arr[i].children.length; j++)
			arr[i].children[j].innerHTML = arrFinal[i - 1][arrStr[j]];
	element.click();
};
