const reformat_list = str => str.split(';').map(x => `(${x.split(':')[1]}, ${x.split(':')[0]})`).sort().reduce((res, x) => res+=x, '').toUpperCase()

console.log("Fired:Corwill;Wilfred:Corwill;Barney:TornBull;Betty:Tornbull;Bjon:Tornbull;Raphael:Corwill;Alfred:Corwill =>\n", reformat_list('Fired:Corwill;Wilfred:Corwill;Barney:TornBull;Betty:Tornbull;Bjon:Tornbull;Raphael:Corwill;Alfred:Corwill'))