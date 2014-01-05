var flashPlayer, frontPage = $('#front'),
	emcGACampaign 	= '[13-5420] TH-AUS Christmas - Freedom Furniture (1) FlipBook Overlay',
	popuptime 		= 400,
	preload 		= new createjs.LoadQueue(false);
	preload.addEventListener("complete", function(event){ if(flipbook != undefined) onloadComplete(); });

$(document).ready(function(){
	preload.loadManifest([
		{src:'./swf/flashmovie.swf'},
		{src:'./img/bg_a.png'},
		{src:'./img/bg_b.png'},
		{src:'./img/page_2.png'},
		{src:'./img/page_3.png'},
		{src:'./img/base.png'},
		{src:'./img/hard.png'},
		{src:'./img/cover.png'}
	]);
});

/* FLASH EXTERNAL CALLS */
function startFlash() { flashPlayer.get(0).runFlash(); }
function endFlash() { 
	$('#flipbook').css('opacity','0').removeClass('hidden').animate({opacity: 1}, 300, 'linear', function(){ flashPlayer.remove(); });;
	initFlipbook();
}
function createFlashPlayer() {
	var params = { allowscriptaccess: 'always', movie: 'swf/flashmovie.swf', wmode: 'transparent', menu: 'false' },
		attributes = { id: 'flashplayer',  name: 'flashplayer' };
	swfobject.embedSWF('swf/flashmovie.swf', 'flashplayer', '1100', '600', '11.4.0', 'expressInstall.swf', {}, params, attributes);
	flashPlayer = $('#flashplayer');
}
/* FLIPBOOK CALLS */
function onloadComplete () {
	createFlashPlayer();
	createButtons();
	$('#flipbook_close').animate({ opacity: '1' }, 1000);
	var holder = $('#flipbook_holder').removeClass('hidden').animate({ opacity: '1' },600,'linear',function(){ 
		$('#flipbook_loading').remove();
		$('#back').removeClass('hidden').animate({ opacity: '1' }, 600);
	});
	$('#background',holder).click(function(){
		window.open('http://ad.au.doubleclick.net/clk;277059313;104960299;m','_blank');
	});
	_gaq.push(['_trackEvent', emcGACampaign, 'Flipbook loaded']);
}
function initFlipbook() {
	$("#flipbook").turn({
		width: 998,
		height: 477,
		autoCenter: false,
		inclination: 0,
		elevation: 50,
		when: {
			turning: function(e, page, view) {
				if(page != 1){
					if(page>=4){
						frontPage.css('display','block');
					}else{
						frontPage.css('display','none');
					}
					if(page>=2 && page <=11){
						$('#flipr').css('display','block');
					}else{
						$('#flipr').css('display','none');
					}
					if(page>=4 && page <=13){
						$('#flipl').css('display','block');
					}else{
						$('#flipl').css('display','none');
					}
					_gaq.push(['_trackEvent', emcGACampaign, 'View page # ' + (page-1) + ' - ' + page]);
				}else{
					e.preventDefault();
				}
			}
		}
	});
	setTimeout(function () { 
		$('#flipbook').turn('page', 2);
		var background = $('#background');
		$('.bg_a',background).animate({ opacity: '0' }, 1000);
		$('.bg_b',background).animate({ opacity: '1' }, 1000); 
	}, 300);
}
function goToNext(){
	$('#flipbook').turn('next');
}
function goToPrev(){
	$('#flipbook').turn('previous');
}
/* CREATE BUTTONS AND HOTSPOTS */
function createButtons() {
	//PAGINA 2
	createButton({
		type 		: 'hotspot',
		page 		: 'p2',
		coords 		: {x:187,y:179},
		position 	: 'pa',
		header 		: 'TWISTED',
		subheader 	: 'floor lamp',
		price 		: '$249',
		url 		: 'http://www.freedom.com.au/homewares/lighting/floor-lights/23355408/twisted-floor-lamp-150cm-natural-finish/?utm_source=totallyher&utm_medium=flipbook&utm_campaign=GRFX'
	});
	createButton({
		type 		: 'hotspot',
		page 		: 'p2',
		coords 		: {x:318,y:254},
		position 	: 'pa',
		header 		: 'ANDERSEN',
		subheader 	: '3 seat sofa',
		price 		: '$1699',
		url 		: 'http://www.freedom.com.au/furniture/sofas/fabric-sofas/23361362/andersen-mkii-3-seat-sofa-napa-stone/?utm_source=totallyher&utm_medium=flipbook&utm_campaign=GRFX'
	});
	createButton({
		type 		: 'hotspot',
		page 		: 'p2',
		coords 		: {x:427,y:347},
		position 	: 'pd',
		header 		: 'SLIPPER',
		subheader 	: 'chair',
		price 		: '$399',
		url 		: 'http://www.freedom.com.au/furniture/sofas/fabric-armchairs/23365506/slipper-chair-chevron-taupe/?utm_source=totallyher&utm_medium=flipbook&utm_campaign=GRFX'
	});
	//PAGINA 3
	createButton({
		type 		: 'radial',
		page 		: 'p3',
		coords 		: {x:190,y:209},
		position 	: {x:79,y:-79},
		size 		: 292,
		header 		: 'RETRO',
		subheader 	: 'chair',
		price 		: '$599',
		url 		: 'http://www.freedom.com.au/furniture/sofas/fabric-armchairs/23364592/retro-chair-arena-neptune/?utm_source=totallyher&utm_medium=flipbook&utm_campaign=GRFX'
	});
	createButton({
		type 		: 'radial',
		page 		: 'p3',
		coords 		: {x:338,y:324},
		position 	: {x:-204,y:17},
		size 		: 186,
		header 		: 'TUKANA',
		subheader 	: 'cushion',
		price 		: '$39.95',
		url 		: 'http://www.freedom.com.au/homewares/soft-furnishings/scatter-cushions/23392113/tukana-cushion-45x45cm-multi/?utm_source=totallyher&utm_medium=flipbook&utm_campaign=GRFX'
	});

	//PAGINA 4
	createButton({
		type 		: 'hotspot',
		page 		: 'p4',
		coords 		: {x:200,y:281},
		position 	: 'pa',
		header 		: 'DECKHAUS',
		subheader 	: '9 piece package',
		price 		: '$1299',
		url 		: 'http://www.freedom.com.au/furniture/outdoor/outdoor-tables/23395688/deckhaus-9-piece-outdoor-package-natural/?utm_source=totallyher&utm_medium=flipbook&utm_campaign=GRFX'
	});
	createButton({
		type 		: 'hotspot',
		page 		: 'p4',
		coords 		: {x:420,y:347},
		position 	: 'pd',
		specialSize	: 'size_a',
		header 		: 'WEEKENDER STRIPE',
		subheader 	: 'cushion',
		price 		: '$29.95',
		url 		: 'http://www.freedom.com.au/homewares/outdoor-living/outdoor-softs/23381803/weekender-stripe-cushion-50x50cm-red/?utm_source=totallyher&utm_medium=flipbook&utm_campaign=GRFX'
	});
	//PAGINA 5
	createButton({
		type 		: 'radial',
		page 		: 'p5',
		coords 		: {x:177,y:190},
		position 	: {x:-130,y:75},
		specialSize	: 'size_b',
		size 		: 256,
		header 		: 'BRUNCH',
		subheader 	: '3 piece dining package',
		price 		: '$799',
		url 		: 'http://www.freedom.com.au/furniture/outdoor/outdoor-tables/23394438/brunch-3-piece-dining-package-flame/?utm_source=totallyher&utm_medium=flipbook&utm_campaign=GRFX'
	});
	createButton({
		type 		: 'radial',
		page 		: 'p5',
		coords 		: {x:307,y:335},
		position 	: {x:2,y:-148},
		size 		: 186,
		header 		: 'IMPRESSIONS',
		subheader 	: 'set of 4 bowls',
		price 		: '$39.95',
		url 		: 'http://www.freedom.com.au/homewares/tableware/dinnerware/23392342/impressions-bowls-set-of-4-mixed-pattern/?utm_source=totallyher&utm_medium=flipbook&utm_campaign=GRFX'
	});

	//PAGINA 6
	createButton({
		type 		: 'hotspot',
		page 		: 'p6',
		coords 		: {x:363,y:158},
		position 	: 'pc',
		header 		: 'INDUSTRY',
		subheader 	: 'ceiling pendant',
		price 		: '$149',
		url 		: 'http://www.freedom.com.au/homewares/lighting/ceiling-lights/23308442/industry-ceiling-pendant-black/?utm_source=totallyher&utm_medium=flipbook&utm_campaign=GRFX'
	});
	createButton({
		type 		: 'hotspot',
		page 		: 'p6',
		coords 		: {x:90,y:287},
		position 	: 'pa',
		specialSize	: 'size_b',
		header 		: 'URBAN',
		subheader 	: 'extension dining table',
		price 		: '$1799',
		url 		: 'http://www.freedom.com.au/furniture/dining/dining-tables/23262706/urban-extension-dining-table-190250x100-naturalgrey/?utm_source=totallyher&utm_medium=flipbook&utm_campaign=GRFX'
	});
	createButton({
		type 		: 'hotspot',
		page 		: 'p6',
		coords 		: {x:344,y:372},
		position 	: 'pd',
		header 		: 'LAURENT',
		subheader 	: 'dining chair',
		price 		: '$149',
		url 		: 'http://www.freedom.com.au/furniture/dining/dining-chairs/23164628/laurent-dining-chair-white/?utm_source=totallyher&utm_medium=flipbook&utm_campaign=GRFX'
	});
	//PAGINA 7
	createButton({
		type 		: 'radial',
		page 		: 'p7',
		coords 		: {x:174,y:193},
		position 	: {x:-133,y:75},
		size 		: 266,
		header 		: 'SIGNATURE',
		subheader 	: 'extension table',
		price 		: '$1199',
		url 		: 'http://www.freedom.com.au/furniture/signature/dining/23358379/signature-extension-dining-table-white/?utm_source=totallyher&utm_medium=flipbook&utm_campaign=GRFX'
	});
	createButton({
		type 		: 'radial',
		page 		: 'p7',
		coords 		: {x:286,y:338},
		position 	: {x:-193,y:10},
		size 		: 150,
		header 		: 'JUPITER',
		subheader 	: 'dining chair',
		price 		: '$59',
		url 		: 'http://www.freedom.com.au/furniture/dining/dining-chairs/23351110/jupiter-dining-chair-teal/?utm_source=totallyher&utm_medium=flipbook&utm_campaign=GRFX'
	});

	//PAGINA 8
	createButton({
		type 		: 'hotspot',
		page 		: 'p8',
		coords 		: {x:302,y:312},
		position 	: 'pc',
		header 		: 'Christmas',
		subheader 	: 'Tabletop',
		price 		: 'from $7.95',
		url 		: 'http://www.freedom.com.au/homewares/christmas/christmas-tabletop/?utm_source=totallyher&utm_medium=flipbook&utm_campaign=GRFX'
	});
	createButton({
		type 		: 'hotspot',
		page 		: 'p8',
		coords 		: {x:449,y:311},
		position 	: 'pc',
		header 		: 'FRITZ',
		subheader 	: 'dining chair',
		price 		: '$129',
		url 		: 'http://www.freedom.com.au/furniture/dining/dining-chairs/23162365/fritz-dining-chair-white/?utm_source=totallyher&utm_medium=flipbook&utm_campaign=GRFX'
	});
	createButton({
		type 		: 'hotspot',
		page 		: 'p8',
		coords 		: {x:362,y:425},
		position 	: 'pc',
		header 		: 'CARPENTERS',
		subheader 	: 'dining table',
		price 		: '$1499',
		url 		: 'http://www.freedom.com.au/furniture/dining/dining-tables/23154926/carpenters-dining-table-220x100cm-natural/?utm_source=totallyher&utm_medium=flipbook&utm_campaign=GRFX'
	});
	//PAGINA 9
	createButton({
		type 		: 'radial',
		page 		: 'p9',
		coords 		: {x:199,y:203},
		position 	: {x:112,y:-108},
		size 		: 310,
		header 		: 'MODE',
		subheader 	: 'mug',
		price 		: '$3.95',
		url 		: 'http://www.freedom.com.au/homewares/tableware/coffee-tea/23389793/mode-mug-bone-china-yellowgrey/?utm_source=totallyher&utm_medium=flipbook&utm_campaign=GRFX'
	});
	createButton({
		type 		: 'radial',
		page 		: 'p9',
		coords 		: {x:350,y:356},
		position 	: {x:-195,y:-16},
		size 		: 180,
		specialSize	: 'size_a',
		header 		: 'SUMMER PINEAPPLE',
		subheader 	: 'statue',
		price 		: '$19.95',
		url 		: 'http://www.freedom.com.au/homewares/decorator-accents/bowls-accessories/23376885/summer-pineapple-22cm/?utm_source=totallyher&utm_medium=flipbook&utm_campaign=GRFX'
	});

	//PAGINA 10
	createButton({
		type 		: 'hotspot',
		page 		: 'p10',
		coords 		: {x:189,y:159},
		position 	: 'pa',
		header 		: 'BAKERS',
		subheader 	: 'storage unit',
		price 		: '$199',
		url 		: 'http://www.freedom.com.au/furniture/living/bookshelves-wall-units/23276710/bakers-storage-unit/?utm_source=totallyher&utm_medium=flipbook&utm_campaign=GRFX'
	});
	createButton({
		type 		: 'hotspot',
		page 		: 'p10',
		coords 		: {x:202,y:314},
		position 	: 'pa',
		specialSize	: 'size_b',
		header 		: 'AKI',
		subheader 	: 'queen quilt cover set',
		price 		: '$99',
		url 		: 'http://www.freedom.com.au/homewares/bedroom/quilt-covers-bedspreads/23378285/aki-queen-quilt-cover-set-blue/?utm_source=totallyher&utm_medium=flipbook&utm_campaign=GRFX'
	});
	createButton({
		type 		: 'hotspot',
		page 		: 'p10',
		coords 		: {x:448,y:310},
		position 	: 'pc',
		header 		: 'HARRY',
		subheader 	: 'sofabed',
		price 		: '$999',
		url 		: 'http://www.freedom.com.au/furniture/sofas/recliners-and-sofabeds/23395824/harry-sofa-bed-lennox-graphite/?utm_source=totallyher&utm_medium=flipbook&utm_campaign=GRFX'
	});
	//PAGINA 11
	createButton({
		type 		: 'radial',
		page 		: 'p11',
		coords 		: {x:214,y:220},
		position 	: {x:84,y:-168},
		size 		: 316,
		header 		: 'SLEEPOVER',
		subheader 	: 'sofa bed 1.5 seat',
		price 		: '$799',
		url 		: 'http://www.freedom.com.au/furniture/sofas/recliners-and-sofabeds/23278349/sleepover-sofa-bed-15-seat-dexter-ketchup/?utm_source=totallyher&utm_medium=flipbook&utm_campaign=GRFX'
	});
	createButton({
		type 		: 'radial',
		page 		: 'p11',
		coords 		: {x:302,y:370},
		position 	: {x:-183,y:-10},
		size 		: 122,
		header 		: 'JUKE',
		subheader 	: 'vessel large',
		price 		: '$59.95',
		url 		: 'http://www.freedom.com.au/homewares/decorator-accents/vessels/23380189/juke-vessel-large-reactive-blue/?utm_source=totallyher&utm_medium=flipbook&utm_campaign=GRFX'
	});

	//PAGINA 12
	createButton({
		type 		: 'hotspot',
		page 		: 'p12',
		coords 		: {x:126,y:152},
		position 	: 'pb',
		specialSize	: 'size_b',
		header 		: 'ENTERTAIN',
		subheader 	: '4 piece cheese knife set ',
		price 		: '$19.95',
		url 		: 'http://www.freedom.com.au/homewares/christmas/23385641/entertain-4-piece-cheese-knife-set/?utm_source=totallyher&utm_medium=flipbook&utm_campaign=GRFX'
	});
	createButton({
		type 		: 'hotspot',
		page 		: 'p12',
		coords 		: {x:327,y:140},
		position 	: 'pc',
		header 		: 'GLITTER',
		subheader 	: 'bowl large',
		price 		: '$29.95',
		url 		: 'http://www.freedom.com.au/homewares/christmas/23385153/glitter-bowl-large-glass-silver/?utm_source=totallyher&utm_medium=flipbook&utm_campaign=GRFX'
	});
	createButton({
		type 		: 'hotspot',
		page 		: 'p12',
		coords 		: {x:412,y:257},
		position 	: 'pc',
		header 		: 'WHISK',
		subheader 	: 'string lights',
		price 		: '$29.95',
		url 		: 'http://www.freedom.com.au/homewares/christmas/23382244/whisk-string-lights-77m-white/?utm_source=totallyher&utm_medium=flipbook&utm_campaign=GRFX'
	});
	createButton({
		type 		: 'hotspot',
		page 		: 'p12',
		coords 		: {x:251,y:367},
		position 	: 'pb',
		specialSize	: 'size_b',
		header 		: 'WISH',
		subheader 	: 'cocktail glass set of 4',
		price 		: '$39.95',
		url 		: 'http://www.freedom.com.au/homewares/christmas/23389380/wish-cocktail-glass-set-of-4/?utm_source=totallyher&utm_medium=flipbook&utm_campaign=GRFX'
	});
	//PAGINA 13
	createButton({
		type 		: 'radial',
		page 		: 'p13',
		coords 		: {x:283,y:278},
		position 	: {x:-223,y:38},
		size 		: 258,
		header 		: 'ENTERTAIN',
		subheader 	: 'oil & vinegar set',
		price 		: '$49.95',
		url 		: 'http://www.freedom.com.au/homewares/christmas/23385580/entertain-oil--vinegar-set-naturalwhite/?utm_source=totallyher&utm_medium=flipbook&utm_campaign=GRFX'
	});
	createButton({
		type 		: 'radial',
		page 		: 'p13',
		coords 		: {x:146,y:169},
		position 	: {x:56,y:-81},
		size 		: 154,
		header 		: 'Freedom',
		subheader 	: 'Gift Card',
		price 		: '',
		url 		: 'http://www.freedom.com.au/furniture/gift-ideas/gift-card/23243118/gift-card-online/?utm_source=totallyher&utm_medium=flipbook&utm_campaign=GRFX'
	});

}
function createButton(_params) {
	var trigger,
		pageDom 	= $('#'+_params.page),
		hotspotDom 	= $('.hotspots',pageDom),
		strName 	= _params.page+'_'+hotspotDom.children().length,
		newDom 		= $('#btn_asset').clone().removeClass('hidden').attr('id',strName).attr('type',_params.type).attr('on','false'),
		win 		= $('.window',newDom).css('opacity','0').attr('url',_params.url),
		txt1 		= $('.floater_t1',newDom),
		txt2 		= $('.floater_t2',newDom),
		txt3 		= $('.floater_t3',newDom),
		button 		= $('.btn_holder',newDom);
	if(_params.type == 'hotspot'){
		trigger = $('.hotspot',newDom);
		fx = $('.fx',newDom).css('opacity','0');
		win.addClass(_params.position);
		$('.radial',newDom).remove();
	}else{
		trigger = $('.radial',newDom).css('width',_params.size+'px').css('height',_params.size+'px')
			.css('top','-'+(_params.size/2)+'px').css('left','-'+(_params.size/2)+'px').css('z-index','3');
		win.css('left',_params.position.x+'px').css('top',_params.position.y+'px');
		$('.hotspot',newDom).remove();
		$('.fx',newDom).remove();
	}
	trigger.attr('url',_params.url);

	var identifier = _params.header+' '+_params.subheader;
	newDom.attr('info',identifier);

	txt1.text(_params.header);
	txt2.text(_params.subheader);
	txt3.text(_params.price);
	button.attr('url',_params.url);

	if(_params.specialSize != undefined){
		win.addClass(_params.specialSize);
		txt1.addClass(_params.specialSize);
		txt2.addClass(_params.specialSize);
		txt3.addClass(_params.specialSize);
		button.addClass(_params.specialSize);
	}
	newDom.css('left',_params.coords.x+'px').css('top',_params.coords.y+'px');
	hotspotDom.append(newDom);
}
function triggerOver(_target){
	var btnObj = $(_target).parent();
	if(btnObj.attr('on') == 'false'){
		$('.window',btnObj).animate({ opacity: '1' }, popuptime);
		$('.fx',btnObj).animate({ opacity: '1' }, popuptime);
		$('.btn_holder',btnObj).addClass('active');
		btnObj.attr('on','true');

		if(btnObj.attr('type') == 'radial'){
			$('.radial',btnObj).css('z-index','1');
		}
		_gaq.push(['_trackEvent', emcGACampaign, 'Rollover on item: '+btnObj.attr('info')]);
	}
}
function windowOut(_target){
	var btnObj = $(_target);
	$('.window',btnObj).animate({ opacity: '0' }, popuptime);
	$('.btn_holder',btnObj).removeClass('active');
	$('.fx',btnObj).animate({ opacity: '0' }, popuptime);
	btnObj.attr('on','false');

	if(btnObj.attr('type') == 'radial'){
		$('.radial',btnObj).css('z-index','3');
	}
}
function urlOver(_target){
	$('.btn_txt',_target).addClass('hover');
	$('.btn_img',_target).addClass('hover');
}
function urlOut(_target){
	$('.btn_txt',_target).removeClass('hover');
	$('.btn_img',_target).removeClass('hover');
}
function urlClick(_target){
	var btnObj = $(_target).parent();
	if(btnObj.attr('on') == 'true'){
		_gaq.push(['_trackEvent', emcGACampaign, 'Click item and go to: '+btnObj.attr('info')]);
		window.open($(_target).attr('url'),'_blank');
	}
}
function onMouseOut(item, event) {
	var e = event.toElement || event.relatedTarget;
	while(e && e.parentNode && e.parentNode != window) {
		if (e.parentNode == item||  e == item) {
			if(e.preventDefault) e.preventDefault();
				return false;
			}
		e = e.parentNode;
	}
	windowOut(item);
}