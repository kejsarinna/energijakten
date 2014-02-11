(function(){
	$(document).ready(function(){
			       
		var game = {};
		
		game.baby = [];
		game.coffee = [];
		
		game.score = 3;
		
		game.width = 400;
		game.height = 400;
		
		game.keys = [];
		
		game.images= [];
		game.doneImages = 0;
		game.requiredImages = 0;
		
		game.gameOver = true;
		
		game.player = {
			x: game.width / 2 - 15,
			y: game.height / 2 - 21,
			width: 30,
			height: 43,
			speed: 4,
			rendered: false
		}

		game.contextBackground = document.getElementById("backgroundCanvas").getContext("2d");			
		game.contextPlayer = document.getElementById("playerCanvas").getContext("2d");
		game.contextCoffee = document.getElementById("coffeeCanvas").getContext("2d");
		game.contextBaby = document.getElementById("babyCanvas").getContext("2d");
		
        
        window.addEventListener("keydown", function(e) {
            if([32, 37, 38, 39, 40].indexOf(e.keyCode) > -1) {
                e.preventDefault();
            }
        }, false);
        

		$(document).keydown(function(e){
			game.keys[e.keyCode ? e.keyCode : e.which] = true;		
		});

		$(document).keyup(function(e){
			delete game.keys[e.keyCode ? e.keyCode : e.which]		
		});

		function init() {
        
            game.contextBackground.clearRect(0, 0, game.width, game.height);
            game.contextBaby.clearRect(0,0, game.width, game.height);
            game.contextCoffee.clearRect(0,0, game.width, game.height);
            game.contextPlayer.clearRect(0,0, game.width, game.height);
            game.player.x = game.width / 2 - 15;
            game.player.y = game.height / 2 - 21;

            game.baby.splice(0, game.baby.length);
            game.coffee.splice(0, game.coffee.length);
            game.score = 3;

			for(i = 0; i < 2; i++) {
				game.baby.push({
					x: Math.random() * (game.width),
					y: Math.random() * (game.height),
					width: 30,
					height: 41,
					image: 2
				});
			}

            for(i = 0; i < 1; i++) {
				game.coffee.push({
					x: Math.random() * (game.width),
					y: Math.random() * (game.height),
					width: 30,
					height: 31,
					image: 1
				});
			}
		}

		function addBaby() {
			game.baby.push({
				x: Math.random() * (game.width - 30),
				y: -10,
				width: 30,
				height: 41,
				image: 2
			});
		}

		function addCoffee() {
			game.coffee.push({
				x: Math.random() * (game.width - 30),
				y: Math.random() * (game.height - 31),
				width: 30,
				height: 31,
				image: 1
		    });
		}

		function update() {

			for(i in game.baby) {

                game.baby[i].y+=5;
				if(game.baby[i].y >= game.height) {
    				game.baby.splice(i, 1);
    				addBaby();
                }
			}

			for (b in game.baby){

				if (collision(game.player, game.baby[b])) {

					game.score = game.score - 2;

					game.contextBaby.clearRect(game.baby[b].x, game.baby[b].y, game.baby[b].width, game.baby[b].height)
					game.baby.splice(b, 1);
					addBaby();
				}
			}

			for (c in game.coffee){

				if (collision(game.player, game.coffee[c])) {

					game.score++;

					game.contextBaby.clearRect(game.coffee[c].x, game.coffee[c].y, game.coffee[c].width, game.coffee[c].height)
					game.coffee.splice(c, 1);
					addCoffee();
				}
			}

		    if (game.score < 1) {
			    game.gameOver = true;
			}

		} 


		function render() {

			game.contextBackground.clearRect(0, 0, game.width, game.height);

			game.contextBaby.clearRect(0,0, game.width, game.height);

			for (i in game.baby) {
				var baby = game.baby[i];
				game.contextBaby.drawImage(game.images[baby.image], baby.x, baby.y, baby.width, baby.height);
			} 

			game.contextCoffee.clearRect(0,0, game.width, game.height);

			for (i in game.coffee) {
				var coffee = game.coffee[i];
				game.contextCoffee.drawImage(game.images[coffee.image], coffee.x, coffee.y, coffee.width, coffee.height);
			} 

			game.contextBackground.fillStyle = "black";
			game.contextBackground.font = "bold 30px helvetica";
			game.contextBackground.fillText(game.score, 10, 30);

			if(!game.player.rendered) {                

				game.contextPlayer.clearRect(0,0, game.width, game.height);
				game.contextPlayer.drawImage(game.images[0], game.player.x, game.player.y, game.player.width, game.player.height);

				game.player.rendered = true;
			}

			if(game.gameOver) {                

				game.contextBackground.clearRect(0, 0, game.width, game.height);
				game.contextPlayer.clearRect(0, 0, game.width, game.height);
				game.contextCoffee.clearRect(0, 0, game.width, game.height);
				game.contextBaby.clearRect(0, 0, game.width, game.height);

    			game.contextBackground.fillStyle = "black";
    			game.contextBackground.font = "bold 15px helvetica";
    			game.contextBackground.fillText("Press SPACE to start!", game.width/2-80, game.height/2-9);
			}

		} 
		

		function loop() {

			if(game.keys[37]) {

				if(game.player.x > 0) {

					game.player.x -= game.player.speed;

					game.player.rendered = false;
			    }
			}

			if(game.keys[39]) {
				if(game.player.x <= game.width - game.player.width) {
					game.player.x += game.player.speed;
					game.player.rendered = false;
			    }
			}
			

			if(game.keys[38]) {
				if(game.player.y > 0) {
					game.player.y -= game.player.speed;
					game.player.rendered = false;
		        }
			}

			if(game.keys[40]) {
				if(game.player.y <= game.height - game.player.height) {
					game.player.y+=game.player.speed;
					game.player.rendered = false;
				}
			}
            

            if(game.keys[32]) {

                if (game.gameOver) {
              
                    game.player.rendered = false;
                    game.gameOver = false;
                    init();
                }
            }

			update();

			render();

			requestAnimFrame(function(){
				loop();
			});
		}

		function initImages(paths) {
			game.requiredImages = paths.length;
			for(i in paths) {
				var img = new Image();
				img.src = paths[i];
				game.images[i] = img;
				game.images[i].onload = function (){
					game.doneImages++;
				}
			}
		}
		
 
		function collision(first, second){
			return !(first.x > second.x + second.width ||
				first.x + first.width < second.x || 
				first.y > second.y + second.height ||
				first.y + first.height < second.y);
		}

        function firststart() {

			if(game.doneImages >= game.requiredImages) {

				init();
                
                loop();
			} else {

				setTimeout(function(){
				    firststart();	
                }, 1);
			}
		}

		game.contextBackground.font = "bold 50px helvetica";
		game.contextBackground.fillStyle = "white";
		game.contextBackground.fillText("loading...", game.width/2 -100, game.height/2);

		initImages(["images/parent.png", "images/kaffe.png", "images/bebis.png"]);

        firststart();

	});
})();

window.requestAnimFrame = (function(){
  return  window.requestAnimationFrame       ||
          window.webkitRequestAnimationFrame ||
          window.mozRequestAnimationFrame    ||
          window.oRequestAnimationFrame    ||
          window.msRequestAnimationFrame    ||
          function( callback ){
            window.setTimeout(callback, 1000 / 60);
          };
})();
