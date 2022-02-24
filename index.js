const express = require('express'),
    morgan = require('morgan'),
    bodyParser = require('body-parser'),
    uuid = require('uuid');

const app = express();


let users = [
    {
        id: 1,
        name: 'Kim',
        favoriteMovies: []
    },
    {
        id: 2,
        name: 'Jim',
        favoriteMovies: []
    },
];

let topMovies = [
    {
        Title: 'Lord of the Rings: The Fellowship of the Rings',
        Description: 'The future of civilization rests in the fate of the One Ring, which has been lost for centuries. Powerful forces are unrelenting in their search for it. But fate has placed it in the hands of a young Hobbit named Frodo Baggins (Elijah Wood), who inherits the Ring and steps into legend. A daunting task lies ahead for Frodo when he becomes the Ringbearer - to destroy the One Ring in the fires of Mount Doom where it was forged.',
        Genre: {
            Name: 'Fantasy',
            Description: 'xyz'
        },
        Director: {
            Name: 'Peter Jackson',
            Bio: 'Though he began his career making gory and often witty horror comedies in his native New Zealand, director Peter Jackson went on to become one of the most successful and innovative filmmakers of his generation. Jackson first earned a reputation for churning stomachs with the bizarre and bloody B-movies "Bad Taste" (1987), "Meet the Feebles" (1990) and "Dead Alive" (1993). Beautifully filmed and acted, the based-on-fact crime-drama "Heavenly Creatures" (1994) stunned critics and earned Jackson unexpected credibility in Hollywood. Defying all odds, the filmmaker - a lifelong admirer of J.R.R. Tolkiens works - managed the incredibly daunting feat of bringing the authors "Lord of the Rings" (2001-03) universe to life in a trio of epic installments. Breaking box office records and earning scores of Academy Awards, including Best Picture for "Lord of the Rings: The Return of the King" (2003), the films were unequivocal cinematic achievements. Jackson next tackled another childhood obsession with his ambitious remake of "King Kong" (2005) then once again perplexed audiences when he chose to adapt the best-selling novel "The Lovely Bones" (2009). As admirable as these endeavors were, it was the realm of Middle-earth that fans yearned for him to return to, which he eventually did with "The Hobbit: An Unexpected Journey" (2012), the first in yet another trilogy of fantasy adventures based on Tolkiens novel. Known for his boundless imagination and flare for the fantastic, Jackson was also keenly in tune with the humanity inherent in every tale, making him one of cinemas most gifted and passionate storytellers.',
            Birthplace: 'Pukerua Bay, North Island, New Zealand'
        },
    },
    {
        Title: 'A Star is Born',
        Description: 'Seasoned musician Jackson Maine discovers -- and falls in love with -- struggling artist Ally. She has just about given up on her dream to make it big as a singer until Jackson coaxes her into the spotlight. But even as Allys career takes off, the personal side of their relationship is breaking down, as Jackson fights an ongoing battle with his own internal demons.',
        Genre: {
            Name: 'Drama',
            Description: 'xyz'
        },
        Director: {
            Name: 'Bradly Copper',
            Bio: 'Handsome and irreverently funny, Bradley Coopers combination of romantic leading man and hilarious character actor chops helped him progress from TV guest spots to memorable parts in features in a relatively short amount of time. After attracting attention for his likable role as Jennifer Garners reporter friend on "Alias" (ABC, 2001-06), Cooper fearlessly made his first major big screen impression as the unlikable groom in "Wedding Crashers" (2005). He regained audiences affection in lesser fare like "Failure to Launch" (2006) and, in testament to his charisma, emerged unscathed from Sandra Bullocks notorious bomb "All About Steve" (2008). Cooper ensured his own launch with the lead in the critical and box office juggernaut "The Hangover" (2009) and proved an invaluable member of the romantic, dramatic ensemble "Hes Just Not That Into You" (2009) and "Valentines Day" (2010) casts. Graduating to full-fledged stardom with a flashy role in "The A-Team" (2010), Cooper continued to rise as a bankable, talented and very much in-demand movie star, which was confirmed with a return to box-office prominence with "The Hangover Part II" (2011) and his star turn in David O. Russells "Silver Linings Playbook" (2012) opposite Jennifer Lawrence. That trio reunited twice more for "American Hustle" (2013) and "Joy" (2015), while Cooper continued starring in films ranging from Clint Eastwoods drama "American Sniper" (2014) to James Gunns blockbuster action-comedy "Guardians of the Galaxy" (2014) and its 2017 sequel, in which he provided the voice of Rocket, a raccoon-like mutant with serious anger management issues. Whether starring in comedies, thrillers or romantic dramas - as well as making a tabloid splash in the wake of rumored romances with some of Hollywoods loveliest leading ladies - Cooper propelled himself into becoming one of Hollywoods most bankable stars',
            Birthplace: 'Philadelphia, Pennsylvania, USA'
        },
    },
    {
        Title: 'JoJo Rabbit',
        Description: 'Jojo is a lonely German boy who discovers that his single mother is hiding a Jewish girl in their attic. Aided only by his imaginary friend -- Adolf Hitler -- Jojo must confront his blind nationalism as World War II continues to rage on.',
        Genre: {
            Name: 'Comedy',
            Description: 'xyz'
        },
        Director: {
            Name: 'Taika Waititi',
            Bio: 'Kiwi filmmaker Taika Waititis gift for uproarious and absurd humor served him well as director on such films as "What We Do in the Shadows" (2014), "Hunt for the Wilderpeople" (2016) and "Thor: Ragnarok" (2017), which freely mixed humor with horror, action-adventure and other genres. He was born Taika David Waititi in Raukokore, a settlement on New Zealands North Island, on August 16, 1975. Raised in the countrys capital city of Wellington by a Maori father and a Russian Jewish mother, Waititi initially planned to become a painter or a deepsea diver, but fell in love with acting after appearing in high school drama productions. While studying theater and film at Victoria University of Wellington, he also began performing as part of a comedy group, So Youre a Man, which also included Bret McKenzie and Jemaine Clement of Flight of the Conchords',
            Birthplace: 'Raukokore, New Zealand'
        },
    },
    {
        Title: 'Grand Budapest Hotel',
        Description: 'In the 1930s, the Grand Budapest Hotel is a popular European ski resort, presided over by concierge Gustave H. (Ralph Fiennes). Zero, a junior lobby boy, becomes Gustaves friend and protege. Gustave prides himself on providing first-class service to the hotels guests, including satisfying the sexual needs of the many elderly women who stay there. When one of Gustaves lovers dies mysteriously, Gustave finds himself the recipient of a priceless painting and the chief suspect in her murder.',
        Genre: {
            Name: 'Comedy',
            Description: 'xyz'
        },
        Director: {
            Name: 'Wes Anderson',
            Bio: 'Noted for droll comedies that ruminated on loss, parental abandonment and sibling rivalry, director Wes Anderson emerged onto the filmmaking scene with the ultra-low budget "Bottle Rocket" (1996), which earned him considerable attention inside the industry and drew immediate comparisons to auteurs like Woody Allen and Jean Renoir. With "Rushmore" (1998), Anderson established himself as a critical darling, employing a deft mix of wry humor and subtle poignancy set to eclectic soundtracks. He continued to cement his growing reputation with "The Royal Tenenbaums" (2001), a deadpan serio-comic tale about a dysfunctional family of wasted genius peppered with several surprisingly dark moments. A bittersweet ode of Jacques Cousteau, "The Life Aquatic with Steve Zissou" (2004) was yet another pairing with frequent collaborator Bill Murray, although by now many critics and fans alike openly questioned whether Anderson had hit a creative slump. While viewed as an artistic improvement, the familiarly themed "The Darjeeling Limited" (2007) only heightened such speculation. A venture into stop-motion animation with an adaptation of Roald Dahls "The Fantastic Mr. Fox" (2009) appeared to reinvigorate the filmmaker, who returned to rave reviews for his tale of adolescent romance and adventure, "Moonrise Kingdom" (2012). Viewed as overly precious by some and unequivocally brilliant by others, there was no denying that Anderson was one of the more unique cinematic voices of his generation.',
            Birthplace: 'Houston, Texas, USA'
        }
    },
    {
        Title: 'Rogue One: A Star Wars Story',
        Description: 'Former scientist Galen Erso lives on a farm with his wife and young daughter, Jyn. His peaceful existence comes crashing down when the evil Orson Krennic takes him away from his beloved family. Many years later, Galen becomes the Empires lead engineer for the most powerful weapon in the galaxy, the Death Star. Knowing that her father holds the key to its destruction, Jyn joins forces with a spy and other resistance fighters to steal the space stations plans for the Rebel Alliance.',
        Genre: {
            Name: 'Sci-Fi',
            Description: 'xyz'
        },
        Director: {
            Name: 'Gareth Edwards',
            Bio: 'Gareth Edwards was a British visual effects designer and film director whose talent for destructive set pieces were tailor-made for such blockbuster films such as "Monsters" (2010) and "Godzilla" (2014). Although his parents were of Welsh descent, Edwards was born and raised in Nuneaton, England in 1975. He grew up admiring George Lucas Star Wars Trilogy, which greatly influenced his decision to become a filmmaker. He decided to study film production at the University for the Creative Arts and graduated in 1996. Edwards entered the entertainment industry within the world of visual effects, working on made-for-TV documentaries such as "Seven Wonders of the Industrial World" (2003) and "Dive to Bermuda Triangle" (2004). In 2005, Edwards nabbed a BAFTA TV Award for his visual effects work on the TV movie documentary "Hiroshima." In the same year he directed his first film in the television movie, "End Day" (2005), a docu-drama that showcased several doomsday scenarios by a fictional scientist. In 2010, Edwards made his feature film directorial debut with the science fiction film "Monsters." Using his past expertise with special effects, Edwards was able to weave an engrossing movie about an extra-terrestrial invasion wreaking havoc along the U.S.-Mexico border. "Monsters" demonstrated Edwards ability to handle massive scales of destruction and mayhem, which led to his involvement as the director of 2014s "Godzilla." Starring Bryan Cranston as the lead scientist, "Godzilla" brought back a modern and faithful return of the iconic Japanese monster to the big screen. On the back of that films box office success, it was announced in May 2014 that Edwards was going to direct the first stand-alone film in the "Star Wars" universe, due out in December 2016.',
            Birthplace: 'Nuneaton, Warwickshire, England, UK'
        }
    },
    {
        Title: 'Dont Look Up',
        Description: 'Kate Dibiasky (Jennifer Lawrence), an astronomy grad student, and her professor Dr. Randall Mindy (Leonardo DiCaprio) make an astounding discovery of a comet orbiting within the solar system. The problem: its on a direct collision course with Earth. The other problem? No one really seems to care. Turns out warning mankind about a planet-killer the size of Mount Everest is an inconvenient fact to navigate. With the help of Dr. Oglethorpe (Rob Morgan), Kate and Randall embark on a media tour that takes them from the office of an indifferent President Orlean (Meryl Streep) and her sycophantic son and Chief of Staff, Jason (Jonah Hill), to the airwaves of The Daily Rip, an upbeat morning show hosted by Brie (Cate Blanchett) and Jack (Tyler Perry). With only six months until the comet makes impact, managing the 24-hour news cycle and gaining the attention of the social media obsessed public before its too late proves shockingly comical -- what will it take to get the world to just look up?!',
        Genre: {
            Name: 'Comedy',
            Description: 'xyz'
        },
        Director: {
            Name: 'Adam McKay',
            Bio: 'Is an American film director, producer, screenwriter and comedian. McKay began his career in the 1990s as a head writer for the NBC sketch comedy show Saturday Night Live (SNL) for two seasons and is the co-founder of the comedy group Upright Citizens Brigade. He rose to fame in the 2000s for his collaborations with comedian Will Ferrell and co-wrote his films Anchorman, Talladega Nights, and The Other Guys. Ferrell and McKay later co-wrote and co-produced numerous television series and films, and produced their website Funny or Die through their company Gary Sanchez Productions.',
            Birthplace: 'Philadelphia, Pennsylvania, USA'
        }
    },
    {
        Title: 'Saving Private Ryan',
        Description: 'Captain John Miller (Tom Hanks) takes his men behind enemy lines to find Private James Ryan, whose three brothers have been killed in combat. Surrounded by the brutal realties of war, while searching for Ryan, each man embarks upon a personal journey and discovers their own strength to triumph over an uncertain future with honor, decency and courage.',
        Genre: {
            Name: 'War',
            Description: 'xyz'
        },
        Director: {
            Name: 'Steven Spielberg',
            Bio: 'Steven Spielberg was an iconic American filmmaker whose wide body of work was thoroughly embraced by both mainstream audiences and critics throughout his long and prolific career. Having made a number of modern classics, going all the way back to 1975s "Jaws," Spielberg was universally regarded by both his peers and film historians as one of the greatest',
            Birthplace: 'Cincinnati, Ohio, USA'
        }
    },
    {
        Title: 'Black Hawk Down',
        Description: 'The film takes place in 1993 when the U.S. sent special forces into Somalia to destabilize the government and bring food and humanitarian aid to the starving population. Using Black Hawk helicopters to lower the soldiers onto the ground, an unexpected attack by Somalian forces brings two of the helicopters down immediately. From there, the U.S. soldiers must struggle to regain their balance while enduring heavy gunfire.',
        Genre: {
            Name: 'War',
            Description: 'xyz'
        },
        Director: {
            Name: 'Ridley Scott',
            Bio: 'One of the more respected and prolific filmmakers in modern cinema, director-producer Ridley Scott amassed a portfolio containing some of the most critically and commercially successful movies of all time. Emerging from the world of television commercial production, Scott was nearly 40 years old by the time he helmed his first feature "The Duellists" (1977). Its lackluster reception left audiences ill-prepared for the massive impact that came next with the classic science-fiction/horror film "Alien" (1979). Although a commercial disaster at the time, "Blade Runner" (1982) would later be regarded as one of the most influential sci-fi movies ever made, while Scotts on-set behavior during production earned him a lasting reputation as an exceptionally stubborn and difficult director. The years that followed were marked by the ebb and flow of disappointment and triumph, as illustrated by efforts like "Legend" (1985), "Thelma & Louise" (1991), "White Squall" (1996) and "Gladiator" (2000). Remarkably, Scott moved into the next millennium with an even steadier output of work that included such highlights as "Black Hawk Down" (2001), "Kingdom of Heaven" (2005), "American Gangster" (2007), the "Alien" prequel-of-sorts "Prometheus" (2012) and the Academy Award-nominated science fiction comedy-thriller "The Martian" (2015). Having settled into a more efficient and actor-friendly style of filmmaking during the second half of his career, Scott enjoyed the luxury of tackling themes of personal interest on film projects endowed with budgets less-proven directors could only dream of.',
            Birthplace: 'South Shields, England, UK'
        }
    },
    {
        Title: '2 Guns',
        Description: 'For the past year, DEA agent Bobby Trench (Denzel Washington) and U.S. Navy intelligence officer Marcus Stigman (Mark Wahlberg) have been working under cover as members of a narcotics syndicate. The twist: Neither man knows that the other is an undercover agent. When their attempt to infiltrate a Mexican drug cartel and recover millions goes haywire, the men are disavowed by their superiors. Trench and Stigman must go on the run lest they wind up in jail or in a grave.',
        Genre: {
            Name: 'Action',
            Description: 'xyz'
        },
        Director: {
            Name: 'Baltasar Kormákur',
            Bio: 'Multitalented, multilingual filmmaker and actor Baltasar Kormakur ranks among Icelands premier talent. After distinguishing himself as an actor in the 90s, Kormakurs directorial debut in 2000 proved a tour de force. An offbeat mother-son drama based on the novel by Hallgrímur Helgason, "101 Reykjavík" won international acclaim on the festival circuit, and took home honors at the Edda Awards in Iceland for its outstanding adapted screenplay. Kormakurs second feature upped the ante for family dysfunction. "The Sea" revolves around the repressed neuroses of several estranged siblings brought together to discuss the future of their abusive fathers fishery. The film swept the Edda Awards, winning in eight of its twelve nominated categories, and Kormakur won both Director of the Year and Best Film. In 2005, Kormakur made his first English-language feature. "A Little Trip to Heaven" featured Forest Whitaker and Julia Stiles in a twisty thriller about a million dollar insurance policy. 2010s "Inhale" was the directors next English language endeavor, and stars Dermot Mulroney and Diane Kruger as a couple desperately in search of a doctor to treat their ailing daughter. In 2012, Kormakur tackled his first unabashedly Hollywood film: "Contraband", starring Mark Wahlberg. The high-octane actioner--a remake of the 2008 Icelandic film "Reykjavík-Rotterdam", in which Kormakur played the lead-- debuted at number one at the U.S. box office.',
            Birthplace: 'Reykjavik, Iceland'
        }
    },
    {
        Title: 'Flight',
        Description: 'Commercial airline pilot Whip Whitaker (Denzel Washington) has a problem with drugs and alcohol, though so far hes managed to complete his flights safely. His luck runs out when a disastrous mechanical malfunction sends his plane hurtling toward the ground. Whip pulls off a miraculous crash-landing that results in only six lives lost. Shaken to the core, Whip vows to get sober -- but when the crash investigation exposes his addiction, he finds himself in an even worse situation.',
        Genre: {
            Name: 'Drama',
            Description: 'xyz'
        },
        Director: {
            Name: 'Robert Zemeckis',
            Bio: 'Filmmaker Robert Zemeckis created popular fare, frequently using the latest technology, that left an indelible mark on the entertainment industry. A native of Chicago, he attended the famed film program at the University of Southern California. He teamed with fellow USC alum Bob Gale for the script for his feature directorial debut, the Beatlesmania comedy, "I Wanna Hold Your Hand" (1978). His work in college had brought him to the attention of director Steven Spielberg, who took Zemeckis under his wing. Working with Gale again, who would become his frequent partner, he provided the script for Spielbergs World War II comedy, "1941" (1979). He directed another comedy, the Kurt Russell vehicle "Used Cars" (1980), before finding significant commercial success with "Romancing the Stone" (1984), starring Michael Douglas and Kathleen Turner. His next effort, "Back to the Future" (1985), moved Zemeckis into the blockbuster territory',
            Birthplace: 'Chicago, Illinois, USA'
        }
    }
];

