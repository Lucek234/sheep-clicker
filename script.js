let stan_gry = {
    bilans: 0,
    stan_owcy: 'pelna',
    time: 0,
    wartosc_owcy: 1,
    liczba_owiec: 1,
    poczatkowa_cena_owcy: 10,
    cena_owcy: 10,
    sianko_counter: 1,

    sianko_init_time: 60,
    sianko_time: 60,

    poczatkowa_cena_sianka: 5,
    cena_sianka: 5,

    sianko_init_time_cost:100,
    sianko_time_cost:100,

    poczatkowa_cena_troll: 1000,
    cena_troll: 1000,
};

let stan = localStorage.getItem('stan_gry');
if(stan != null){
    try{
        stan_gry = JSON.parse(stan);
    }
    catch{
        console.log('wystapil blad wczytywania')
    }
}


$('#sheep-element').click(function () {
    if (stan_gry.stan_owcy == 'pelna') {
        $('#sheep-element').attr('src', 'assets/pol.png');
        stan_gry.stan_owcy = 'polowa';
        stan_gry.time += 2.0;
        stan_gry.bilans += stan_gry.wartosc_owcy * stan_gry.liczba_owiec * 10;
    }
    else if (stan_gry.stan_owcy == 'polowa') {
        $('#sheep-element').attr('src', 'assets/nic.png');
        stan_gry.stan_owcy = 'nic';
        stan_gry.time += 2.0 / (1) * 5;
        stan_gry.bilans += stan_gry.wartosc_owcy * stan_gry.liczba_owiec * 5;
    }
    else {
        stan_gry.bilans += stan_gry.wartosc_owcy * stan_gry.liczba_owiec;
        stan_gry.time = 2.0 / (1);
    }

})

$('#buy-sheep-button').click(function () {
    if (stan_gry.bilans < stan_gry.cena_owcy) return;
    stan_gry.bilans -= stan_gry.cena_owcy;
    stan_gry.liczba_owiec += 1;
    stan_gry.cena_owcy *= 4;
});

$('#buy-hay-button').click(function () {
    if (stan_gry.bilans < stan_gry.cena_sianka) return;
    stan_gry.bilans -= stan_gry.cena_sianka;
    // sianko_mod += 0.3;g
    if (stan_gry.sianko_counter == 0) { stan_gry.sianko_counter = 1; }
    else stan_gry.sianko_counter += stan_gry.sianko_counter;
    stan_gry.cena_sianka *= 4;
})

$('#troll-button').click(function () {
    if (stan_gry.bilans < stan_gry.cena_troll) return;
    stan_gry.bilans -= stan_gry.cena_troll;
    stan_gry.cena_troll *= 2;
})

$('#buy-time-button').click(function(){
    if(stan_gry.bilans < stan_gry.sianko_time_cost)return;
    stan_gry.bilans -= stan_gry.sianko_time_cost;
    stan_gry.sianko_init_time -= 1;
    stan_gry.sianko_time_cost *= 2;
});

function regrow() {
    $('#sheep-cost').text(`${stan_gry.cena_owcy}`);
    $('#hay-cost').text(`${stan_gry.cena_sianka}`);
    $('#troll-cost').text(`${stan_gry.cena_troll}`);
    $('#time-cost').text(`${stan_gry.sianko_time_cost}`);

    $('#timer-element').text(`${stan_gry.sianko_time.toFixed(0)} s`);
    $('#text-element').html(`
    <p>gotóweczka: ${stan_gry.bilans} </p>
    <p>dodatkowa gotóweczka: ${stan_gry.sianko_counter * stan_gry.liczba_owiec} € co ${stan_gry.sianko_init_time} s.</p>
    <p>owieczki: ${stan_gry.liczba_owiec}</p>
    <p>sianko: ${stan_gry.sianko_counter}</p>
    `
    );


    if (stan_gry.sianko_time <= 0) {
        stan_gry.sianko_time = stan_gry.sianko_init_time;
        stan_gry.bilans += stan_gry.sianko_counter * stan_gry.liczba_owiec;
    }

    stan_gry.sianko_time -= 0.1;
    if(stan_gry.sianko_time < 0)stan_gry.sianko_time = 0;

    // if (stan_gry.stan_owcy == 'pelna') return;
    if (stan_gry.stan_owcy == 'polowa') {
        stan_gry.time -= 0.1;
        if (stan_gry.time <= 0) {
            stan_gry.stan_owcy = 'pelna';
            $('#sheep-element').attr('src', 'assets/cal.png');
            stan_gry.time = 0;
        }
        
    }
    if (stan_gry.stan_owcy == 'nic') {
        stan_gry.time -= 0.1;
        if (stan_gry.time <= 0) {
            stan_gry.stan_owcy = 'pelna';
            $('#sheep-element').attr('src', 'assets/cal.png');
            stan_gry.time = 0;
        }
    }

    localStorage.setItem('stan_gry', JSON.stringify(stan_gry));

}

window.setInterval(regrow, 100);