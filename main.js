let recebeImagem = $('.pais');
const paisName = $('.namePais');
const population = $('.population');
const region = $('.region');
const capital = $('.capital');
const darkMode = $('.darkMode');
const container = $('.container');


let populationList = [];
let regionList = [];
let capitalList = [];
let namePais = [];
let imagem = [];


fetch('https://restcountries.eu/rest/v2/all')
.then(response => {
	return response.json();
})
.then(json => {
	for (let i = 0; i <json.length; i++) {
		if(i < 8){
			imagem.push(json[i].flag);
			namePais.push(json[i].name);
			populationList.push(json[i].population);
			regionList.push(json[i].region);
			capitalList.push(json[i].capital);
		}else{}
	}
	recebeImagem.each(function(index, el) {
		$(this).attr('src', imagem[index]);	
	});
	colocarElementoNaTela(recebeImagem, imagem);
	colocarElementoNaTela(paisName, namePais);
	colocarElementoNaTela(population, populationList);
	colocarElementoNaTela(region, regionList);
	colocarElementoNaTela(capital, capitalList);

});

function colocarElementoNaTela(primeiroValor, segundoValor){
	primeiroValor.each(function(index, el) {
		$(this).text(segundoValor[index]);	
	});
}

darkMode.click((event) => {
	container.toggleClass('containerDarkMode');
});


let imageSelect = $('.imagePaisSelected');
const paisSelecionado = $('.textoPaisSelecionado');
let nomePaisSelecionado;


$('.pais').click(function(event){
	
	$('.textoPaisSelecionado').text($(this).next().text());
	nomePaisSelecionado = paisSelecionado.text();

	fetch('https://restcountries.eu/rest/v2/name/' + nomePaisSelecionado)
	.then(response => {
		return response.json();
	}).then(json => {
		$('.detailNativeName').text(json[0].nativeName);
		$('.detailPopulation').text(json[0].population);
		$('.detailRegion').text(json[0].region);
		$('.detailSubRegion').text(json[0].subregion);
		$('.detailCapital').text(json[0].capital);
		$('.detailTopLevelDomain').text(json[0].topLevelDomain);
		$('.detailCurrencies').text(json[0].currencies[0].name);
		

		let listaLanguages = [];

		for(let i = 0; i < json[0].languages.length;i++){
			listaLanguages[i] = json[0].languages[i].name;
		}
		$('.detailLanguages').text(listaLanguages);
	});

	let atributoImagem = $(this).attr('src');
	imageSelect.attr('src', atributoImagem);
	$('.painelDetail').show('slow');
});

let secondCard = $('.secondCard');
let thirdCard = $('.thirdCard');
let fourthCard = $('.fourthCard');
let fifthCard = $('.fifthCard');
let sixthCard = $('.sixthCard');
let seventhCard = $('.seventhCard');
let eighthCard = $('.eighthCard');
let imagemPais = $('.primaryCard > img');

$('.search').keyup(function(event) {
	let aleatorio = Math.trunc(Math.random() * 10);
	if($('.search').val() == ""){
		$('.primaryCard').after(secondCard);
		$('.primaryCard').after(thirdCard);
		$('.primaryCard').after(fourthCard);
		$('.primaryCard').after(fifthCard);
		$('.primaryCard').after(sixthCard);
		$('.primaryCard').after(seventhCard);
		$('.primaryCard').after(eighthCard);
	}else{
		fetch('https://restcountries.eu/rest/v2/name/' + $('.search').val())
	.then(response => {
		return response.json();
	}).then(json => {
		imagemPais.attr('src', json[0].flag);
		$('.secondCard').remove();
		$('.thirdCard').remove();
		$('.fourthCard').remove();
		$('.fifthCard').remove();
		$('.sixthCard').remove();
		$('.seventhCard').remove();
		$('.eighthCard').remove();
	});

	}
	
});

$('.return').click(function (event){
	$('.painelDetail').hide('slow');
});

let regiao;
let listaFlagRegiao = [];
let listaNameRegiao = [];
let listaRegionRegiao = [];
let listaCapitalRegiao = [];
let listaPopulationRegiao = [];

$('#id_do_select').change(function(event) {
	regiao = $('#id_do_select :selected').text().toLowerCase();
	fetch('https://restcountries.eu/rest/v2/region/' + regiao)
	.then(response => {
		return response.json();
	})
	.then(json => {
		for(let i = 0; i < json.length;i++){
			if(i < 8){
				listaFlagRegiao[i] = json[i].flag;
				listaNameRegiao[i] = json[i].name;
				listaRegionRegiao[i] = json[i].region;
				listaPopulationRegiao[i] = json[i].population;
				listaCapitalRegiao[i] = json[i].capital;
			}else{}
		}
		$('.pais').each(function(index, el) {
			recebeImagem = $(this).attr('src', listaFlagRegiao[index]);
		});
		paisName.each(function(index, el) {
			$('.region').text(listaRegionRegiao[index]);
		});
		colocarElementoNaTela(paisName, listaNameRegiao);
		colocarElementoNaTela(population, listaPopulationRegiao);
		colocarElementoNaTela(capital, listaCapitalRegiao);
	})
});