app.use(bodyParser.json());
app.use(morgan('common'));
app.use(express.static('public'));

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
  });

// add user 

app.post('/users', (req, res) => {
    const newUser = req.body;

    if (newUser.name) {
        newUser.id = uuid.v4();
        users.push(newUser);
        res.status(201).json(newUser)
    } else {
        res.status(400).send('You must enter a name')
    }
});

// update user

app.put('/users/:id', (req, res) => {
    const { id } = req.params;
    const updatedUser = req.body;

    let user = users.find( user => user.id == id );

    if (user) {
        user.name = updatedUser.name;
        res.status(200).json(user);
    } else {
        res.status(400).send('That user name could not be found')
    }
});

// user to add favorite movies

app.post('/users/:id/:movieTitle', (req, res) => {
    const { id, movieTitle } = req.params;

    let user = users.find( user => user.id == id );

    if (user) {
        user.favoriteMovies.push(movieTitle);
        res.status(200).json(`${movieTitle} has been added to user ${id}'s array`);
    } else {
        res.status(400).send('That user name could not be found')
    }
});

// user to delete favorite movie

app.delete('/users/:id/:movieTitle', (req, res) => {
    const { id, movieTitle } = req.params;

    let user = users.find( user => user.id == id );

    if (user) {
        user.favoriteMovies = user.favoriteMovies.filter( title => title !== movieTitle);
        res.status(200).json(`${movieTitle} has been removed from user ${id}'s array`);
    } else {
        res.status(400).send('That user name could not be found')
    }
});

