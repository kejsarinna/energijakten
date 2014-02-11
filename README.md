 Energijakten!

Fånga kaffekoppar och överlev vardagen!

Som nybliven mamma är livet inte lätt - för lite sömn och ingen tid att bara sitta ned för sig själv är tärande. 
För att överleva jagar du kaffekoppar och hoppas på ny energi. Men se upp för bebisarna! Inte bara stör de dig i din jakt, 
de kräver energi också. Din energiräknare startar på 3, för varje kaffekopp ökar den med 1 men för varje bebis dras 2 poäng av. 
När mätaren når noll är det Game Over!

 Vill du ha spelet på din hemsida?

Inga problem! Ladda ned koden här på GitHub.Det som finns i HTML-filen är bara rutan med spelet. 
Om du har en sida som du vill ha rutan på så kopierar du canvas-taggen och det där emellan.

	<code><canvas id="backgroundCanvas" width="400" height="400">Your browser does not support canvas. Please try again with a different browser.</canvas>
	<canvas id="playerCanvas" width="400" height="400"></canvas>
	<canvas id="babyCanvas" width="400" height="400"></canvas>
	<canvas id="coffeeCanvas" width="400" height="400"></canvas> </code>

Denna bit klistrar du in i din HTML-text till din sida där du vill ha spelet placerat.

Behöver du ändra storleken på canvasen så gör du det i .js-filen. Koden du letar efter är denna

		game.width = 400;
		game.height = 400;

Ändrar du width eller height här så ändras det genom hela spelet. Du ska inte ändra någon annanstans i koden.