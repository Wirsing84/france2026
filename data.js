window.FRANCE2026 = {
  route: [
    { id: "tours", title: "Tours", date: "20.–23. Juli", accent: "#5d8b6f", tags: ["Loire", "Kanu", "Rad", "Ankommen"], text: "Entspannte erste Station mit Loireufer, Guinguette, kurzer Kanutour und familienfreundlichen Ausflügen." },
    { id: "moliets", title: "Moliets-et-Maâ", date: "23.–30. Juli", accent: "#176b87", tags: ["Atlantik", "Surf", "Strand", "Pinien"], text: "Aktivste Urlaubswoche: Wellen, Surfkurs, Kletterwald, Courant d’Huchet und lange Strandtage." },
    { id: "tholonet", title: "Le Tholonet", date: "30. Juli–6. August", accent: "#cc704b", tags: ["Provence", "Aix", "Sainte-Victoire", "Pool"], text: "Ruhige Basis bei Aix-en-Provence für Märkte, Felsen, Pinien, kurze Morgen-Ausflüge und Meer in Reichweite." },
    { id: "stop", title: "Zwischenstopp", date: "6./7. August", accent: "#657286", tags: ["Hotel", "Frühstück", "Parkplatz", "Weiterfahrt"], text: "Pragmatische Übernachtung: sauber, gut erreichbar, Familienzimmer, Frühstück und keine große Extra-Planung." }
  ],
  decisions: [
    { title: "Heißer Tag", text: "Früh raus, vormittags Wasser oder kurze Wanderung, mittags Pause, abends Markt oder Terrasse." },
    { title: "Aktiv-Tag", text: "Kanu in Tours, Surfkurs in Moliets, Kletterwald oder Sainte-Victoire-Morgenrunde." },
    { title: "Ruhiger Tag", text: "Croissants, Strand ohne Programm, Pool, Eis, kurzer Abendspaziergang." },
    { title: "Regen / müde Kids", text: "Aquarium, Calisson-Museum, Bowling, einfache Stadtbummel oder ein bewusst fauler Airbnb-Tag." }
  ],
  destinations: [
    {
      id: "tours", visual: "loire", title: "Tours & Loiretal", subtitle: "Fluss, Radwege und leichte erste Urlaubstage.",
      story: "Tours eignet sich als weicher Einstieg. Statt Schloss-Marathon lieber Loireufer, Guinguette, Kanu ab Vouvray und eine kurze Radetappe. Wenn Kultur, dann dosiert und mit Eis danach.",
      highlights: ["Guinguette de Tours sur Loire", "Kanutour ab Vouvray", "Loire à Vélo", "Family Park Sorigny", "Amboise als lockerer Halbtagesausflug"]
    },
    {
      id: "moliets", visual: "ocean", title: "Moliets-et-Maâ", subtitle: "Atlantik, Wellen, Pinien und viel Bewegung.",
      story: "Moliets ist wahrscheinlich der Urlaubskern für die Kinder. Vieles funktioniert ohne große Planung: Strand, Surf, Kletterwald, See, Pinienwald, Take-away und abends müde ins Bett.",
      highlights: ["Plage Centrale", "Plage des Chênes-Lièges", "Surfkurs", "Adrenaline Parc", "Courant d’Huchet", "Lac de Léon"]
    },
    {
      id: "tholonet", visual: "provence", title: "Le Tholonet & Aix", subtitle: "Provence-Basis am Fuß der Sainte-Victoire.",
      story: "Le Tholonet ist kein lautes Ziel, sondern eine gute Basis. Morgens Natur oder Markt, mittags Pool und Schatten, abends Aix, Terrasse oder Picknick. Genau so wird Provence entspannt.",
      highlights: ["Sainte-Victoire", "Roques Hautes", "Aix-en-Provence", "Calissons", "Cassis oder La Ciotat", "Luberon nur früh"]
    }
  ],
  days: [
    { date: "Mo 20.07.", place: "Fahrt", title: "Darmstadt → Tours", mood: "Ankommen", calm: "Nur ankommen, Unterkunft beziehen, kurzer Spaziergang.", active: "Nach der Fahrt Beine vertreten am Loireufer.", fallback: "Einkaufen, einfache Pasta, früh schlafen." },
    { date: "Di 21.07.", place: "Tours", title: "Loire-Tag", mood: "Leicht aktiv", calm: "Markt, Altstadt, Eis, Guinguette am Abend.", active: "Kurze Loire-à-Vélo-Runde.", fallback: "Aquarium de Touraine oder ruhiger Café-Tag." },
    { date: "Mi 22.07.", place: "Tours", title: "Kanu oder Family Park", mood: "Kinderjoker", calm: "Vouvray und Loireufer ohne Eile.", active: "Familien-Kanutour ab Vouvray.", fallback: "Family Park Sorigny, wenn die Kids Action wollen." },
    { date: "Do 23.07.", place: "Fahrt", title: "Tours → Moliets", mood: "Wechsel", calm: "Ankommen, Sand fühlen, erster Strandblick.", active: "Kurzer Abendspaziergang zur Plage Centrale.", fallback: "Pizza/Take-away und Koffer nicht komplett auspacken." },
    { date: "Fr 24.07.", place: "Moliets", title: "Erster Atlantiktag", mood: "Strand", calm: "Plage Centrale, Wellen beobachten, nichts erzwingen.", active: "Bodyboard / erste Surf-Schnupperstunde klären.", fallback: "Lac de Léon als ruhigere Wasseroption." },
    { date: "Sa 25.07.", place: "Moliets", title: "Surf & Pinien", mood: "Aktiv", calm: "Vormittags Strand, nachmittags Pool.", active: "Surfkurs für die Kinder oder Familie.", fallback: "Hossegor/Capbreton für Cafés und Bummeln." },
    { date: "So 26.07.", place: "Moliets", title: "Courant d’Huchet", mood: "Natur", calm: "Spaziergang und Picknick am Wasser.", active: "Lac de Léon + Courant d’Huchet kombinieren.", fallback: "Ruhiger Strandtag am späteren Nachmittag." },
    { date: "Mo 27.07.", place: "Moliets", title: "Adrenaline Parc", mood: "Kinderaction", calm: "Nur Minigolf, Eis oder Pool, wenn alle müde sind.", active: "Kletterwald / Adventure Parc.", fallback: "Früher Abend am ruhigeren Strandzugang." },
    { date: "Di 28.07.", place: "Moliets", title: "Baskischer Ausflug", mood: "Ausflug", calm: "Bayonne: Markthalle, Schokolade, kurze Runde.", active: "Biarritz mit Strand und Aussicht, aber früh starten.", fallback: "Capbreton Hafen und unkompliziert essen." },
    { date: "Mi 29.07.", place: "Moliets", title: "Letzter Atlantiktag", mood: "Favoriten", calm: "Noch einmal Lieblingsstrand.", active: "Surfkurs 2 oder Bodyboard-Session.", fallback: "Packen in kleinen Portionen, früher Abend." },
    { date: "Do 30.07.", place: "Fahrt", title: "Moliets → Le Tholonet", mood: "Lange Fahrt", calm: "Ankommen, Pool, Einkauf.", active: "Kurzer Abendblick Richtung Sainte-Victoire.", fallback: "Keine Pläne außer Abendessen." },
    { date: "Fr 31.07.", place: "Le Tholonet", title: "Aix locker", mood: "Markt", calm: "Aix: Markt, Brunnen, Eis, Calissons.", active: "Kurze Morgenrunde in Le Tholonet.", fallback: "Siesta und später Terrasse." },
    { date: "Sa 01.08.", place: "Le Tholonet", title: "Sainte-Victoire", mood: "Natur", calm: "Picknick im Schatten bei Roques Hautes.", active: "Frühe kurze Wanderung, keine Mittagshitze.", fallback: "Musée du Calisson und Pool." },
    { date: "So 02.08.", place: "Le Tholonet", title: "Meer-Tag", mood: "Küste", calm: "La Ciotat mit Strand und Eis.", active: "Cassis + Bootstour Calanques früh buchen/prüfen.", fallback: "Côte Bleue als pragmatischere Option." },
    { date: "Mo 03.08.", place: "Le Tholonet", title: "Pool & Provence", mood: "Langsam", calm: "Bäckerei, Pool, Lesen, Karten spielen.", active: "Kurzer Ausflug nach Aix am Abend.", fallback: "Airbnb-Tag ohne schlechtes Gewissen." },
    { date: "Di 04.08.", place: "Le Tholonet", title: "Luberon oder Markt", mood: "Ausflug", calm: "Nur ein Dorf, früh hin und früh zurück.", active: "Luberon-Runde mit Aussicht und Picknick.", fallback: "Aix + Calissons + Pool." },
    { date: "Mi 05.08.", place: "Le Tholonet", title: "Letzter Provence-Tag", mood: "Favoriten", calm: "Noch einmal Aix oder Pool.", active: "Sainte-Victoire-Abendrunde im weichen Licht.", fallback: "Packen, Resteessen, frühe Nacht." },
    { date: "Do 06.08.", place: "Fahrt", title: "Le Tholonet → Zwischenstopp", mood: "Transit", calm: "Hotel, Abendessen, schlafen.", active: "Nur kurzer Spaziergang nach der Ankunft.", fallback: "Autobahnhotel mit Frühstück und Parkplatz." },
    { date: "Fr 07.08.", place: "Fahrt", title: "Zwischenstopp → Darmstadt", mood: "Heimfahrt", calm: "Frühstück, tanken, weiter.", active: "Kurze Pause unterwegs, nicht zu spät heimkommen.", fallback: "Pizza daheim ist ein valider Plan." }
  ],
  pois: [
    { type: "Ort", place: "Tours", name: "Guinguette de Tours sur Loire", text: "Erster Abend, Loire-Stimmung, unkompliziert.", query: "Guinguette de Tours sur Loire" },
    { type: "Aktivität", place: "Tours", name: "Kanu ab Vouvray", text: "Familientaugliche Wasseraktivität auf der Loire.", query: "canoe Vouvray Tours Loire" },
    { type: "Ausflug", place: "Tours", name: "Family Park Sorigny", text: "Kinderjoker bei Actionbedarf.", query: "Family Park Sorigny" },
    { type: "Ausflug", place: "Tours", name: "Amboise", text: "Schöner Halbtagesausflug ohne Schlosszwang.", query: "Amboise France" },
    { type: "Strand", place: "Moliets", name: "Plage Centrale", text: "Hauptstrand mit Infrastruktur und Surfgefühl.", query: "Plage Centrale Moliets et Maa" },
    { type: "Strand", place: "Moliets", name: "Plage des Chênes-Lièges", text: "Ruhigerer, natürlicher Strandzugang.", query: "Plage des Chenes Lieges Moliets" },
    { type: "Aktivität", place: "Moliets", name: "Adrenaline Parc", text: "Kletterwald und Adventure für 8 und 10 Jahre.", query: "Adrenaline Parc Moliets" },
    { type: "Natur", place: "Moliets", name: "Courant d’Huchet", text: "Natur-Highlight zwischen See und Atlantik.", query: "Courant d'Huchet Moliets" },
    { type: "Ausflug", place: "Moliets", name: "Bayonne", text: "Baskisches Flair, Markthalle, Schokolade.", query: "Bayonne France market hall" },
    { type: "Natur", place: "Le Tholonet", name: "Sainte-Victoire", text: "Früh morgens, kurze Runde, nicht mittags.", query: "Montagne Sainte Victoire Le Tholonet" },
    { type: "Ort", place: "Le Tholonet", name: "Aix-en-Provence", text: "Markt, Eis, Brunnen, Calissons, Gassen.", query: "Aix-en-Provence market Cours Mirabeau" },
    { type: "Ausflug", place: "Le Tholonet", name: "Cassis", text: "Meer und Calanques, früh starten.", query: "Cassis Calanques boat tour" },
    { type: "Ausflug", place: "Le Tholonet", name: "La Ciotat", text: "Pragmatischer Meer-Tag mit Kindern.", query: "La Ciotat beach family" },
    { type: "Hotelzone", place: "Zwischenstopp", name: "Dijon-Süd / Beaune", text: "Schöner, oft etwas teurer, gut für Abendessen.", query: "family hotel breakfast parking Beaune Dijon Sud" },
    { type: "Hotelzone", place: "Zwischenstopp", name: "Dijon-Nord / Langres", text: "Preis-Leistungs-Option für reine Übernachtung.", query: "family hotel breakfast parking Langres Dijon Nord" }
  ],
  food: [
    { place: "Tours", title: "Loire-Abend", text: "Guinguette und Loireufer zuerst. Kein kompliziertes Restaurant nach der Anreise." },
    { place: "Tours", title: "Picknick statt Restaurant", text: "Markt, Baguette, Käse, Obst, dann Loireufer. Für Kinder oft besser als lange Menü-Abende." },
    { place: "Moliets", title: "Strandnah & flexibel", text: "Take-away, einfache Restaurants, früher essen. Nach Surf und Strand sind die Kids wahrscheinlich platt." },
    { place: "Moliets", title: "Cafés in Hossegor", text: "Wenn Kaffee wichtig ist: Hossegor/Capbreton als besserer Café-Ausflug als reine Strandorte." },
    { place: "Le Tholonet", title: "Aix am Abend", text: "Terrasse, Eis, kleine Gassen. Reservieren, wenn ihr einen konkreten Favoriten habt." },
    { place: "Le Tholonet", title: "Airbnb-Dinner", text: "Provence ist perfekt für Markt-Einkäufe, Tomaten, Brot, Käse, Oliven, Melone und Poolabend." }
  ],
  kids: [
    { emoji: "🏄", title: "Surf / Wellen", text: "Moliets: Surfkurs, Bodyboard oder Wellen beobachten." },
    { emoji: "🚣", title: "Kanu", text: "Tours/Vouvray: kurze Strecke, Wasser, Abenteuer ohne Überforderung." },
    { emoji: "🌲", title: "Kletterwald", text: "Adrenaline Parc: perfekt, wenn Energie raus muss." },
    { emoji: "🍦", title: "Eis & Stadt", text: "Aix, Amboise, Bayonne oder Tours – kurze Stadt, klare Belohnung." },
    { emoji: "🌊", title: "Strand", text: "Plage Centrale für Action, Chênes-Lièges für ruhiger." },
    { emoji: "🐟", title: "Schlechtwetter", text: "Aquarium, Calisson-Museum, Bowling oder einfach Spieleabend." }
  ],
  packing: [
    { title: "Auto", items: ["Warnwesten", "Verbandskasten", "Mautbox / Badge", "Ladekabel", "Snacks", "Wasserflaschen", "Müllbeutel", "Reisekissen"] },
    { title: "Strand", items: ["Sonnencreme", "UV-Shirts", "Strandtücher", "Badeschuhe", "Bodyboard / Ball", "Kühlbox", "Sonnenschirm", "After Sun"] },
    { title: "Aktiv", items: ["Sportschuhe", "Kappen", "Trinkflaschen", "Kleiner Rucksack", "Mückenschutz", "Pflaster", "Powerbank", "Regenjacken"] },
    { title: "Airbnb", items: ["Gewürze klein", "Spülmaschinentabs", "Wäschebeutel", "Lieblingsmesser", "Kaffeekram", "Spiele", "Bluetooth-Box", "Waschmittel"] },
    { title: "Kinder", items: ["Kopfhörer", "Bücher", "Kartenspiele", "Kuscheltier", "Wechselkleidung griffbereit", "Sonnenhut", "Reisetagebuch", "Stifte"] },
    { title: "Technik", items: ["Handylader", "USB-C", "Kamera", "Kindle", "Airtags", "Offline-Karten", "Ausweise digital", "Buchungsinfos"] }
  ]
};