// delete user

app.delete('/users/:id', (req, res) => {
    const { id } = req.params;

    let user = users.find( user => user.id == id );

    if (user) {
        users = users.filter( user => user.id != id);
        res.status(200).json(` User ${id} has been deleted`);
        // res.json(users)
    } else {
        res.status(400).send('That user name could not be found')
    }
})

// homepage 

app.get('/', (req, res) => {
    res.send('Home page is working')
});

// movie list

app.get('/movies', (req, res) =>{
    res.json(topMovies);
});

// get movie by title

app.get('/movies/:title', (req, res) =>{
    const { title } = req.params;
    const movie = topMovies.find( topMovie => topMovie.Title === title );

    if (movie) {
        res.status(200).json(movie);
    } else {
        res.status(400).send('We can not find that movie')
    }
   
});

// get genre info

app.get('/movies/genre/:genreName', (req, res) =>{
    const { genreName } = req.params;
    const genre = topMovies.find( topMovie => topMovie.Genre.Name === genreName ).Genre;

    if (genre) {
        res.status(200).json(genre);
    } else {
        res.status(400).send('We can not find that Genre')
    }
   
});

// get director info

app.get('/movies/directors/:directorName', (req, res) =>{
    const { directorName } = req.params;
    const director = topMovies.find( topMovie => topMovie.Director.Name === directorName ).Director;

    if (director) {
        res.status(200).json(director);
    } else {
        res.status(400).send('We can not find that Director')
    }
   
});

app.listen(8080, () => {
    console.log('App is listening on Port: 8080')
});